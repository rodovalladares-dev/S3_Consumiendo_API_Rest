
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent - Semana 5', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ======================================================================
  // TEST 1 → Login incorrecto debe generar error = true
  // ======================================================================
  it('debería mostrar error si el usuario no existe', () => {
    
    localStorage.setItem('usuarios', JSON.stringify([]));

    component.formLogin.get('email')?.setValue('noexiste@test.cl');
    component.formLogin.get('password')?.setValue('Clave123');

    component.login();

    expect(component.error).toBeTrue();
  });

  // ======================================================================
  // TEST 2 → Login correcto debe crear sesión y redirigir
  // ======================================================================
  it('debería iniciar sesión si las credenciales existen', () => {

    const mockUser = {
      nombre: 'Juan',
      usuario: 'juanito',
      email: 'test@test.cl',
      password: 'Admin123!',
      tipo: 'usuario'
    };

    localStorage.setItem('usuarios', JSON.stringify([mockUser]));

    component.formLogin.get('email')?.setValue('test@test.cl');
    component.formLogin.get('password')?.setValue('Admin123!');

    // 🔥 Importante: ahora SÍ podemos hacer spy
    const spyRedirect = spyOn(window.location, 'assign');

    component.login();

    const sesion = JSON.parse(localStorage.getItem('sesion') || '{}');

    expect(sesion.logueado).toBeTrue();
    expect(sesion.usuario).toBe('juanito');

    // Validamos que se intentó redirigir
    expect(spyRedirect).toHaveBeenCalled();
  });

});
