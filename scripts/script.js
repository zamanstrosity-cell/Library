//Query Selectors
const form = document.querySelector("form");
const bookList = document.querySelector("#book-list");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.getElementById("pages");
const readStatus = document.querySelector("#readStatus");


//Variables
let myLibrary = [];
let newBook;
let tableHeader = `
<tr>
<th>Book</th>
<th>Author</th>
<th>Pages</th>
<th>Read</th>
<th>Delete</th>
</tr>
`;
//Book Class
class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
        bookCells() {
        return `
        <td>${this.title}</td>
        <td>${this.author}</td>
        <td>${this.pages}</td>
        <td><button class="read-button">${this.read}</button></td>
        <td><button class="delete-button">X</button></td>`;
}
}

function render(myLibrary, node){
    node.innerHTML = tableHeader;
    myLibrary.forEach(book => {
    let row = document.createElement('tr');
    row.innerHTML = book.bookCells();
    row.querySelector(".read-button").addEventListener('click', () => {
        if(row.querySelector(".read-button").innerHTML == "Read"){
            row.querySelector('.read-button').innerHTML = "Unread";
        }else {
            row.querySelector(".read-button").innerHTML = "Read";
        }
    });
    row.querySelector(".delete-button").addEventListener('click', () => {
        row.querySelector(".delete-button").parentNode.parentNode.parentNode.removeChild(row.querySelector(".delete-button").parentNode.parentNode);
        myLibrary.splice(myLibrary.indexOf(book), 1);
    });
    node.append(row);
});
}

form.addEventListener('submit', () => {
    event.preventDefault();
    newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, readStatus.value);
    myLibrary.push(new Book(bookTitle.value, bookAuthor.value, bookPages.value, readStatus.value));
    render(myLibrary, bookList);
    form.reset();
});