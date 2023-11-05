"use strict";

//select ui components
const form = document.querySelector("form"),
  input = document.querySelector(`input[type="text"]`),
  tasksContainer = document.querySelector(".tasks-container");

class App {
  _tasks = [];

  constructor() {
    form.addEventListener("submit", this._addTask.bind(this));
    window.addEventListener("load", this._tasksLoad.bind(this));
    tasksContainer.addEventListener("click", this._taskOption.bind(this));
  }

  _addTask(e) {
    e.preventDefault();

    const taskText = input.value;
    const task = new Task(taskText);
    this._tasks.push(task);
    window.localStorage.setItem(task.id, JSON.stringify(task));

    this._renderTask(task);
  }

  _renderTask(task) {
    const state = task.active ? "" : "complited";
    const markup = `
         <div class="task ${state}" data-id="${task.id}">
          <div>
              <div class="check-box click-fx">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" he viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" class="w-6 h-6 select-icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
              </div>
              <p>${task.text}</p>
          </div>
          <div class="task-options">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 delete-icon click-fx">
                  <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
          </div>
         </div>
      `;

    tasksContainer.insertAdjacentHTML("afterbegin", markup);
  }

  _tasksLoad() {
    if (window.localStorage.length === 0) return;

    this._tasks = Object.entries(window.localStorage).map((task) => {
      return JSON.parse(task[1]);
    });

    this._tasks.forEach((task) => {
      this._renderTask(task);
    });
  }

  _taskOption(e) {
    if (e.target.classList.contains("delete-icon")) this._deleteTask(e);
    if (e.target.closest(".check-box")) this._changeState(e);
  }

  _deleteTask(e) {
    const taskId = e.target.closest(".task").dataset.id;
    e.target.closest(".task").remove();
    window.localStorage.removeItem(taskId);
  }

  _changeState(e) {
    const taskId = e.target.closest(".task").dataset.id;
    const taskIndex = this._tasks.findIndex((task) => {
      return task.id == taskId;
    });
    this._tasks[taskIndex].active = !this._tasks[taskIndex].active;
    window.localStorage.setItem(taskId, JSON.stringify(this._tasks[taskIndex]));
    e.target.closest(".task").classList.toggle("complited");
  }
}

class Task {
  constructor(text) {
    this.id = Date.now();
    this.text = text;
    this.active = true;
  }
}

const app = new App();

/* v1.0.0 */
/* by abuSpiha */
