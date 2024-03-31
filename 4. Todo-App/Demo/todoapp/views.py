from django.shortcuts import render, HttpResponse
from .models import Todo
from datetime import datetime

def home(request):
  return HttpResponse('Hallo Welt!')

def completetodo(request):
    # Abrufen von open_todos und completed_todos aus der Sitzung oder Initialisieren
    open_todos = request.session.get('open_todos', [])
    completed_todos = request.session.get('completed_todos', [])

    if request.method == 'POST':
        if 'todo_text' in request.POST:
            open_todo = request.POST['todo_text'].strip()
            if open_todo:
                open_todos.append(Todo(open_todo).to_dict())

        if 'complete_todo' in request.POST:
            completed_indices = request.POST.getlist('complete_todo')
            for index in completed_indices:
                index = int(index)
                todo = open_todos.pop(index)
                complete_todo = Todo(todo['text'])
                complete_todo.completed = True
                complete_todo.completed_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                completed_todos.append(complete_todo.to_dict())

        # Speichern von open_todos und completed_todos in der Sitzung
        request.session['open_todos'] = open_todos
        request.session['completed_todos'] = completed_todos

    return render(request, 'app.html', {'open_todos': open_todos, 'completed_todos': completed_todos})