/**
 * Admin Component - Maneja la visualización y gestión de usuarios registrados.
 * Permite al administrador ver la lista de usuarios y eliminar usuarios si es necesario.
 * Los datos de los usuarios se almacenan en localStorage.
 * Funciones principales:
 * - Cargar usuarios desde localStorage al iniciar el componente.
 *  - Mostrar la lista de usuarios en una tabla.
 *  - Eliminar un usuario y actualizar localStorage.
 * Nota: Este componente asume que el administrador ya ha iniciado sesión y tiene los permisos necesarios.
 * Autor: [Rodolfo]
 * Fecha: [01-12-2025]
 * Versión: 1.0.0
 * @usageNotes
 * - Asegúrate de que localStorage contiene una clave 'usuarios' con un array de objetos de usuario.
 * - Cada objeto de usuario debe tener al menos las propiedades: nombre, usuario, email, tipo.
 *  - El componente no maneja la autenticación; se espera que el usuario esté autenticado como administrador antes de acceder a esta vista.
 *  - Se recomienda implementar validaciones adicionales y manejo de errores para una aplicación en producción.
 * 
 * @example
 * // Estructura esperada en localStorage:
 * [
 *   {
 *     "nombre": "Juan Perez",
 *     "usuario": "juanp",
 *     "email": "
 *    "tipo": "usuario"
 *  },
 *  {
 *    "nombre": "Admin User",
 *    "usuario": "admin",
 *   "email": "
 *   "tipo": "admin"
 * }
 * ]

 *   
 */

import { Component, OnInit } from '@angular/core';
import { VentasService } from '../services/ventas.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuarios: any[] = [];
  ventas: any[] = [];
  
  constructor(private ventasService: VentasService) { }
  ngOnInit(): void {
    const data = localStorage.getItem('usuarios');
    if (data) {
      this.usuarios = JSON.parse(data);
    }
    this.ventasService.obtenerVentas().subscribe({
      next: (data) => {
        this.ventas = data;
      },
      error: (error) => {
        console.error('Error al obtener las ventas:', error);
      }
    });
  }

  eliminarUsuario(correo: string): void {
    this.usuarios = this.usuarios.filter(u => u.email !== correo);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }
}
