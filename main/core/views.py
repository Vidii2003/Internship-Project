from collections import OrderedDict
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from .models import *
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view



class MemberCreateView(APIView):            #create a new member
    
    def post(self, request):
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MemberListView(APIView):              #fetch all data for table view 
    def get(self, request):
        # Fetch all members
        members = Member.objects.all()
        serializer = MemberSerializers(members, many=True)  # Serialize all members
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MemberDetailView(APIView):             #fetch single user data 
    def get(self, request):
        # Get the mobile number from the query parameters
        mobile_number = request.query_params.get('mobile_number')

        if mobile_number:
            try:
                # Fetch the member by mobile number
                member = Member.objects.get(mobileNumber1=mobile_number)
                serializer = MemberSerializer(member)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Member.DoesNotExist:
                return Response({"error": "Member not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Mobile number is required."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])  # For user registration
def account_setup(request):
    data = request.data
    username = data.get('mobile')  # Expecting mobile number here
    password = data.get('password')

    # Validate the mobile number (username)
    if not username or len(str(username)) < 10:
        return Response({'error': 'Invalid mobile number'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if the user already exists
    if User.objects.filter(username=username).exists():
        return Response({'error': 'User with this mobile number already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    # Add mobile number to the username field
    data['username'] = username  

    serializer = UserRegistrationSerializer(data=data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "message": "User registered successfully.",
            "mobile": username,
            "member_id": user.profile.member_id
        }, status=status.HTTP_201_CREATED)
    
    # Return serializer errors if data is not valid
    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



def generate_member_id():               #ignore 
    last_profile = Profile.objects.order_by('id').last()
    if not last_profile:
        return "mem001"

    last_id = last_profile.member_id
    new_id = int(last_id[3:]) + 1
    new_member_id = f"mem{new_id:03d}"
    return new_member_id 


class RegisterView(APIView):               #ignore
    def post(self, request):
        data = request.data
        print("Request data:", data)  # Debugging line
        
        mobile = data.get('mobile')  # Expecting mobile number here
        password = data.get('password')  # Expecting password

        # Validate the mobile number
        if mobile is None or len(mobile) < 10:
            return Response({'error': 'Invalid mobile number'}, status=status.HTTP_400_BAD_REQUEST)

        # Check serializer with the correct mobile field
        serializer = UserRegistrationSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User registered successfully.",
                "mobile": mobile,
                "member_id": user.profile.member_id  # Access the member ID from the profile
            }, status=status.HTTP_201_CREATED)

        print("Serializer errors:", serializer.errors)  # Debugging line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

@api_view(['POST'])  # For user login and authentication
def login_view(request):
    # Extract username, password, and member ID from request data
    username = request.data.get('username')  # Expecting mobile number as username
    password = request.data.get('password')
    member_id = request.data.get('member_id')

    # Validate the input
    errors = {}
    if not username:
        errors["username"] = ["Mobile number is required."]
    if not password:
        errors["password"] = ["Password is required."]
    if not member_id:
        errors["member_id"] = ["Member ID is required."]
    if errors:
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    # Check if the username exists in the User table
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"username": ["This mobile number is not registered."]}, status=status.HTTP_400_BAD_REQUEST)

    # Retrieve the profile using the member ID and check for member ID mismatch
    try:
        profile = Profile.objects.get(member_id=member_id)
        if profile.user != user:
            return Response({"member_id": ["Member ID does not match the provided username."]}, status=status.HTTP_400_BAD_REQUEST)
    except Profile.DoesNotExist:
        return Response({"member_id": ["Invalid member ID."]}, status=status.HTTP_400_BAD_REQUEST)

    # Authenticate the user
    user = authenticate(username=username, password=password)
    if user is not None:
        return Response({
            "message": "Login successful.",
            "username": username,  # Include username (mobile number) in the response
            "member_id": member_id  # Include member ID in the response
        }, status=status.HTTP_200_OK)
    
    # If authentication fails
    return Response({"non_field_errors": ["Invalid credentials: Incorrect username or password."]}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def member_detail(request):
    # Get mobile number from the request body
    mobile_number = request.data.get('mobile_number')  # Expecting JSON with this key

    if not mobile_number:
        return Response({'error': 'Mobile number is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch the member using the mobile number
    member = Member.objects.filter(mobile_1=mobile_number).first()

    if not member:
        return Response({'error': 'Member not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the member data
    serializer = MemberSerializer(member)
    
    # Create an OrderedDict to make sure 'id' is the first field
    modified_data = OrderedDict()
    modified_data['id'] = 1  # Set the 'id' field to a static value, e.g., 1

    # Add the rest of the serialized data after 'id'
    for key, value in serializer.data.items():
        modified_data[key] = value

    # Return the modified data with 'id' as the first field
    return Response(modified_data, status=status.HTTP_200_OK)



@api_view(['POST'])  # For user login and authentication
def login_view_og(request):
    # Extract username (mobile number) and password from request data
    username = request.data.get('username')  # Expecting mobile number as username
    password = request.data.get('password')

    # Validate the input
    errors = {}
    if not username:
        errors["username"] = ["Mobile number is required."]
    if not password:
        errors["password"] = ["Password is required."]
    if errors:
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    # Check if the username exists in the User table
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"username": ["This mobile number is not registered."]}, status=status.HTTP_400_BAD_REQUEST)

    # Authenticate the user
    user = authenticate(username=username, password=password)
    if user is not None:
        return Response({
            "message": "Login successful.",
            "username": username  # Include username (mobile number) in the response
        }, status=status.HTTP_200_OK)
    
    # If authentication fails
    return Response({"non_field_errors": ["Invalid credentials: Incorrect username or password."]}, status=status.HTTP_400_BAD_REQUEST)