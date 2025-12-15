/**
 * Navbar Component gestiona la barra de navegación de la aplicación.
 * Muestra diferentes opciones de menú según el estado de sesión del usuario
 * (logueado o no logueado) y su tipo (admin o usuario).
 * 
 * Funcionalidades principales:
 * - Mostrar enlaces de navegación basados en el estado de sesión.
 * - Permitir al usuario cerrar sesión.
 * 
 * Este componente se suscribe a los cambios en el estado de sesión a través del AuthService,
 * asegurando que la barra de navegación se actualice dinámicamente cuando el usuario inicie
 * o cierre sesión.
 * 
 * Rutas asociadas:
 * - '/' : Página de inicio.
 * - '/categoria' : Página de categorías.
 * - '/perfil' : Página de perfil del usuario (visible solo si está logueado).
 * - '/admin' : Página de administración (visible solo para usuarios admin).
 * - '/login' : Página de inicio de sesión (visible solo si no está logueado).
 * 
 * @author Rodolfo
 * @date 20-11-2025
 * @version 1.0.0
 * Notas adicionales:
 * - El diseño y estilo del componente se manejan en el archivo CSS asociado.
 * - Se recomienda implementar pruebas unitarias para asegurar el correcto funcionamiento
 *   de la lógica de visualización basada en el estado de sesión.
 *  
 * 
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sesion: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  this.auth.sesion$.subscribe(sesion => {
    this.sesion = sesion;
  });
}


  cerrarSesion() {
    console.log("🔴 Cerrando sesión...");
    this.auth.cerrarSesion();
    this.router.navigate(['/']);
  }
}
