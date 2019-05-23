import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  allbooks: any;
  searchText: string = "";
  
  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.firebaseService.getBooks2().valueChanges().subscribe(books =>{
      this.allbooks = books;
    })
    
  }

  filterCondition(books) {
    return books.title.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

  
}
