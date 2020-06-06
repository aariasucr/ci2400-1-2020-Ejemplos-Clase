import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {NotificationService} from '../shared/notification.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirePerformance} from '@angular/fire/performance';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  screenTrace: firebase.performance.Trace;

  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private firebaseAuth: AngularFireAuth,
    private firebasePerf: AngularFirePerformance
  ) {}

  ngOnInit() {
    if (!!this.firebasePerf) {
      this.firebasePerf.trace('loginScreen').then(trace => {
        this.screenTrace = trace;
        this.screenTrace.start();
      });
    }
  }

  ngOnDestroy() {
    if (!!this.firebasePerf) {
      this.screenTrace.stop();
    }
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(userData => {
        this.userService.performLogin(userData.user.uid);
        this.router.navigate(['/home']);
        // console.log('userData', userData);
      })
      .catch(error => {
        this.notificationService.showErrorMessage('Error iniciando sesión', error.message);
      });

    // if (email === 'test@test.com' && password === 'test123') {
    //   console.log('usuario correcto');
    //   this.userService.performLogin();
    //   this.router.navigate(['/home']);
    // } else {
    //   // Notificar con un Toast
    //   this.notificationService.showErrorMessage('Error!!', 'Error al hacer login');

    //   // Notificar con un banner casero
    //   // this.notificationService.displayBanner('error', 'Error al hacer login');
    // }
  }
}
