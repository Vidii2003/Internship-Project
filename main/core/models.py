from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import User



class Member(models.Model):
    # Personal Details
    title = models.CharField(max_length=100)
    firstName = models.CharField(max_length=50)
    middleName = models.CharField(max_length=50, blank=True)
    lastName = models.CharField(max_length=50)

    fatherName = models.CharField(max_length=50)
    motherName = models.CharField(max_length=50)
    spouseName = models.CharField(max_length=50, null=True, blank=True)
    
    mobile1 = models.CharField(max_length=15, primary_key=True)
    mobile2 = models.CharField(max_length=15, null=True, blank=True)
    
    dateOfBirth = models.CharField(max_length=30)
    gender = models.CharField(max_length=10)  # Could be an enum on the frontend
    bloodGroup = models.CharField(max_length=10, null=True, blank=True)
    emailId = models.EmailField(max_length=100, null=True, blank=True)

    # Current Address
    currentAddress1 = models.CharField(max_length=250, null=True, blank=True)
    currentAddress2 = models.CharField(max_length=250, null=True, blank=True)
    currentCity = models.CharField(max_length=50)
    currentDistrict = models.CharField(max_length=50)
    currentState = models.CharField(max_length=50)
    currentCountry = models.CharField(max_length=50)
    currentPinCode = models.CharField(max_length=6)

    # Permanent Address
    permanentAddress1 = models.CharField(max_length=250, null=True, blank=True)
    permanentAddress2 = models.CharField(max_length=250, null=True, blank=True)
    permanentCity = models.CharField(max_length=50, null=True, blank=True)
    permanentDistrict = models.CharField(max_length=50)
    permanentState = models.CharField(max_length=50)
    permanentCountry = models.CharField(max_length=50)
    permanentPinCode = models.CharField(max_length=6)

    # Education and Job Details
    highestQualification = models.CharField(max_length=100, null=True, blank=True)
    instituteName = models.CharField(max_length=100, null=True, blank=True)
    stream = models.CharField(max_length=50, null=True, blank=True)
    passedOutYear = models.IntegerField(null=True, blank=True)
    skills = models.CharField(max_length=250, null=True, blank=True)  # Expanded for multiple skills
    jobCategory = models.CharField(max_length=50, null=True, blank=True)
    companyName = models.CharField(max_length=100, null=True, blank=True)
    jobDesignation = models.CharField(max_length=100, null=True, blank=True)
    companyLocation = models.CharField(max_length=100, null=True, blank=True)
    companyLocation = models.CharField(max_length=50)
    annualIncome = models.CharField(max_length=50)
    role = models.CharField(max_length=50)

    class Meta:
        db_table = 'new_detail'



# table for user register
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    member_id = models.CharField(max_length=10, unique=True)
    class Meta:
        db_table = 'profile'

    def _str_(self):
        return f"{self.user.username} - {self.member_id}"


