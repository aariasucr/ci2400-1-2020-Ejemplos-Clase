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
  loginTrace: firebase.performance.Trace;

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
      this.firebasePerf.trace('userLogin').then(trace => {
        this.loginTrace = trace;
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

    this.startLoginTrace();

    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(userData => {
        this.trackLoginTraceAttribute('emailVerified', `${userData.user.emailVerified}`);
        this.userService.performLogin(userData.user.uid);
        this.router.navigate(['/home']);
        // console.log('userData', userData);
      })
      .catch(error => {
        this.trackLoginTraceAttribute('errorCode', `${error.code}`);
        this.notificationService.showErrorMessage('Error iniciando sesión', error.message);
      });

    this.stopLoginTrace();

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

  stopLoginTrace() {
    if (!!this.firebasePerf && !!this.loginTrace) {
      this.loginTrace.stop();
      this.firebasePerf.trace('userLogin').then(trace => {
        this.loginTrace = trace;
      });
    }
  }

  startLoginTrace() {
    if (!!this.firebasePerf && !!this.loginTrace) {
      this.loginTrace.start();
    }
  }

  trackLoginTraceAttribute(attributeName: string, value: any) {
    if (!!this.firebasePerf && !!this.loginTrace) {
      this.loginTrace.putAttribute(attributeName, value);
    }
  }
}
