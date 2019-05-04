import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = '';
  password = '';

  constructor(private provider: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  auth() {
    if (this.login !== '' && this.password !== '') {
      this.provider.auth(this.login, this.password)
        .subscribe(res => {
          localStorage.setItem('token', res['token']);
          this.router.navigateByUrl('tasks');
        });
    }
  }

}
