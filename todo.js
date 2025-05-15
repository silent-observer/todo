function deleteClicked(event) {
    let button = event.target;
    let noteWrapper = button.parentElement.parentElement;
    noteWrapper.classList.add("hidden");
    noteWrapper.addEventListener("transitionend", function() {
        noteWrapper.remove();
    })
}

function plusClicked() {
    let textarea = document.getElementById("todo-new-input");
    let note = textarea.value;
    let template = document.getElementById("todo-template");
    let clone = template.content.cloneNode(true);
    let noteText = clone.querySelector("p");
    noteText.textContent = note;
    clone.querySelector(".delete-button").addEventListener("click", deleteClicked);
    document.getElementById("todo-container").appendChild(clone);
    textarea.value = "";
}

window.addEventListener("load", function() {
    document.getElementById("todo-new-button").addEventListener("click", plusClicked);

    new Sortable(document.getElementById("todo-container"), {
        animation: 150,
        handle: ".todo-note"
    })
})