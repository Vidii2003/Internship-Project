# Generated by Django 5.1.1 on 2024-10-20 08:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="member",
            old_name="companyLocation",
            new_name="company_location",
        ),
    ]
