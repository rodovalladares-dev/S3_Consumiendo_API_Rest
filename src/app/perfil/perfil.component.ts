/**
 * Perfil Component gestiona la visualización y edición del perfil del usuario.
 * Permite a los usuarios ver y actualizar su información personal, incluyendo
 * nombre, usuario, correo electrónico y contraseña.
 * 
 * Funcionalidades principales:
 * - Cargar los datos del usuario desde el almacenamiento local al iniciar el componente.
 * - Mostrar un formulario reactivo con validaciones para editar los datos del usuario.
 * - Permitir al usuario guardar los cambios realizados en su perfil.
 * - Validar la contraseña para asegurar que cumple con los requisitos de seguridad.
 * - Opción para mostrar u ocultar la contraseña ingresada.
 * 
 * Rutas asociadas:
 * - '/perfil' : Página de perfil del usuario (visible solo si está logueado).
 * 
 * @author Rodolfo
 * @date 22-11-2025
 * @version 1.0.0
 * Notas adicionales:
 * - El diseño y estilo del componente se manejan en el archivo CSS asociado.
 * - Se recomienda implementar pruebas unitarias para asegurar el correcto funcionamiento
 *   de la lógica de edición y validación del perfil. 
 * 
 * @usageNotes
 * - El componente utiliza Reactive Forms para manejar el formulario de perfil.
 * - Los datos del usuario se almacenan en localStorage bajo la clave 'usuarios'.
 * - La sesión actual del usuario se almacena en localStorage bajo la clave 'sesion'. 
 * @example
 * // Estructura esperada de un usuario en localStorage:
 * {
 *   "nombre": "Nombre Completo",
 *   "usuario": "nombreUsuario",
 *   "email": " 
 *    
 *  "password": "ContraseñaSegura1",
 *   "tipo": "admin" | "usuario"
 * }
 * 
 * Notas adicionales:
 * - La contraseña debe tener al menos 6 caracteres, incluir al menos una letra mayúscula y un número.
 * - El correo electrónico no es editable desde el perfil por razones de seguridad.
 * - Los cambios realizados en el perfil se reflejan inmediatamente en la sesión activa.
 * - Se recomienda implementar una funcionalidad adicional para cambiar el correo electrónico
 *  con un proceso de verificación.
 * - El componente no maneja la autenticación del usuario; se espera que el usuario esté autenticado antes de acceder al perfil.
 * - El diseño y estilo del componente se manejan en el archivo CSS asociado.
 * - Se recomienda implementar validaciones adicionales y manejo de errores para una aplicación en producción.
 * - Se recomienda implementar pruebas unitarias para asegurar el correcto funcionamiento de la lógica de edición y validación del perfil.
 *   
 * 
 * 
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  formPerfil!: FormGroup;
  usuarios: any[] = [];
  mensaje = '';

  // Ver / ocultar contraseña
  mostrarPassword = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    const usuariosStr = localStorage.getItem('usuarios');
    this.usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

    const usuarioCompleto = this.usuarios.find(
      u => u.usuario === sesion?.usuario
    );

    // Formulario
    this.formPerfil = this.fb.group({
      nombre: [usuarioCompleto?.nombre, Validators.required],

      usuario: [usuarioCompleto?.usuario, Validators.required],

      email: [{ value: usuarioCompleto?.email, disabled: true }],

      password: [
        usuarioCompleto?.password,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ],

      tipo: [{ value: usuarioCompleto?.tipo, disabled: true }]
    });
  }

  // Ver/ocultar password
  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  guardarCambios() {
    if (this.formPerfil.invalid) {
      this.formPerfil.markAllAsTouched();
      return;
    }

    const datos = this.formPerfil.getRawValue();

    const index = this.usuarios.findIndex(u => u.usuario === datos.usuario);

    if (index !== -1) {
      this.usuarios[index] = { ...this.usuarios[index], ...datos };

      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
      localStorage.setItem('sesion', JSON.stringify(this.usuarios[index]));

      this.mensaje = 'Cambios guardados correctamente.';
    }
  }
}
