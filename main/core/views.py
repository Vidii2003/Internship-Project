
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from .models import *
from .serializers import *
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view

class MemberCreateView(APIView):
    
    def post(self, request):
        serializer = MemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MemberListView(APIView):
    def get(self, request):
        # Fetch all members
        members = Member.objects.all()
        serializer = MemberSerializer(members, many=True)  # Serialize all members
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class MemberDetailView(APIView):
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


@api_view(['POST'])
def account_setup(request):
    data = request.data
    username = data.get('mobile')  # Expecting mobile number here
    password = data.get('password')

    # Validate the username (mobile number)
    if username is None or len(str(username)) < 10:  # Convert to string for length check
        return Response({'error': 'Invalid mobile number'}, status=status.HTTP_400_BAD_REQUEST)

    # Use 'username' when creating the serializer
    data['username'] = username  # Add mobile number to the username field

    serializer = UserRegistrationSerializer(data=data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "message": "User registered successfully.",
            "mobile": username,  # Include username (mobile number) in the response
            "member_id": user.profile.member_id  # Access member ID from the profile
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def generate_member_id():
    last_profile = Profile.objects.order_by('id').last()
    if not last_profile:
        return "mem001"

    last_id = last_profile.member_id
    new_id = int(last_id[3:]) + 1
    new_member_id = f"mem{new_id:03d}"
    return new_member_id


class RegisterView(APIView):
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

    

@api_view(['POST'])
def login_view(request):
    # Extract username, password, and member ID from request data
    username = request.data.get('username')  # Expecting mobile number as username
    password = request.data.get('password')
    member_id = request.data.get('member_id')

    # Validate the input
    if not username or not password or not member_id:
        return Response({"error": "Username, password, and member ID are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Attempt to retrieve the profile using the member ID
    try:
        profile = Profile.objects.get(member_id=member_id)
    except Profile.DoesNotExist:
        return Response({"error": "Invalid member ID."}, status=status.HTTP_400_BAD_REQUEST)

    # Authenticate the user
    user = authenticate(username=username, password=password)
    if user is not None and profile.user == user:
        return Response({
            "message": "Login successful.",
            "username": username,  # Include username (mobile number) in the response
            "member_id": member_id  # Include member ID in the response
        }, status=status.HTTP_200_OK)
    
    return Response({"non_field_errors": ["Invalid credentials: Incorrect username or password."]}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])  # Change to POST
def member_detail(request):
    # Get mobile number from the request body
    mobile_number = request.data.get('mobile_number')  # Expecting JSON with this key

    if not mobile_number:
        return Response({'error': 'Mobile number is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch the member using the mobile number
    member = Member.objects.filter(mobileNumber1=mobile_number).first()

    if not member:
        return Response({'error': 'Member not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the member data
    serializer = MemberSerializer(member)
    return Response(serializer.data, status=status.HTTP_200_OK)