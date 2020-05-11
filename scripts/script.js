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
`


//Book Class
function Book(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    //Text value of book row
function bookCells(book) {
        return `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><button class="read-button">${book.read}</button></td>
        <td><button class="delete-button">X</button></td>`;
}



//Renders Library Items into table
function render(myLibrary, node){
    node.innerHTML = tableHeader;
    myLibrary.forEach(book => {
    let row = document.createElement('tr');
    row.innerHTML = bookCells(book);
    row.querySelector(".read-button").addEventListener('click', (e) => {
        if(e.target.innerHTML == "Read"){
            e.target.innerHTML = "Unread";
        }else {
            e.target.innerHTML = "Read";
        }
    });
    row.querySelector(".delete-button").addEventListener('click', (e) => {
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        myLibrary.splice(myLibrary.indexOf(book), 1);
        setLocalStorage();
    });
    node.append(row);
});
}

//On Form Submit
form.addEventListener('submit', () => {
    event.preventDefault();
    myLibrary.push(new Book(bookTitle.value, bookAuthor.value, bookPages.value, readStatus.value));
    render(myLibrary, bookList);
    setLocalStorage();
    form.reset();
});

getLocalStorage();
render(myLibrary, bookList);

//Setting Local Storage

function setLocalStorage(){
    localStorage.setItem('library', JSON.stringify(myLibrary));
};

function getLocalStorage(){
    myLibrary = JSON.parse(localStorage.getItem('library'));
}