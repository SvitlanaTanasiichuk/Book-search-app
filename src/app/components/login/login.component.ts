import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authservice: AuthService, private router: Router) {}
  ngOnInit() {
    
    if (localStorage.getItem('user')) {
      this.router.navigate(['dashboard']);
    }
  }
  loginWithGoogle() {
    this.authservice.loginWithGoogle();
  }
}