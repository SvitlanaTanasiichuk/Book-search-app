import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  setUserLoggedIn(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('saved on localStorage');
  }

  getUserLoggedIn() {
    if (localStorage.getItem('user')) {
      JSON.parse(localStorage.getItem('user'));
    } else {
      console.log('localStorage empty');
    }
  }
 
  clearLocalStorage() {
    localStorage.clear();
  }
}

