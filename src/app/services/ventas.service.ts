import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class VentasService {
  private Url = "assets/data/JuegosVentas.json"; 
  
  constructor(private http: HttpClient) {}
  
  obtenerVentas(): Observable<any> {
    return this.http.get<any>(this.Url);
  }
}