# your_app/utils.py

from .models import Profile

def generate_member_id():
    """Generate a new unique member ID based on the last profile."""
    last_profile = Profile.objects.order_by('id').last()
    if not last_profile:
        return "mem001"

    last_id = last_profile.member_id
    new_id = int(last_id[3:]) + 1
    new_member_id = f"mem{new_id:03d}"
    return new_member_id


