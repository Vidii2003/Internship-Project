from rest_framework import serializers
from .models import *
#from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from .utils import generate_member_id




class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            'title',
            'firstName',
            'middleName',
            'lastName',
            'fatherName',
            'motherName',
            'spouseName',
            'mobile1',
            'mobile2',
            'dateOfBirth',
            'gender',
            'bloodGroup',
            'emailId',
            'currentAddress1',
            'currentAddress2',
            'currentCity',
            'currentDistrict',
            'currentState',
            'currentCountry',
            'currentPinCode',
            'permanentAddress1',
            'permanentAddress2',
            'permanentCity',
            'permanentDistrict',
            'permanentState',
            'permanentCountry',
            'permanentPinCode',
            'highestQualification',
            'instituteName',
            'stream',
            'passedOutYear',
            'skills',
            'jobCategory',
            'companyName',
            'jobDesignation',
            'companyLocation',
            'annualIncome',
            'role',
        ]

class MemberSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['__all__']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']  # Use 'username' instead of 'mobile'

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],  # Update this as needed
        )
        user.set_password(validated_data['password'])
        user.save()

        member_id = generate_member_id()
        Profile.objects.create(user=user, member_id=member_id)

        return user

    

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()  # Mobile number
    member_id = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        member_id = data.get('member_id')
        password = data.get('password')

        profile = Profile.objects.filter(member_id=member_id).first()
        if not profile:
            raise serializers.ValidationError('Invalid member ID.')

        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError('Invalid credentials: Incorrect username or password.')
        
        if profile.user != user:
            raise serializers.ValidationError('Invalid credentials: User does not match member ID.')

        return data
    


