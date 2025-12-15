/**
 * CarritoComponent maneja la lógica del carrito de compras, permitiendo a los usuarios
 * ver, modificar y finalizar la compra de los productos añadidos.
 * 
 * Funciones principales:
 * - Cargar el carrito desde localStorage al iniciar el componente.
 * - Mostrar los productos en el carrito con sus detalles (título, precio, cantidad).
 * - Permitir eliminar productos del carrito.
 * - Calcular y mostrar el total de la compra.
 * - Vaciar el carrito.
 * - Finalizar la compra (simulado con una alerta).
 *  @usageNotes
 * - El carrito se almacena en localStorage bajo la clave 'carrito_email', donde 'email' es el correo del usuario.
 * - Se asume que el usuario ya ha iniciado sesión y su información está disponible en localStorage.
 *  @example
 * // Estructura esperada del carrito en localStorage:
 * [
 *  {
 *   "nombre": "Dixit",
 *   "precio": 29990,
 *   "cantidad": 1,
 * "Categoria": "Party"
 *  },
 * {
 *  "nombre": "Terraforming Mars",
 *  "precio": 39990,
 *  "cantidad": 1,
 * "Categoria": "Estrategia"
 * }
 * ]
 * @author Rodolfo
 * @date 01-12-2025
 * @version 1.0.0
 * 
 * Notas adicionales:
 * - Este componente no maneja la autenticación del usuario; se espera que el usuario esté autenticado antes de acceder al carrito.
 * - La funcionalidad de compra es simulada mediante una alerta; en una aplicación real, esto debería integrarse con un sistema de pago.
 * - Se recomienda implementar validaciones adicionales y manejo de errores para una aplicación en producción.
 * - El diseño y estilo del componente se manejan en el archivo CSS asociado.
 *  
 *  
 * 
 * 
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  

  carrito: any[] = [];
  total = 0;
  claveCarrito = '';

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (sesion?.logueado) {
      this.claveCarrito = 'carrito_' + sesion.email;
      this.cargarCarrito();
    }
  }

  cargarCarrito() {
    this.carrito = JSON.parse(localStorage.getItem(this.claveCarrito) || '[]');
    this.total = this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  }

  eliminar(index: number) {
    this.carrito.splice(index, 1);
    localStorage.setItem(this.claveCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

  vaciarCarrito() {
    localStorage.removeItem(this.claveCarrito);
    this.cargarCarrito();
  }

  comprar() {
    if (this.carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    alert('¡Compra realizada con éxito!');
    this.vaciarCarrito();
  }

  actualizarCantidad(index: number, nuevaCantidad: number) {
    if (nuevaCantidad < 1) return;

    this.carrito[index].cantidad = nuevaCantidad;
    localStorage.setItem(this.claveCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

}
