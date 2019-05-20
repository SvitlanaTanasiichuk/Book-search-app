import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  allBooks: any;
  allBooks2:any;


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

  this.firebaseService.getBooks2().valueChanges().subscribe(books =>{
    this.allBooks2 = books;
    // console.log(this.allBooks2);
  })

  }
}
