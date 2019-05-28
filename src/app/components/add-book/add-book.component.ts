import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  title;
  author;
  rate;
  description;
  imageUrl;
  releaseDate;
  example = of(null);
  isRead: boolean = false;

  constructor(private firebaseService: FirebaseService, private router: Router) {
    this.firebaseService.getBooks2()
   }

  ngOnInit() {
  }

  submitAdd(){
    let book = {
      author: this.author,
      title: this.title,
      releaseDate: this.releaseDate,
      rate: this.rate,
      description: this.description,
      imageUrl: this.imageUrl
    }

    this.firebaseService.addBook(book);
    this.router.navigate(['books']);
  }

}
