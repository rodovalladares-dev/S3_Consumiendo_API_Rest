import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Debe coincidir con el JSON real del github pages
export interface Preventa {
  
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;  
  fechaLanzamiento: string;
  
  precio: number;         
}


@Injectable({
  providedIn: "root"
})

export class PreventasService {

  private Url = 'https://rodovalladares-dev.github.io/Ventas_json/preventas.json';


   constructor(private http: HttpClient) {}

  /**
    * Método para obtener la lista de preventas desde el JSON.
   * @returns Observable<Preventa[]>
   */
  getPreventas(): Observable<Preventa[]> {
    return this.http.get<Preventa[]>(this.Url);
  }
}


