from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from api.models import TaskList, Task
from api.serializers import TaskListSerializer, TaskSerializer, TaskModelSerializer
import json


@csrf_exempt
def task_list(request):
    if request.method == 'GET':
        tasks_list = TaskList.objects.all()
        serializer = TaskListSerializer(tasks_list, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    elif request.method == 'POST':
        body = json.loads(request.body)
        serializer = TaskListSerializer(data=body)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)
    return JsonResponse({'error': 'bad request'})

@csrf_exempt
def task(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        serializer = TaskModelSerializer(data=body)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)
    return JsonResponse({'error': 'bad request'})

@csrf_exempt
def task_list_detail(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=404)

    if request.method == 'GET':
        serializer = TaskListSerializer(task_list)
        return JsonResponse(serializer.data, status=200)
    elif request.method == 'PUT':
        body = json.loads(request.body)
        serializer = TaskListSerializer(instance=task_list, data=body)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)
    elif request.method == 'DELETE':
        task_list_id = task_list.id
        task_list.delete()
        return JsonResponse({'success': task_list_id})
    return JsonResponse({'error': 'bad request'})


def task_list_tasks(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=404)

    tasks = task_list.task_set.all()
    serializer = TaskSerializer(tasks, many=True)
    return JsonResponse(serializer.data, safe=False, status=200)


@csrf_exempt
def task_detail(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=404)

    if request.method == 'GET':
        serializer = TaskModelSerializer(task)
        return JsonResponse(serializer.data, status=200)
    if request.method == 'PUT':
        body = json.loads(request.body)
        serializer = TaskModelSerializer(instance=task, data=body)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)
    elif request.method == 'DELETE':
        task_id = task.id;
        task.delete()
        return JsonResponse({'success': task_id})
    return JsonResponse({'error': 'bad request'})
