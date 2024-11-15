from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import User



class Member(models.Model):
    # Personal Details
    title = models.CharField(max_length=100)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50)

    father_name = models.CharField(max_length=50)
    mother_name = models.CharField(max_length=50)
    spouse_name = models.CharField(max_length=50, null=True, blank=True)
    
    mobile_1 = models.CharField(max_length=15, primary_key=True)
    mobile_2 = models.CharField(max_length=15, null=True, blank=True)
    
    date_of_birth = models.CharField(max_length=30)
    gender = models.CharField(max_length=10)  # Could be an enum on the frontend
    blood_group = models.CharField(max_length=10, null=True, blank=True)
    email_id = models.EmailField(max_length=100, null=True, blank=True)

    # Current Address
    current_address_1 = models.CharField(max_length=250, null=True, blank=True)
    current_address_2 = models.CharField(max_length=250, null=True, blank=True)
    current_city = models.CharField(max_length=50, null=True, blank=True)
    current_district = models.CharField(max_length=50, null=True, blank=True)
    current_state = models.CharField(max_length=50, null=True, blank=True)
    current_country = models.CharField(max_length=50, null=True, blank=True)
    current_pin_code = models.CharField(max_length=6, null=True, blank=True)

    # Permanent Address
    permanent_address_1 = models.CharField(max_length=250, null=True, blank=True)
    permanent_address_2 = models.CharField(max_length=250, null=True, blank=True)
    permanent_city = models.CharField(max_length=50, null=True, blank=True)
    permanent_district = models.CharField(max_length=50, null=True, blank=True)
    permanent_state = models.CharField(max_length=50, null=True, blank=True)
    permanent_country = models.CharField(max_length=50, null=True, blank=True)
    permanent_pin_code = models.CharField(max_length=6, null=True, blank=True)

    # Education and Job Details
    highest_qualification = models.CharField(max_length=100, null=True, blank=True)
    institute_name = models.CharField(max_length=100, null=True, blank=True)
    stream = models.CharField(max_length=50, null=True, blank=True)
    passed_out_year = models.IntegerField(null=True, blank=True)
    skills = models.CharField(max_length=250, null=True, blank=True)  # Expanded for multiple skills
    job_category = models.CharField(max_length=50, null=True, blank=True)
    company_name = models.CharField(max_length=100, null=True, blank=True)
    job_designation = models.CharField(max_length=100, null=True, blank=True)
    company_location = models.CharField(max_length=50)
    # annual_income = models.CharField(max_length=50)
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


