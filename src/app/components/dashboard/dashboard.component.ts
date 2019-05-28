import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from 'firebase';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(
    public authservice: AuthService
  ) {
    this.getUserLoggedIn();
  }
  ngOnInit() {
  }
  getUserLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  logout() {
    this.authservice.logout();
    console.log('Logged out');
  }
}