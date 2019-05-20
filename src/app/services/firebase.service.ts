import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import { Observable } from "rxjs";
// import {map} from 'rxjs/operators';
import 'rxjs/add/operator/map'; 
import 'core-js/es7/reflect';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  allbooks: AngularFireList<any[]>;
  books: Observable<any[]>;
  favoriteBooks: Observable<any>;
  unreadBooks: Observable<any>;
  bookDetails: AngularFireObject<any>;
  
  constructor(private db: AngularFireDatabase) {}

   getBooks() {
    this.books = this.db.list('/books').snapshotChanges().map(books => {
      return books.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           
    });
  });
    return this.books;
  }

  getBooks2() {
    this.allbooks = this.db.list('/books') as AngularFireList<any[]>;
    console.log("at call getbooks2() " + this.allbooks);
    return this.allbooks;
  }

  getFavoriteBooks() {
    this.favoriteBooks = this.db.list('/books').snapshotChanges().map(books => {
      return books.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           
    });
  });
    return this.favoriteBooks;
  }


  getUnreadBooks() {
    this.unreadBooks = this.db.list('/books').snapshotChanges().map(books => {
      return books.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           
    });
  });
    return this.unreadBooks;
  }

  getBookDetails(id){
    this.bookDetails = this.db.object('/books/'+id) as AngularFireObject<any>;
    console.log(this.bookDetails);
    return this.bookDetails;     
  }

  addBook(bookDetails){
    const filteredBook = JSON.parse(JSON.stringify(bookDetails));
    return this.allbooks.push(filteredBook);
  }


  updateBook(id, bookDetails){
    const filteredBook = JSON.parse(JSON.stringify(bookDetails));
     this.allbooks.update(id,filteredBook);
  }
  
  deleteBook(id){
     this.allbooks.remove(id);
  }
}
