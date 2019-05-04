from rest_framework import generics
from api.models import Task, TaskList
from api.serializers import TaskSerializer, TaskSerializer2
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


class TaskListTasks(generics.ListAPIView):
    serializer_class = TaskSerializer2
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        task_list = get_object_or_404(TaskList, id=self.kwargs.get('pk'), created_by=self.request.user)
        return task_list.tasks.all()


class TaskCreate(generics.CreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Task.objects.for_user_order_by_name(self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Task.objects.filter(created_by=self.request.user)

    def get_object(self):
        task = get_object_or_404(self.get_queryset(), id=self.kwargs["pk"])
        self.check_object_permissions(self.request, task)
        return task
