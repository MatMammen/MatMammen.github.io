
//search local storage to see if an array exists
if (localStorage.getItem("myLibraryStored") == null) {
    var myLibrary = [];
    //let myLibrary = JSON.parse(localStorage.getItem("myLibraryStored"))
}
else {
    var myLibrary = JSON.parse(localStorage.getItem("myLibraryStored"))
}

//let myLibrary = [];





//adding the button to call inputs
let ButtonArea = document.querySelector('#buttonArea')
ButtonArea.className = "buttonArea"
let newBookButton = document.createElement('button');
newBookButton.textContent = "press me!"
newBookButton.addEventListener("click", inputButton)
ButtonArea.appendChild(newBookButton);
//adding the button to submit inputs
let submitButton = document.createElement('button');
submitButton.textContent = "submit book";
displayBooks(myLibrary);

function Book(author, title, pages, read) {
    //the constructor
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    //add function in prototype and then add that function as an event listener
    this.toggle = function() {
        this.read = (this.read == 'Yes') ? 'No' : 'Yes'
    }
    
}

function inputButton() {
    //creating the newline
    let br = document.createElement("br")
    //add author input
    ButtonArea.appendChild(br.cloneNode(true));
    let newAuthorInput = document.createElement('INPUT')
    newAuthorInput.id = "authorInput";
    newAuthorInput.placeholder = "Author";
    newAuthorInput.style.left = "0px"
    ButtonArea.appendChild(newAuthorInput)
    //add title input
    ButtonArea.appendChild(br.cloneNode(true));
    let newTitleInput = document.createElement('INPUT')
    newTitleInput.id = "titleInput";
    newTitleInput.placeholder = "Title";
    newTitleInput.style.left = "0px"
    ButtonArea.appendChild(newTitleInput)
    //add number of pages input
    ButtonArea.appendChild(br.cloneNode(true));
    let newPagesInput = document.createElement('INPUT')
    newPagesInput.id = "pagesInput"
    newPagesInput.placeholder = "Pages";
    newPagesInput.style.left = "0px"
    ButtonArea.appendChild(newPagesInput)
    //add read or not read input
    ButtonArea.appendChild(br.cloneNode(true));
    let newReadInput = document.createElement('INPUT')
    newReadInput.id = "readInput"
    newReadInput.placeholder = "Already read?";
    newReadInput.style.left = "0px"
    ButtonArea.appendChild(newReadInput)


    //remove listener
    newBookButton.removeEventListener('click', inputButton)

    //add second button that resets when pressed but also creates objects using inputs with Book()
    ButtonArea.appendChild(br.cloneNode(true));
    submitButton.addEventListener('click', submitButtonActions)
    ButtonArea.appendChild(submitButton);

}
//good so far below, but need to delete breaks
function submitButtonActions() {
    //search by ID, get values, then remove the children
    //remove and get author
    let newAuthorInput = document.querySelector("#authorInput")
    ButtonArea.removeChild(newAuthorInput)
    let author = newAuthorInput.value
    //remove and get title
    let newTitleInput = document.querySelector("#titleInput")
    ButtonArea.removeChild(newTitleInput)
    let title = newTitleInput.value
    //remove and get pages
    let newPagesInput = document.querySelector("#pagesInput")
    ButtonArea.removeChild(newPagesInput)
    let pages = newPagesInput.value
    //remove and get read or not
    let newReadInput = document.querySelector("#readInput")
    ButtonArea.removeChild(newReadInput);
    let read = newReadInput.value;
    //readd input giving listeners and delete submitbutton listeners... or the button itself?
    newBookButton.addEventListener('click', inputButton);
    ButtonArea.removeChild(submitButton)
    //Removing listeners just in case ==>submitButton.removeEventListener('click', submitButtonActions)
    //remove all page breaks
    let pageBreak = document.getElementsByTagName('br');
    //side note, pagebreaknum important because i< value referenced every loop...why????
    let pageBreaknum = pageBreak.length;
    for (var i = 0; i < pageBreaknum; i++ ) {
        //side note 2: since for loop is dynamic, you MUST inverse remove breaks
        ButtonArea.removeChild(pageBreak[pageBreak.length-1])
    }
    //use books() to add values to my library
    let newBook = new Book(author, title, pages, read);
    myLibrary.push(newBook);
    //add the display books function to add books to page
    displayBooks(myLibrary);

    //this should be where you update local storage
    localStorage.setItem('myLibraryStored', JSON.stringify(myLibrary))
    
}
function displayBooks(array) {
    let maindiv = document.querySelector('#mainDiv');
    maindiv.textContent = ''; 
    for (const element of array) {
        let div = document.createElement('div');
        div.className = "displayBook"
        
        //adding the title
        let title = document.createElement('p');
        title.textContent = "Title: " + element.title;
        //adding the author
        let author = document.createElement('p');
        author.textContent = "Author: " + element.author;
        //adding pages
        let pages = document.createElement('p')
        pages.textContent = "Pages: " + element.pages;
        //adding read or not
        let read = document.createElement('p')
        read.textContent = "Have you finished reading this? " + element.read
        maindiv.appendChild(div);
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        div.appendChild(read);
        
        //add delete book button
        let deleteBook = document.createElement('button')
        deleteBook.textContent = 'x';
        deleteBook.className = "deleteButton";
        //Find the index of the element
        //Note that this is a good way to find index of object in list of objects!!!!
        let index = array.findIndex(function (array) {
            return array.title == element.title && array.author == element.author;
        })
        //add the listener to the x button
        //THIS LISTENER IS THE PROBLEM, why is it going automatically? See if you can pass variable without it running immedialy
        //HUGE lesson learned, event listner executes function immedialtly within if () attached, use portal to make new function
        deleteBook.addEventListener('click', () => {
            deleteButton(index) })
        div.appendChild(deleteBook)
        //add a read status button that switches read status from "yes", "no" 
        let toggleRead = document.createElement('button')
        toggleRead.textContent = 'toggle read status';
        toggleRead.addEventListener('click', () => {
            element.toggle();
            displayBooks(array);
        })
        
        //its a strech but does this work????
        div.appendChild(toggleRead);
        
        

        
    }
}
function deleteButton(index) {
    //simply the event listner that deletes the item from the library based on index and then resets the display
    myLibrary.splice(index, 1)
    //Second instance of myLibrary changing, so adding local here too
    localStorage.setItem('myLibraryStored', JSON.stringify(myLibrary))
    displayBooks(myLibrary);
}

