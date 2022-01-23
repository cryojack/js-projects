const getTaskInput  = document.querySelector(".todo-input");
const addItem       = document.querySelector(".submit-input");
const clearAll      = document.querySelector(".clear-all");
const listShow      = document.querySelector(".list-show");
const taskList      = [];

var count           = 0;

function createTask() {
    // Main Div
    count++;
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.id = count;
    taskList.push(count);

    // Task Name
    const taskName = document.createElement("h3");
    taskName.classList.add("task-name");
    taskName.innerText = getTaskInput.value;
    taskDiv.appendChild(taskName);

    //Buttons
    const notDoneBttn = document.createElement("input");
    notDoneBttn.classList.add("notdone-task");
    notDoneBttn.type = "button";
    notDoneBttn.value = "Not Done"
    taskDiv.appendChild(notDoneBttn);

    const updateBttn = document.createElement("input");
    updateBttn.classList.add("update-task");
    updateBttn.type = "button";
    updateBttn.value = "Update"
    taskDiv.appendChild(updateBttn);

    const deleteBttn = document.createElement("input");
    deleteBttn.classList.add("delete-task");
    deleteBttn.type = "button";
    deleteBttn.value = "Delete"
    taskDiv.appendChild(deleteBttn);

    listShow.appendChild(taskDiv);
    clearAll.value = "Clear " + taskList.length + " items";

    // Add event listeners
    notDoneBttn.addEventListener('click', changeStatus);
    taskDiv.addEventListener('click', deleteTask);
    taskDiv.addEventListener('click', updateTask);
    getTaskInput.value = "";
}

function changeStatus() {
    if(this.classList.contains('notdone-task')) {
        this.classList.remove('notdone-task');
        this.classList.add('done-task');
        this.value = "Done";
    } else {
        this.classList.remove('done-task');
        this.classList.add('notdone-task');
        this.value = "Not Done";
    }
}

function updateTask(e) {
    if(e.target.classList.contains('update-task')) {
        const parent = e.target.parentElement;
        console.log(parent)
    }
}

function deleteTask(e) {
    if(e.target.classList.contains('delete-task')) {
        const parent = e.target.parentElement;
        taskList.splice(taskList.indexOf(parent.id),1);
        parent.classList.add('slide');
        parent.addEventListener('transitionend', function() {
            parent.remove();
        });
    }
    getTaskInput.value = "";
    clearAll.value = "Clear " + taskList.length + " items";
}

function removeAllTasks() {
    listShow.innerHTML = "";
    while(taskList.length) {
        taskList.pop();
    }
    getTaskInput.value = "";
    clearAll.value = "Clear " + taskList.length + " items";
    count = 0;
}

addItem.addEventListener('click', createTask);
clearAll.addEventListener('click', removeAllTasks);

clearAll.value = "Clear " + taskList.length + " items";