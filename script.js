document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm=document.getElementById('task-form');
const taskInput=document.getElementById('task-input');
const taskList=document.getElementById('task-list');

taskForm.addEventListener('submit', function(event){
    event.preventDefault();
    addTask(taskInput.value);
    taskInput.value='';
});

function addTask(task) {
    const li= document.createElement('li');
    li.appendChild(document.createTextNode(task));

    const actions = document.createElement('div');
    actions.className='task-actions';

    const completeBtn=document.createElement('button');
    completeBtn.innerHTML='✔';
    completeBtn.onclick=() => toggleCompleteTask(li);
    actions.appendChild(completeBtn);

    li.appendChild(actions);

    taskList.appendChild(actions);

    taskList.appendChild(li);
    saveTasks();

}

function toggleCompleteTask(task) {
    task.classList.toggle('Completed');
    saveTasks();
}

function deleteTask(task) {
    task.remove();
    saveTasks();
}

function saveTasks() {
    const tasks =[];
    taskList.querySelectorAll('li').forEach(task => {
        task.push({
            text: task.firstChild.textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    task.forEach(task => {
        const li=document.createElement('li');
        li.appendChild(document.createTextNode(task.text));

        const actions=document.createElement('div');
        actions.className='task-actions';

        const completeBtn=document.createElement('button');
        completeBtn.innerHTML='✔';
        completeBtn.onclick = () => toggleCompleteTask(li);
        actions.appendChild(completeBtn);

        const deleteBtn=document.createElement('button');
        deleteBtn.innerHTML='❌';
        deleteBtn.onclick = () => deleteTask(li);
        actions.appendChild(deleteBtn);

        li.appendChild(actions);

        if(task.complete) {
            li.classList.add('completed');
        }

        taskList.appendChild(li);
    });
}