import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../shared/app.service';

@Component({
  selector: 'app-otp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private router: Router, private loginService: AppService) { }

  ngOnInit() {
  }

  signIn() {
    this.loginService.emailLogin(this.username, this.password)
      .then((data) => {
        if(data) {
          console.log(this.loginService.autheticated);
          this.loginService.getToken();
          this.router.navigate(['/news-dashboard']);
        } else {
          window.alert('Invalid Credentials');
        }
      }).catch((err) => {
        console.log(err);
      });
  }

}
