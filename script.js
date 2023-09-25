let allTasks = [];
let cur = 0;
const clearLocal = () => {
    localStorage.removeItem("task-list");
};
const load = () => {
    const parentElement = document.getElementById("row");
    parentElement.innerHTML = "";
    allTasks.forEach((ts) => {
        show(ts.task, ts.id);
    });
};
// clearLocal();
const getAllTasksLocal = () => {
    const prom = new Promise(function (resolve, reject) {
        if (localStorage.getItem("task-list")) {
            allTasks = JSON.parse(localStorage.getItem("task-list"));
        }
        console.log(allTasks);
        resolve();
    });
    return prom;
};
getAllTasksLocal().then(load);
const addTaskLocal = (task, id) => {
    allTasks.push({ task: task, id: id });
    localStorage.setItem("task-list", JSON.stringify(allTasks));
    console.log(allTasks);
};
const deleteTaskLocal = (id) => {
    allTasks = allTasks.filter((t) => t.id !== id);
    localStorage.setItem("task-list", JSON.stringify(allTasks));
    console.log(allTasks);
};
const add = () => {
    const input = document.getElementById("input");
    show(input.value, cur);
    addTaskLocal(input.value, cur);
    cur++;
    input.value = "";
};
const remove = (id) => {
    deleteTaskLocal(id);
    load();
};
const edit = (id) => {
    document.getElementById(`input-${id}`).style.display = "block";
    document.getElementById(`p-${id}`).style.display = "none";
    console.log(id);
    const ts = allTasks.find((t) => t.id == id);
    document.getElementById(`input-${id}`).setAttribute("value", ts.task);
};
const set = (id) => {
    const newValue = document.getElementById(`input-${id}`).value;
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id == id) {
            allTasks[i].task = newValue;
        }
    }
    localStorage.setItem("task-list", JSON.stringify(allTasks));
    document.getElementById(`input-${id}`).style.display = "none";
    document.getElementById(`p-${id}`).style.display = "block";
    console.log(allTasks);
    load();
};
const show = (task, i) => {
    let colContent = `<div class="card border shadow">
    <div class="card-header fw-bold" style="background-color: darkslategray;color:white">Task ${
        i + 1
    }</div>
    <div class="card-body">
        <p class="card-text fw-light" id="p-${i}" style="display: block,">${task}</p>
        <div>
            <input
                id="input-${i}"
                type="text"
                class="form-control mb-3"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                style="display: none"
                onblur="set(${i})"
            />
            <button
                class="btn btn-outline-warning"
                onclick="edit(${i})"
            >
                EDIT
            </button>
            <button
                class="btn btn-outline-danger"
                onclick="remove(${i})"
            >
                DELETE
            </button>
        </div>
    </div>
</div>`;
    let col = document.createElement("div");
    col.className = "col";
    col.id = "" + i;
    col.innerHTML = colContent;
    document.getElementById("row").appendChild(col);
};

document.getElementById("button-addon2").addEventListener("click", add);
