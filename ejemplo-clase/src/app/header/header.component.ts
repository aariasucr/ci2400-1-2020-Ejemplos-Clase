import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName: string;
  fullName: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.statusChange.subscribe(userData => {
      console.log('userData', userData);
      if (userData) {
        this.isLoggedIn = true;
        this.userName = userData.username;
        this.fullName = userData.fullName;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.userService.performLogout();
  }
}
