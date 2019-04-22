from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from api.models import TaskList, Task
from api.serializers import TaskListSerializer, TaskSerializer, TaskModelSerializer


@csrf_exempt
def task_list(request):
    if request.method == 'GET':
        tasks_list = TaskList.objects.all()
        # json_tasks_list = [tl.to_json() for tl in tasks_list]
        # return JsonResponse(json_tasks_list, safe=False, status=200)

        # using serializer #
        serializer = TaskListSerializer(tasks_list, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    # todo post


@csrf_exempt
def task_list_detail(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=404)

    if request.method == 'GET':
        # json_task_list = task_list.to_json()
        # return JsonResponse(json_task_list, status=200)

        # using serializer #
        serializer = TaskListSerializer(task_list)
        return JsonResponse(serializer.data, status=200)
    # todo put, delete


def task_list_tasks(request, pk):
    try:
        task_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=404)

    tasks = task_list.task_set.all()
    # json_tasks = [task.to_json() for task in tasks]
    # return JsonResponse(json_tasks, safe=True, status=200)

    # using serializer #
    serializer = TaskSerializer(tasks, many=True)
    return JsonResponse(serializer.data, safe=False, status=200)


@csrf_exempt
def task_detail(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=404)

    if request.method == 'GET':
        # return JsonResponse(task.to_json(), status=200)

        # using model serializer #
        serializer = TaskModelSerializer(task)
        return JsonResponse(serializer.data, status=200)
    # todo put, delete
