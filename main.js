document.addEventListener('DOMContentLoaded', function () {

    const inputBookTitle = document.getElementById('inputBookTitle');
    const inputBookAuthor = document.getElementById('inputBookAuthor');
    const inputBookYear = document.getElementById('inputBookYear');
    const inputBookIsComplete = document.getElementById('inputBookIsComplete');
    const bookSubmit = document.getElementById('bookSubmit');
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    const completeBookshelfList = document.getElementById('completeBookshelfList');
    const inputBookForm = document.getElementById('inputBook');
    const searchBookForm = document.getElementById('searchBook');
    const searchBookTitle = document.getElementById('searchBookTitle');
    const searchSubmit = document.getElementById('searchSubmit');
  
    function createBook(title, author, year, isComplete) {
      const bookItem = document.createElement('article');
      bookItem.classList.add('book_item');
      
      const titleElement = document.createElement('h3');
      titleElement.innerText = title;
  
      const authorElement = document.createElement('p');
      authorElement.innerText = `Penulis: ${author}`;
  
      const yearElement = document.createElement('p');
      yearElement.innerText = `Tahun: ${year}`;
  
      const actionContainer = document.createElement('div');
      actionContainer.classList.add('action');
  
      const actionButton = document.createElement('button');
      actionButton.innerText = isComplete ? 'Belum selesai di Baca' : 'Selesai dibaca';
      actionButton.classList.add(isComplete ? 'green' : 'red');
      actionButton.addEventListener('click', function () {
        toggleBookStatus(bookItem, isComplete);
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Hapus buku';
      deleteButton.classList.add('red');
      deleteButton.addEventListener('click', function () {
        deleteBook(bookItem);
      });
  
      actionContainer.appendChild(actionButton);
      actionContainer.appendChild(deleteButton);
  
      bookItem.appendChild(titleElement);
      bookItem.appendChild(authorElement);
      bookItem.appendChild(yearElement);
      bookItem.appendChild(actionContainer);
  
      return bookItem;
    }
  
    function addBookToShelf(title, author, year, isComplete) {
      const newBook = createBook(title, author, year, isComplete);
      const bookshelfList = isComplete ? completeBookshelfList : incompleteBookshelfList;
      bookshelfList.appendChild(newBook);
    }
  
    function addBook() {
      const title = inputBookTitle.value;
      const author = inputBookAuthor.value;
      const year = inputBookYear.value;
      const isComplete = inputBookIsComplete.checked;
  
      if (title && author && year) {
        addBookToShelf(title, author, year, isComplete);
        clearInputFields();
      }
    }
  
    function clearInputFields() {
      inputBookTitle.value = '';
      inputBookAuthor.value = '';
      inputBookYear.value = '';
      inputBookIsComplete.checked = false;
    }
  
    function toggleBookStatus(bookItem, isComplete) {
      const bookshelfList = isComplete ? incompleteBookshelfList : completeBookshelfList;
      const actionButton = bookItem.querySelector('button');
      const oppositeStatus = !isComplete;
  
      actionButton.innerText = oppositeStatus ? 'Selesai dibaca' : 'Belum selesai di Baca';
      actionButton.classList.remove(oppositeStatus ? 'red' : 'green');
      actionButton.classList.add(oppositeStatus ? 'green' : 'red');
  
      bookshelfList.appendChild(bookItem);
    }
  
    function deleteBook(bookItem) {
      bookItem.remove();
    }
  
    function searchBook() {
      const searchTitle = searchBookTitle.value.toLowerCase();
      const allBooks = document.querySelectorAll('.book_item');
  
      allBooks.forEach(function (bookItem) {
        const titleElement = bookItem.querySelector('h3');
        const title = titleElement.innerText.toLowerCase();
  
        if (title.includes(searchTitle)) {
          bookItem.style.display = 'block';
        } else {
          bookItem.style.display = 'none';
        }
      });
    }
  
    inputBookForm.addEventListener('submit', function (e) {
      e.preventDefault();
      addBook();
    });
  
    searchBookForm.addEventListener('submit', function (e) {
      e.preventDefault();
      searchBook();
    });
  
    searchSubmit.addEventListener('click', searchBook);
  });
  