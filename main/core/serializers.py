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
            'first_name',
            'middle_name',
            'last_name',
            'father_name',
            'mother_name',
            'spouse_name',
            'mobile_1',
            'mobile_2',
            'date_of_birth',
            'gender',
            'blood_group',
            'email_id',
            'current_address_1',
            'current_address_2',
            'current_city',
            'current_district',
            'current_state',
            'current_country',
            'current_pin_code',
            'permanent_address_1',
            'permanent_address_2',
            'permanent_city',
            'permanent_district',
            'permanent_state',
            'permanent_country',
            'permanent_pin_code',
            'highest_qualification',
            'institute_name',
            'stream',
            'passed_out_year',
            'skills',
            'job_category',
            'company_name',
            'job_designation',
            'company_location',
            'annual_income',
            'role',
        ]

class MemberSerializers(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [
            'id'
            'title',
            'first_name',
            'middle_name',
            'last_name',
            'father_name',
            'mother_name',
            'spouse_name',
            'mobile_1',
            'mobile_2',
            'date_of_birth',
            'gender',
            'blood_group',
            'email_id',
            'current_address_1',
            'current_address_2',
            'current_city',
            'current_district',
            'current_state',
            'current_country',
            'current_pin_code',
            'permanent_address_1',
            'permanent_address_2',
            'permanent_city',
            'permanent_district',
            'permanent_state',
            'permanent_country',
            'permanent_pin_code',
            'highest_qualification',
            'institute_name',
            'stream',
            'passed_out_year',
            'skills',
            'job_category',
            'company_name',
            'job_designation',
            'company_location',
            'annual_income',
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
    


