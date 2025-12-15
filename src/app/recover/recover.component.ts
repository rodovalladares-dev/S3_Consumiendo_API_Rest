/**
 * Componente para la recuperación de contraseña.
 * 
 * - El componente utiliza formularios reactivos para manejar la entrada del usuario.
 * - Se valida que el correo electrónico tenga un formato correcto.
 * - La recuperación de contraseña se simula buscando en el almacenamiento local.
 * - Si el correo existe, se muestra la contraseña asociada; de lo contrario, se muestra un mensaje de error.
 * 
 * @example
 * // Estructura esperada de los usuarios en localStorage:
 * [
 *   {
 *     "nombre": "Nombre Completo",
 *     "usuario": "nombreUsuario",
 *     "email": "
 *  "password": "ContraseñaSegura1",
 *    "tipo": "admin" | "usuario"
 *  }
 * ]
 * 
 *  @usageNotes
 * - El componente no envía correos electrónicos reales; la funcionalidad de recuperación es simulada para fines de demostración.
 * - Se recomienda implementar una solución de backend para manejar la recuperación de contraseñas en una aplicación real.
 * 
 * Notas adicionales:
 * - El diseño y estilo del componente se manejan en el archivo CSS asociado.
 * - Se recomienda implementar validaciones adicionales y manejo de errores para una aplicación en producción.
 *   
 *  
 */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent {

  // Formulario reactivo
  formRecover!: FormGroup;

  mensaje = '';
  error = '';

  constructor(private fb: FormBuilder) {
    // Inicialización del FormGroup
    this.formRecover = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // ===============================================
  // Recuperación de contraseña
  // ===============================================
  recuperar() {
    this.mensaje = '';
    this.error = '';

    // Validar formulario
    if (this.formRecover.invalid) {
      this.formRecover.markAllAsTouched();
      return;
    }

    const email = this.formRecover.value.email;
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) => u.email === email);

    if (!usuario) {
      this.error = 'Usuario no encontrado con ese correo.';
    } else {
      this.mensaje = `Hola ${usuario.nombre}, tu contraseña es: ${usuario.password}`;
    }
  }

  // Limpiar
  limpiar() {
    this.formRecover.reset();
    this.error = '';
    this.mensaje = '';
  }
}
