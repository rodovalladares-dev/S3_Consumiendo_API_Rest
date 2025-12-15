// Semana 5 - Importamos ReactiveFormsModule para usar formularios reactivos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Componentes existentes del proyecto (Semana 4)
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { AdminComponent } from './admin/admin.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CarritoComponent } from './carrito/carrito.component';

// Semana 4 → FormsModule (template-driven)
import { FormsModule } from '@angular/forms';

// ⭐ Semana 5 – Lo nuevo:
import { ReactiveFormsModule } from '@angular/forms'; 
// Este módulo habilita FormGroup, FormControl, FormBuilder y Validators
// para la migración del formulario de registro y login.

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    RecoverComponent,
    AdminComponent,
    CategoriaComponent,
    PerfilComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Mantenemos FormsModule (porque otras partes del proyecto aún lo usan)
    FormsModule,

    // Semana 5 → Importamos ReactiveFormsModule para los formularios reactivos
    ReactiveFormsModule,

        // Semana 7 → HttpClientModule para llamadas HTTP
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
