from rest_framework import serializers
from api.models import Task


class TaskListSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()


class TaskSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    status = serializers.CharField()


class TaskModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
