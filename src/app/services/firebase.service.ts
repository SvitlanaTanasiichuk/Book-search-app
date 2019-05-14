import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from "angularfire2/database";
import { Observable } from "rxjs";
import {map} from 'rxjs/operators';


@Injectable()
export class FirebaseService {
  books: AngularFireList<any[]>;
  favoriteBooks: Observable<any>;
  unreadBooks: Observable<any>;
  bookDetails: Observable<any>;

  constructor(private db: AngularFireDatabase) {}

    getBooks(){
      this.books = this.db.list('/books') as AngularFireList<any[]>;
      return this.books;
   }

   getFavoriteBooks() {
    this.favoriteBooks = this.db.list('/books').valueChanges().pipe (map ( books => {
    const topRatedBooks =<any> books.filter((item: any) => item.rate > 4.0);
    return topRatedBooks;
    }))
    return this.favoriteBooks;
  } 

  getUnreadBooks(){
    this.unreadBooks = this.db.list('/books').valueChanges().pipe (map (books => {
      const ub = <any> books.filter((item: any) => item.dateread == null );
      return ub;
    }))
    return this.unreadBooks;
  }

  getBookDetails(id) {
    this.unreadBooks = this.db.object('/books/' + id).valueChanges() as Observable<any>;
    return this.bookDetails;
  }
}
