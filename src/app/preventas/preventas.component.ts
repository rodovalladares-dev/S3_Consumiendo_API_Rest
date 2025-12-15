/**
 * PreventasComponent
 * 
 * - Se agrega campo "descripcion" al formulario y CRUD.
 *  - Se agrega campo "fechaLanzamiento" para coincidir con la API real.  
 * - Se implementa persistencia simulada usando localStorage.
 * - Se agregan validaciones simples en el formulario.
 */

import { Component, OnInit } from '@angular/core';
import { PreventasService, Preventa } from '../services/preventas.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-preventas',
  templateUrl: './preventas.component.html',
  imports: [FormsModule, CommonModule],
  standalone: true,
  styleUrls: ['./preventas.component.css']
})
export class PreventasComponent implements OnInit {

  /**
   * Lista de preventas.
   * Semana 8: ahora se maneja en memoria + localStorage.
   */

  preventas: Preventa[] = [];

  /**
   * Formulario para crear/editar una preventa.
   * Semana 8: se agrega campo "descripcion" y "fechaLanzamiento".
   * Debe coincidir con la estructura de Preventa.
   * Semana 8: campo "fechaLanzamiento" agregado para coincidir con la API real.
   */
  formulario: Preventa = {
    id: 0,
    titulo: '',
    descripcion: '',
    imagen: '',
    categoria: '',
    precio: 0,
    fechaLanzamiento: ''  
  };

  /**
    * Indica si estamos en modo edición o creación.
    * Semana 8: para el CRUD simulado.
    * 
   */
  editando: boolean = false;

  /**
   * Clave para almacenar las preventas en localStorage.
   * Semana 8: para persistencia simulada.
   * 
   */
  private readonly STORAGE_KEY = 'preventasSemana8';

  constructor(private preventasService: PreventasService) {}

  ngOnInit(): void {

    /**
     * Semana 8: Cargamos las preventas desde localStorage si existen.
     * Si no, las obtenemos desde GitHub Pages.
     * 
     */
    const guardado = localStorage.getItem(this.STORAGE_KEY);

    if (guardado) {

      // Cargamos desde localStorage
      this.preventas = JSON.parse(guardado) as Preventa[];

    } else {

      // Obtenemos desde GitHub Pages

      this.preventasService.getPreventas().subscribe({
        next: (data) => {
          /**
           * Semana 8: Aseguramos que "descripcion" no sea null o undefined.
           * Si lo es, lo inicializamos como cadena vacía.
           * 
           */
          // this.preventas = data.map(p => ({
          //   ...p,
          //   descripcion: p.descripcion ?? '' 
          // }));


          this.preventas = data.map(p => {
            // Verificamos si existe p.descripcion, si no es null, y le quitamos espacios
            const descLimpia = (p.descripcion || '').trim();

            return {
              ...p,
              // Si después del trim está vacío, podrías poner un texto por defecto o dejarlo vacío
              descripcion: descLimpia.length > 0 ? descLimpia : 'Sin descripción'
            };
          });







          // Guardamos en localStorage para futuras cargas
          this.guardarEnLocalStorage();
        },
        error: (err) => {
          console.error('Error al obtener preventas desde GitHub Pages:', err);
        }
      });
    }
  }


  /**
   * 
   * Guarda una nueva preventa o actualiza una existente.
   * Semana 8: Implementa lógica para creación y edición en memoria + localStorage.
   */
  guardar(): void {


    if (!this.formulario.titulo.trim()) {
      alert('El título es obligatorio');
      return;
    }
    if (!this.formulario.descripcion.trim()) {
      alert('La descripción es obligatoria');
      return;
    }
    if (!this.formulario.imagen.trim()) {
      alert('La URL de la imagen es obligatoria');
      return;
    }

    if (this.formulario.precio <= 0) {
      alert('El precio debe ser mayor que cero');
      return;
    }
    if (!this.formulario.fechaLanzamiento.trim()) {
      alert('La fecha de lanzamiento es obligatoria');
      return;
    }

    if (this.editando) {

      // Actualizamos la preventa existente
      const index = this.preventas.findIndex(p => p.id === this.formulario.id);

      if (index !== -1) {
        // Reemplazamos la preventa existente por la nueva versión
        this.preventas[index] = { ...this.formulario };
      }

      this.editando = false;

    } else {


      // Creamos una nueva preventa
      // Generamos un ID único simple
      const nuevoId = this.preventas.length > 0
        ? Math.max(...this.preventas.map(p => p.id)) + 1
        : 1;

      this.preventas.push({
        ...this.formulario,
        id: nuevoId
      });
    }

    // Guardamos los cambios en localStorage (persistencia local simulada)
    this.guardarEnLocalStorage();

    // Reseteamos el formulario
    this.resetFormulario();
  }

  /**
   * Edita una preventa existente.
   * Semana 8: carga los datos en el formulario para edición.
   * 
   * 
   */
  editar(preventa: Preventa): void {
    this.formulario = { ...preventa }; // Clonamos el objeto
    this.editando = true;
  }

  /**

   * Elimina una preventa según su ID.
   */
  eliminar(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar esta preventa?')) return;

    this.preventas = this.preventas.filter(p => p.id !== id);

    // Persistimos cambios
    this.guardarEnLocalStorage();
  }

  /**
   * Cancela la edición y resetea el formulario.
   * Semana 8: vuelve al modo creación.
   * 
   */
  cancelar(): void {
    this.resetFormulario();
    this.editando = false;
  }

  /**
   * Resetea el formulario a su estado inicial.
   * Semana 8: incluye todos los campos.
   * 
   */
  private resetFormulario(): void {
    this.formulario = {
      id: 0,
      titulo: '',
      descripcion: '',
      imagen: '',
      categoria: '',
      precio: 0,
      fechaLanzamiento: ''
      
      
    };
  }

  /**
   * Guardamos las preventas en localStorage para mantener los cambios
   * al recargar la página. Esta es nuestra "persistencia simulada".
   */
  private guardarEnLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.preventas));
  }
}
