import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ejemplo-clase patito';
  prueba(nombre: string) {
    // return 'hola ' + nombre;
    return `hola ${nombre}`;
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Configuracion de Firebase (se toma de la consola Web => Project Settings)
    const firebaseConfig = {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: 'ejemplo-ci2400',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: ''
    };

    //Commit de prueba para Sonar

    // Inicializamos el cliente de firebase
    firebase.initializeApp(firebaseConfig);

    // Revise en firebase si el usuario cambio su estado de autenticacion
    // paso de logout a logged in o inverso
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userService.performLogin(user.uid);
      } else {
        this.userService.performLogout();
      }
    });
  }
}
