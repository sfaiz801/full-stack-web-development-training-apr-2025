/**
 * 05_DOM_Manipulation_and_Events/app.js
 * -------------------------------------
 * Demonstrates DOM Manipulation & Event Architecture:
 * - Selecting elements via querySelector / getElementById
 * - createElement, appendChild, classList toggles
 * - Event Delegation: Single click listener on parent #taskList
 * - Real-time input listening for character/word counting
 */

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const sensorInput = document.getElementById("sensorInput");
    const counterDisplay = document.getElementById("counterDisplay");

    // 1. Adding Dynamic Task Elements to DOM
    function addTask() {
        const text = taskInput.value.trim();
        if (!text) return;

        const li = document.createElement("li");
        li.className = "list-item";
        li.dataset.id = Date.now();

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = text;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-delete";
        deleteBtn.textContent = "Delete";

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = "";
        taskInput.focus();
    }

    addBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTask();
    });

    // 2. EVENT DELEGATION: Single listener handles clicks for all current and future items
    taskList.addEventListener("click", (e) => {
        // If Delete Button was clicked
        if (e.target.classList.contains("btn-delete")) {
            const item = e.target.closest(".list-item");
            if (item) item.remove();
        } 
        // If Task text was clicked -> Toggle Completed state
        else if (e.target.classList.contains("task-text")) {
            const item = e.target.closest(".list-item");
            if (item) item.classList.toggle("completed");
        }
    });

    // 3. Live Input Event Listener
    sensorInput.addEventListener("input", (e) => {
        const value = e.target.value;
        const charCount = value.length;
        const words = value.trim() ? value.trim().split(/\s+/).length : 0;
        counterDisplay.textContent = `Characters: ${charCount} | Words: ${words}`;
    });
});
