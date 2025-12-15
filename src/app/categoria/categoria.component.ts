import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente para mostrar los juegos de una categoría específica.
 * Permite a los usuarios ver los juegos disponibles en la categoría
 * seleccionada y agregar juegos al carrito de compras.
 *
 * @example
 * // URL de ejemplo para acceder a esta categoría:
 * /categoria/Estrategia
 *
 * @usageNotes
 * - La categoría se obtiene desde los parámetros de la ruta.
 * - Los juegos se cargan desde un objeto local `datos`.
 * - Solo los usuarios autenticados pueden agregar juegos al carrito.
 */
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  /**
   * Categoría actual seleccionada por el usuario.
   * Se obtiene desde los parámetros de la ruta.
   */
  categoria = 'plop';

  /**
   * Arreglo de juegos pertenecientes a la categoría seleccionada.
   * Cada juego contiene:
   *  - título
   *  - imagen
   *  - precio
   */
  juegos: any[] = [];

  /**
   * Objeto que contiene todas las categorías con sus juegos precargados.
   * En un proyecto profesional, esta información vendría desde un backend
   * o desde un servicio HttpClient.
   */
  private datos: any = {
    Estrategia: [
      { titulo: 'Los Castillos de Borgoña', imagen: 'assets/img/Los_Castillos_de_Borgoña.jpeg', precio: 29990, descrip: 'Un juego de estrategia donde los jugadores construyen su propio principado en la región de Borgoña durante la Edad Media.' },
      { titulo: 'Catan', imagen: 'assets/img/catan.jpeg', precio: 19990, descrip: 'Un juego de comercio y construcción donde los jugadores colonizan una isla rica en recursos naturales.' },
      { titulo: 'Terraforming Mars', imagen: 'assets/img/Terraforming_Mars.jpeg', precio: 9990, descrip: 'Un juego de estrategia donde los jugadores compiten para transformar Marte en un planeta habitable mediante la gestión de recursos y proyectos científicos.' }

    ],
    Tematicos: [
      { titulo: 'Gloomhaven', imagen: 'assets/img/Gloomhaven.jpeg', precio: 39990 },
      { titulo: 'Twilight Imperium IV', imagen: 'assets/img/Twilight_Imperium_04.jpeg', precio: 29990 },
      { titulo: 'Mansions Madness', imagen: 'assets/img/mansions_madness.jpeg', precio: 9990 }

      
    ],
    Party: [
      { titulo: 'Codenames', imagen: 'assets/img/Codenames.jpg', precio: 37990 },
      { titulo: 'Dixit', imagen: 'assets/img/Dixit.jpeg', precio: 59990 },
      { titulo: 'Exploding Kittens', imagen: 'assets/img/Exploding_Kittens.jpeg', precio: 9990 }
    ]
  };

  /**
   * Información de la sesión del usuario si es que está logueado.
   */
  sesion: any = null;

  /**
   * Constructor del componente.
   *
   * @param route Permite obtener parámetros de la ruta activa.
   * @param auth Servicio de autenticación para validar sesión.
   * @param router Router utilizado para navegar entre rutas.
   */
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) { }

  /**
   * Se ejecuta al cargar el componente.
   * - Carga la sesión del usuario desde localStorage.
   * - Obtiene el parámetro "nombre" desde la URL.
   * - Carga los juegos que pertenecen a la categoría seleccionada.
   *
   * @example
   * // Si la URL es /categoria/aventura
   * this.categoria === "aventura"
   * this.juegos === datos["aventura"]
   */
  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    this.route.params.subscribe(params => {
      this.categoria = params['nombre'];
      this.juegos = this.datos[this.categoria] || [];
    });
  }

  /**
   * Agrega un juego al carrito del usuario.
   * Solo los usuarios logueados como "usuario" pueden agregar productos.
   *
   * @param juego Objeto que contiene la información del juego seleccionado:
   *  - título
   *  - imagen
   *  - precio
   *
   * @example
   * agregarAlCarrito({ titulo: 'FIFA', precio: 29990 });
   *
   * @usageNotes
   * - Si el usuario no está logueado, se muestra una alerta.
   * - El carrito se guarda en localStorage bajo la clave carrito_email.
   * - Si el producto ya está en el carrito, aumenta la cantidad.
   */
  agregarAlCarrito(juego: any) {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (!sesion || sesion.tipo !== 'usuario') {
      alert('Debes iniciar sesión como usuario para agregar al carrito.');
      return;
    }

    const claveCarrito = 'carrito_' + sesion.email;
    const carritoStr = localStorage.getItem(claveCarrito);
    const carrito = carritoStr ? JSON.parse(carritoStr) : [];

    const index = carrito.findIndex((item: any) => item.nombre === juego.titulo);

    if (index >= 0) {
      carrito[index].cantidad++;
    } else {
      carrito.push({
        nombre: juego.titulo,
        categoria: this.categoria,
        precio: 29990,
        cantidad: 1
      });
    }

    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    alert('¡Agregado al carrito con éxito!');
  }

}
