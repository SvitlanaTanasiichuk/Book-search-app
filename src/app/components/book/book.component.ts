import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  id: any;
  title;
  author;
  genre;
  rate;
  numberPages;
  description;
  imageUrl;
  releaseDate;

  constructor(private firebaseService: FirebaseService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getBookDetails(this.id).valueChanges().subscribe(book => {
      this.title = book.title;
      this.author = book.author;
      this.genre = book.genre;
      this.rate = book.rate;
      this.numberPages = book.numberPages;
      this.releaseDate = book.releaseDate;
      this.description = book.description;
      this.imageUrl = book.imageUrl;
    });
  }
}
