import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  favoriteBooks: any;
  unreadBooks: any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getFavoriteBooks().subscribe(favBooks =>{
      this.favoriteBooks = favBooks;
      console.log('RAte', this.favoriteBooks);
    })

    this.firebaseService.getUnreadBooks().subscribe(ubBooks => {
      this.unreadBooks = ubBooks;
      console.log('UnreadBooks', this.unreadBooks);
    })
  }
}
