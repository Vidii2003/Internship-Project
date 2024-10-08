from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import User


class Member(models.Model):
    firstName = models.CharField(max_length=255, null=False)
    middleName = models.CharField(max_length=255, null=True, blank=True)
    lastName = models.CharField(max_length=255, null=False)
    fatherName = models.CharField(max_length=255)
    mothersName = models.CharField(max_length=255)
    spouseName = models.CharField(max_length=255, null=True, blank=True)
    mobile1 = models.BigIntegerField(primary_key=True)
    mobile2 = models.BigIntegerField(null=True, blank=True)
    dob = models.DateField()
    gender = models.CharField(max_length=255)
    bloodGroup = models.CharField(max_length=3)
    Email = models.EmailField(max_length=255)
    commDoorNo = models.CharField(max_length=100)
    commStreetName = models.CharField(max_length=255)
    commArea = models.CharField(max_length=255)
    commCity = models.CharField(max_length=100)
    commDistrict = models.CharField(max_length=100)
    commState = models.CharField(max_length=100)
    commCountry = models.CharField(max_length=100)
    commPincode = models.CharField(max_length=20)
    permDoorNo = models.CharField(max_length=100)
    permStreetName = models.CharField(max_length=255)
    permArea = models.CharField(max_length=255)
    permCity = models.CharField(max_length=100)
    permDistrict = models.CharField(max_length=100)
    permState = models.CharField(max_length=100)
    permCountry = models.CharField(max_length=100)
    permPincode = models.CharField(max_length=20)

    class Meta:
        db_table = 'new_detail'


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    member_id = models.CharField(max_length=10, unique=True)
    class Meta:
        db_table = 'profile'

    def _str_(self):
        return f"{self.user.username} - {self.member_id}"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30)
    father_name = models.CharField(max_length=30, blank=True)
    mother_name = models.CharField(max_length=30, blank=True)
    spouse_name = models.CharField(max_length=30, blank=True)
    mobile1 = models.CharField(max_length=15)
    mobile2 = models.CharField(max_length=15, blank=True)
    country_code1 = models.CharField(max_length=5)
    country_code2 = models.CharField(max_length=5, default='+91')
    dob = models.DateField()
    gender = models.CharField(max_length=10)
    blood_group = models.CharField(max_length=5, blank=True)
    role = models.CharField(max_length=20, default='user')  # Example roles: user, admin, etc.

    def __str__(self):
        return self.first_name + ' ' + self.last_name