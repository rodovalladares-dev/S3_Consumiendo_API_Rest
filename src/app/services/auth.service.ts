/**
 * Servicio de autenticación para gestionar la sesión del usuario.
 * 
 * Funcionalidades:
 * - Iniciar y cerrar sesión.
 * - Verificar si un usuario está logueado y su tipo (admin o usuario).
 * - Almacenar y recuperar la sesión desde localStorage.
 * - Proporciona un observable para que otros componentes puedan suscribirse a los cambios en la sesión.
 * @author Rodolfo
 * @date 18-11-2025
 * @version 1.0.0
 * 
 * @usageNotes
 * - La sesión del usuario se almacena en localStorage bajo la clave 'sesion'.
 * - El servicio utiliza BehaviorSubject para emitir cambios en la sesión.
 * 
 * @example
 * // Estructura esperada de la sesión en localStorage:
 * {
 *   "logueado": true,
 *   "usuario": "nombreUsuario",
 *   "tipo": "admin" | "usuario"
 * }
 * Notas adicionales:
 * - Se recomienda implementar pruebas unitarias para asegurar el correcto funcionamiento
 *   de la lógica de autenticación y gestión de sesión.
 * - Este servicio debe ser inyectado en los componentes que requieran información sobre la sesión del usuario.
 *  
 * 
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sesionSubject = new BehaviorSubject<any>(this.getSesion());
  sesion$ = this.sesionSubject.asObservable();

  constructor() {
  const usuariosStr = localStorage.getItem('usuarios');
  if (!usuariosStr) {
    const admin = {
      nombre: 'Admin',
      email: 'admin@duoc.cl',
      password: 'admin',
      tipo: 'admin'
    };
    localStorage.setItem('usuarios', JSON.stringify([admin]));
  }
}


  getSesion() {
    const sesion = localStorage.getItem('sesion');
    return sesion ? JSON.parse(sesion) : null;
  }

  estaLogueado(): boolean {
    const sesion = this.getSesion();
    return sesion?.logueado || false;
  }

  esAdmin(): boolean {
    const sesion = this.getSesion();
    return sesion?.tipo === 'admin';
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.sesionSubject.next(null); // 🔁 actualiza para los suscriptores
  }

  iniciarSesion(sesionData: any): void {
    localStorage.setItem('sesion', JSON.stringify(sesionData));
    this.sesionSubject.next(sesionData); // 🔁 notifica cambios
  }

  addUser(user: any): boolean {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const existe = usuarios.some((u: any) => u.email === user.email);
  if (existe) return false;
  usuarios.push(user);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  return true;
}

}

