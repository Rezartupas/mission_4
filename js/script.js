document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const priorityLevel = document.getElementById("priorityLevel");
    const taskDate = document.getElementById("taskDate");
    const submitTask = document.getElementById("submitTask");
    const todoBody = document.getElementById("todoBody");
    const doneList = document.getElementById("doneList");
    const deleteAll = document.getElementById("deleteAll");
    const timeDisplay = document.getElementById("time");

    let tasks = [];

    function updateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timeDisplay.textContent = now.toLocaleDateString('en-US', options);
    }

    function addTask() {
        const task = taskInput.value.trim();
        const priority = priorityLevel.value;
        const inputDate = taskDate.value;

        if (task === "" || inputDate === "") return;

        const taskDueDate = new Date(inputDate);
        tasks.push({ task, priority, date: taskDueDate });

        tasks.sort((a, b) => a.date - b.date);

        renderTasks();
        taskInput.value = "";
        taskDate.value = "";
    }

    function renderTasks() {
        todoBody.innerHTML = "";  // Clear existing tasks

        tasks.forEach(({ task, priority, date }) => {
            const tr = document.createElement("tr");

            const tdTask = document.createElement("td");
            tdTask.textContent = task;

            const tdPriority = document.createElement("td");
            tdPriority.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);

            const tdDate = document.createElement("td");
            tdDate.textContent = date.toLocaleDateString();

            const tdAction = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.addEventListener("click", function() {
                if (checkbox.checked) {
                    tr.classList.add("done");
                    doneList.appendChild(createDoneItem(task));
                } else {
                    tr.classList.remove("done");
                    removeDoneItem(task);
                }
            });
            tdAction.appendChild(checkbox);

            tr.appendChild(tdTask);
            tr.appendChild(tdPriority);
            tr.appendChild(tdDate);
            tr.appendChild(tdAction);

            const now = new Date();
            if (date < now && !tr.classList.contains("done")) {
                tr.classList.add("overdue");
            }

            todoBody.appendChild(tr);
        });
    }

    function createDoneItem(task) {
        const li = document.createElement("li");
        li.textContent = task;
        return li;
    }

    function removeDoneItem(task) {
        const doneItems = doneList.querySelectorAll("li");
        doneItems.forEach(function(item) {
            if (item.textContent === task) {
                item.remove();
            }
        });
    }

    function deleteAllTasks() {
        tasks = [];
        todoBody.innerHTML = "";
        doneList.innerHTML = "";
    }

    deleteAll.addEventListener("click", function() {
        const confirmation = confirm("Are you sure you want to delete all tasks?");
        if (confirmation) {
            deleteAllTasks();
        }
    });
    
    

    submitTask.addEventListener("click", addTask);
    deleteAll.addEventListener("click", deleteAllTasks);

    updateTime();
});
