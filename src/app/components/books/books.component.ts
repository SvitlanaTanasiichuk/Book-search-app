import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  allBooks: any;

  constructor(private firebaseService: FirebaseService) {
    }

  ngOnInit() {
  //   this.firebaseService.getBooks().valueChanges().subscribe(books => 
  //     {this.allBooks = books;
  //       })

  this.firebaseService.getBooks().subscribe(books =>{
    this.allBooks = books;
    // console.log(this.allBooks);
  })
  }
}
