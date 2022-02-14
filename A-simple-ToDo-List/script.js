const taskList = document.getElementById('tasks-list');
const inputButton = document.getElementById('input-btn');

const LOCAL_STORAGE_LIST_KEY = 'task.list';
let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

inputButton.addEventListener('click', () => {
    const newTaskName = document.getElementById('input-text');
    if (newTaskName.value.trim() !== '') {
        const task = {
            id: Date.now().toString(),
            name: newTaskName.value.trim(),
            completed: false
        }
        tasks.push(task);
        newTaskName.value = '';
        saveAndRender();

    }
})


function saveAndRender() {
    save();
    renderTasks();
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(tasks));
}

function renderTasks() {
    clearInnerHtml(taskList);

    tasks.forEach(function(task) {

        const newTask = document.createElement('li');
        newTask.className = 'task';
        newTask.setAttribute('data-id', task.id);

        const newSpan = document.createElement('span');
        newSpan.className = 'item-name';
        newSpan.innerText = task.name;
        if(task.completed === true) {
            newSpan.setAttribute('class', 'item-name completed');
        }
        else {
            newSpan.setAttribute('class', 'item-name');
        }
        newTask.append(newSpan);

        const newDeleteButton = document.createElement('button');
        newDeleteButton.className = 'delete-btn';
        newDeleteButton.innerText = 'X';
        newTask.append(newDeleteButton);


        taskList.append(newTask);

    })

}


function clearInnerHtml(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function deleteTask(id) {
    // filters out the <li> with the id and updates the todos array
    tasks = tasks.filter(function(item) {
        return item.id != id;
    });

    // update the localStorage
    saveAndRender();
}

function toggleCompletion(id) {
    tasks.forEach(function(item) {
        if (item.id == id) {
            // toggle the value
            item.completed = !item.completed;

        }
    });
    saveAndRender();
}

taskList.addEventListener('click', function(event) {


    if (event.target.className ==='task') {
        toggleCompletion(event.target.getAttribute('data-id'));
    }
    else if (event.target.classList[0] === 'item-name') {
        toggleCompletion(event.target.parentNode.getAttribute('data-id'));
    }



    if(event.target.classList.contains('delete-btn')) {
        deleteTask(event.target.parentElement.getAttribute('data-id'));
    }
})

renderTasks();