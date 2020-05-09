//Query Selectors
const form = document.querySelector("form");
const bookList = document.querySelector("#book-list");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.getElementById("pages");
const readStatus = document.querySelector("#readStatus");
//Book Class
class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
//Add Book
    addBook() {
        const newRow = document.createElement('tr');
        const appendBook = `
        <td>${this.title}</td>
        <td>${this.author}</td>
        <td>${this.pages}</td>
        <td><button class="read-button">${this.read}</button></td>
        <td><button class="delete-button">X</button></td>`;
        newRow.innerHTML = appendBook;
        bookList.appendChild(newRow);
    }
}

//variables
let newBook;
//Local Storage(?)


form.addEventListener('submit', () => {
    event.preventDefault();
    newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, readStatus.value);
    newBook.addBook();
    addEvents();
    form.reset();
});

//Event Listeners
function addEvents(){
    document.querySelectorAll(".read-button").forEach(button => {
        button.addEventListener('click', () => {
            if(button.innerHTML == "Read"){
                button.innerHTML = "Unread";
            }else if (button.innerHTML == "Unread"){
                button.innerHTML = "Read";
            }
        });
    });

    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener('click', () => {
            button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);
        });
    });
};