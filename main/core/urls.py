from django.urls import path
from .views import *

urlpatterns = [
    path('createmember/', MemberCreateView.as_view(), name='create-member'),
    path('all-members/', MemberListView.as_view(), name='member-list'),
    path('members/',MemberDetailView.as_view(),name='all members list'),
    path('register/', RegisterView.as_view(), name='user-register'),
    path('login/', login_view, name='user-login'),
    path('account-setup/', account_setup, name='account_setup'),
    path('member_detail/',member_detail,name='personal_view'),
]
