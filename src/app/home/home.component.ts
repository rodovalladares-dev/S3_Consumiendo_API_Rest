/**
 * HomeComponent es el componente principal que representa la página de inicio de la aplicación.
 * Actualmente, este componente no contiene lógica adicional, pero sirve como punto de entrada
 * para la navegación dentro de la aplicación.
 * 
 * Este componente está asociado con las siguientes rutas:
 * - Ruta raíz ('/'): Muestra el HomeComponent cuando el usuario accede a la aplicación.
 * 
 * El diseño y estilo del componente se manejan en el archivo CSS asociado. 
 * 
 *  
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
