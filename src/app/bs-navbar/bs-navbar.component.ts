import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.sass']
})
export class BsNavbarComponent {
  appUser: AppUser | undefined;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

  test() {
    console.log('success');
  }

}
