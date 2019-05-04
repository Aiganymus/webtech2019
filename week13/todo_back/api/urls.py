from django.urls import path
from api import views

urlpatterns = [
    path('task_lists', views.TaskListView.as_view()),
    path('task_lists/<int:pk>', views.TaskListDetail.as_view()),
    # path('task_lists', views.task_lists_list),
    # path('task_lists/<int:pk>', views.task_list_detail),
    path('task_lists/<int:pk>/tasks/', views.TaskListTasks.as_view()),
    path('tasks/<int:pk>', views.TaskDetail.as_view()),
    path('tasks', views.TaskCreate.as_view()),
    path('login', views.login),
    path('logout', views.logout),
]