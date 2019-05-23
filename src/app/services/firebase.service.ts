import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import { BehaviorSubject, Observable } from "rxjs";
import 'rxjs/add/operator/map'; 
import 'core-js/es7/reflect';
import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';



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

  getSearch(start: BehaviorSubject<string>): Observable<any[]> {
    return start.pipe(
      switchMap(startText => {
        const endText = startText + '\uf8ff';
        return this.db
          .list('/books', ref =>
            ref
              .orderByChild('title')
              .limitToFirst(10)
              .startAt(startText)
              .endAt(endText)
          )
          .snapshotChanges()
          .pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(changes => {
              return changes.map(a => {
                return { key: a.payload.key, ...a.payload.val() };
              });
            })
          );
      })
    );
  }
  
}
