/**
 * Login Component que maneja la autenticación de usuarios en la aplicación.
 * Utiliza formularios reactivos para capturar las credenciales del usuario.
 * Al iniciar sesión correctamente, redirige al usuario a la página de perfil o admin según su tipo.
 * En caso de error, muestra un mensaje indicando que las credenciales son incorrectas.
 * 
 * @usageNotes
 * - El componente utiliza el servicio AuthService para validar las credenciales.
 * - La sesión del usuario se almacena en localStorage bajo la clave 'sesion'.
 * - El formulario valida que el email tenga un formato correcto y que la contraseña no esté vacía. 
 * @example
 * // Estructura esperada de la sesión en localStorage:
 * {
 *   "logueado": true,
 *   "usuario": "nombreUsuario",
 *   "tipo": "admin" | "usuario"
 * }
 * @author Rodolfo
 * @date 15-11-2025
 * @version 1.0.0
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Reactive Forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin!: FormGroup;

  error: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.error = false;

    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const { email, password } = this.formLogin.value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const usuario = usuarios.find((u: any) =>
      u.email === email && u.password === password
    );

    if (usuario) {
      localStorage.setItem('sesion', JSON.stringify({
        logueado: true,
        usuario: usuario.usuario,
        tipo: usuario.tipo || 'usuario'
      }));

      // 🔥 Cambiado para permitir spy en test
      window.location.assign(usuario.tipo === 'admin' ? '/admin' : '/perfil');

    } else {
      this.error = true;
    }
  }

  limpiar() {
    this.formLogin.reset();
    this.error = false;
  }
}
