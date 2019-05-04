import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private provider: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.provider.logout()
      .subscribe(res => {
        localStorage.clear();
        this.router.navigateByUrl('');
      });
  }

}
