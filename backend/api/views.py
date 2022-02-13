from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.


def getRoutes(response):
    return JsonResponse('response', safe=False)
