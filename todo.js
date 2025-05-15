function notesIntoList() {
    let list = [];
    let notes = document.getElementsByClassName("todo-note");
    for (let i = 0; i < notes.length; i++) {
        list.push(notes[i].querySelector("p").textContent);
    }
    return list;
}

function createNote(text) {
    let template = document.getElementById("todo-template");
    let clone = template.content.cloneNode(true);
    let noteText = clone.querySelector("p");
    noteText.textContent = text;
    clone.querySelector(".delete-button").addEventListener("click", deleteClicked);
    document.getElementById("todo-container").appendChild(clone);
}

function save() {
    localStorage.setItem("notes", JSON.stringify(notesIntoList()));
}

function load() {
    if (!localStorage.getItem("notes")) {
        return;
    }

    let notes = JSON.parse(localStorage.getItem("notes"));

    for (let i = 0; i < notes.length; i++) {
        createNote(notes[i]);
    }
}

function deleteClicked(event) {
    let button = event.target;
    let noteWrapper = button.parentElement.parentElement;
    noteWrapper.classList.add("hidden");
    noteWrapper.addEventListener("transitionend", function() {
        noteWrapper.remove();
    });
    save();
}

function plusClicked() {
    let textarea = document.getElementById("todo-new-input");
    createNote(textarea.value);
    textarea.value = "";
    save();
}

window.addEventListener("load", function() {
    load();
    document.getElementById("todo-new-button").addEventListener("click", plusClicked);
    new Sortable(document.getElementById("todo-container"), {
        animation: 150,
        handle: ".todo-note"
    })
})