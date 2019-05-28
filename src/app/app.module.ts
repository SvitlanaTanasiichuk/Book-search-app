import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

//Material section
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule } from '@angular/material';

//Forms
import { FormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { BookComponent } from './components/book/book.component';
import { BooksComponent } from './components/books/books.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { DeleteBookComponent } from './components/delete-book/delete-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

//Firebase configuration
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
//Service
import { FirebaseService } from './services/firebase.service';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    BookComponent,
    BooksComponent,
    AddBookComponent,
    DeleteBookComponent,
    EditBookComponent,
    PageNotFoundComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'book-notes-app'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,

    //Material
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule
  ],
  providers: [FirebaseService, AuthService, UserService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
