import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {

  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [RegisterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // detecta el formulario inicial
  });

  // --------------------------------------------------------------
  // Test 1: El formulario debe ser inválido si faltan campos
  // --------------------------------------------------------------
  it('debería marcar como inválido el formulario si faltan campos requeridos', () => {
    const form = component.formRegistro;

    // Dejamos todo vacío
    form.setValue({
      nombre: '',
      usuario: '',
      email: '',
      fechaNacimiento: '',
      password: '',
      password2: '',
      direccion: ''
    });

    expect(form.invalid).toBeTrue(); // Test pasa si el form está inválido
  });

  // --------------------------------------------------------------
  // Test 2: La contraseña debe cumplir el patrón mayúscula + número
  // --------------------------------------------------------------
  it('debería rechazar una contraseña sin mayúscula y número', () => {
    const password = component.formRegistro.get('password');
    password?.setValue('abc123'); // no cumple (sin mayúscula)

    expect(password?.invalid).toBeTrue();
  });

  // --------------------------------------------------------------
  // Test 3: Validador personalizado → contraseñas iguales
  // --------------------------------------------------------------
  it('debería detectar contraseñas diferentes', () => {
    const form = component.formRegistro;

    form.get('password')?.setValue('Admin123!');
    form.get('password2')?.setValue('OtraClave');

    expect(form.errors?.['noCoinciden']).toBeTrue();
  });


/**
 * --------------------------------------------------------------
 * Test 4: Envío del formulario debe llamar a registrar()
 * -------------------------------------------------------------- 
 
 */
  it('debería llamar al método registrar() al enviar el formulario', () => {
    spyOn(component, 'registrar');
    component.formRegistro.setValue({
      nombre: 'Rodolfo',
      nacimiento: '01-01-1990',
      email: 'test@correo.com',
      password: 'Clave123',
      confirm_password: 'Clave123'
    });

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    expect(component.registrar).toHaveBeenCalled();
  });

  /**
   * --------------------------------------------------------------
   * Test 5: Limpiar el formulario debe resetear los campos
   * --------------------------------------------------------------
   */
  it('debería limpiar el formulario al llamar limpiar()', () => {
    component.formRegistro.setValue({
      nombre: 'Rodolfo',
      nacimiento: '01-01-1990',
      email: 'test@correo.com',
      password: 'Clave123',
      confirm_password: 'Clave123'
    });

    component.limpiar();
    expect(component.formRegistro.value).toEqual({
      nombre: null,
      nacimiento: null,
      email: null,
      password: null,
      confirm_password: null
    });
  });

});
