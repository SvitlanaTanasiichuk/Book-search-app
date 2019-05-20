import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  id;
  author;
  title;
  description;
  releaseDate;
  imageUrl;
  rate;


  constructor(private firebaseService: FirebaseService,
     private router: Router,
     private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getBookDetails(this.id).valueChanges().subscribe(book => {
      this.title = book.title;
      this.author = book.author;
      this.rate = book.rate;
      this.releaseDate = book.releaseDate;
      this.description = book.description;
      this.imageUrl = book.imageUrl;
    });
  }

  submitEdit() {
    let book = {
      author: this.author,
      title: this.title,
      releaseDate: this.releaseDate,
      rate: this.rate,
      description: this.description,
      imageUrl: this.imageUrl
  }
  this.firebaseService.updateBook(this.id,book);
  this.router.navigate(['/books'])
  }
}
