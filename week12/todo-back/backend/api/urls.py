from django.urls import path
from api import views

urlpatterns = [
    path('api/task_lists', views.task_list),
    path('api/task_lists/<int:pk>', views.task_list_detail),
    path('api/task_lists/<int:pk>/tasks/', views.task_list_tasks),
    path('api/tasks/<int:pk>', views.task_detail),
    path('api/tasks', views.task)
]
