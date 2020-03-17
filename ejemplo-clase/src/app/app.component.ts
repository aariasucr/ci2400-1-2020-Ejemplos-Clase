import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ejemplo-clase patito';

  prueba(nombre: string) {
    // return 'hola ' + nombre;
    return `hola ${nombre}`;
  }
}
