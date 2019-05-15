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

  //   getBooks(){
  //     this.books = this.db.list('/books') as AngularFireList<any[]>;
  //     return this.books;
  //  }

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

  //  getFavoriteBooks() {
  //   this.favoriteBooks = this.db.list('/books').valueChanges().pipe(map( books => {
  //   const topRatedBooks =<any> books.filter((item: any) => item.rate > 4.0);
  //   return topRatedBooks;
  //   }))
  //   return this.favoriteBooks;
  // } 

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

  // getUnreadBooks(){
  //   this.unreadBooks = this.db.list('/books').valueChanges().pipe(map(books => {
  //     const ub = <any> books.filter((item: any) => item.dateread == null );
  //     return ub;
  //   }))
  //   return this.unreadBooks;
  // }

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

  // addBook(bookDetails){
  //   var filteredBook = JSON.parse(JSON.stringify(bookDetails));
  //   return this.books.push(filteredBook);
  // }

  addBook(bookDetails){
    var filteredBook = JSON.parse(JSON.stringify(bookDetails)); //removes the undefined fields
    console.log('Filtered Book - ',filteredBook);
    console.log("from service the firebase database add befor addd    >" + this.allbooks);
    console.log("from service the book observable add befor addd    >" + this.books);

     this.allbooks.push(filteredBook);
     console.log("from service firebase database add after addd     >"  + this.allbooks);
     console.log("from service the book observable  add after addd     >"  + this.books);

  //  return this.allbooks;
  }

  // updateBook(id, bookDetails){
  //   var filteredBook = JSON.parse(JSON.stringify(bookDetails)); //removes the undefined fields
  //    this.allbooks.update(id,filteredBook);
  // }
  
  // deleteBook(id){
  //    this.allbooks.remove(id);
  // }
}
