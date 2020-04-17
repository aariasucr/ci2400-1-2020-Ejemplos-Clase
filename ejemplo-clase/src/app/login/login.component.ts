import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    // console.log('email', email);
    // console.log('password', password);

    if (email === 'test@test.com' && password === 'test123') {
      console.log('usuario correcto');
      this.userService.performLogin();
      this.router.navigate(['/home']);
    } else {
      // Notificar con un Toast
      this.notificationService.showErrorMessage('Error!!', 'Error al hacer login');

      // Notificar con un banner casero
      // this.notificationService.displayBanner('error', 'Error al hacer login');
    }
  }
}
