from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import User


class Member(models.Model):
    title = models.CharField(max_length=100)
    name = models.CharField(max_length=50)
    fatherName = models.CharField(max_length=50)
    motherName = models.CharField(max_length=50)
    spouseName = models.CharField(max_length=50, null=True)
    mobileNumber1 = models.CharField(max_length=15,primary_key=True)
    mobileNumber2 = models.CharField(max_length=15, null=True)
    dateOfBirth = models.DateField()
    gender = models.CharField(max_length=50)  # No dropdown, handle on frontend
    bloodGroup = models.CharField(max_length=50, null=True)
    emailId = models.EmailField(max_length=50, null=True)
    
    # Current Address
    currentAddress1 = models.CharField(max_length=250, null=True)
    currentAddress2 = models.CharField(max_length=250, null=True)
    currentCity = models.CharField(max_length=50)
    currentDistrict = models.CharField(max_length=50)
    currentState = models.CharField(max_length=50)
    currentCountry = models.CharField(max_length=50)
    currentPinCode = models.CharField(max_length=6)
    
    # Permanent Address
    permanentAddress1 = models.CharField(max_length=250, null=True)
    permanentAddress2 = models.CharField(max_length=250, null=True)
    permanentCity = models.CharField(max_length=50, null=True)
    permanentDistrict = models.CharField(max_length=50)
    permanentState = models.CharField(max_length=50)
    permanentCountry = models.CharField(max_length=50)
    permanentCode = models.CharField(max_length=6)

    # Education and Job Details
    highestQualification = models.CharField(max_length=100, null=True)
    instituteName = models.CharField(max_length=50, null=True)
    stream = models.CharField(max_length=50, null=True)
    passedOutYear = models.IntegerField(null=True)
    skills = models.CharField(max_length=50, null=True)
    jobCategory = models.CharField(max_length=50, null=True)
    companyName = models.CharField(max_length=50, null=True)
    jobDesignation = models.CharField(max_length=50, null=True)
    companyLocation = models.CharField(max_length=50, null=True)
    role = models.CharField(max_length=50)

    class Meta:
        db_table = 'new_detail'



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    member_id = models.CharField(max_length=10, unique=True)
    class Meta:
        db_table = 'profile'

    def _str_(self):
        return f"{self.user.username} - {self.member_id}"


