import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  // Mock de datos de usuario
  const mockUsuario = {
    nombre: 'Rodolfo Test',
    usuario: 'rodolfo123',
    email: 'test@correo.com',
    password: 'Password1',
    tipo: 'usuario'
  };

  const mockUsuarios = [mockUsuario];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilComponent ],
      imports: [ ReactiveFormsModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    // Configurar localStorage antes de cada test
    localStorage.setItem('sesion', JSON.stringify({ usuario: 'rodolfo123' }));
    localStorage.setItem('usuarios', JSON.stringify(mockUsuarios));

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta ngOnInit
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

// Pruebas de Inicialización y Carga

  it('debe cargar los datos del usuario en el formulario al iniciar', () => {
    const formValues = component.formPerfil.getRawValue();
    expect(formValues.nombre).toBe(mockUsuario.nombre);
    expect(formValues.usuario).toBe(mockUsuario.usuario);
    expect(formValues.email).toBe(mockUsuario.email);
    expect(component.formPerfil.get('email')?.disabled).toBeTrue();
  });

  //Pruebas de Validación de Password

  it('debe validar que el password cumple con los requisitos (Min 6, Mayúscula, Número)', () => {
    const passwordControl = component.formPerfil.get('password');

    // Caso inválido: solo letras minúsculas
    passwordControl?.setValue('abcde');
    expect(passwordControl?.valid).toBeFalse();

    // Caso inválido: falta número
    passwordControl?.setValue('Abcdef');
    expect(passwordControl?.valid).toBeFalse();

    // Caso válido
    passwordControl?.setValue('Segura1');
    expect(passwordControl?.valid).toBeTrue();
  });

  //Pruebas de Funcionalidad

  it('debe alternar la visibilidad de la contraseña al llamar a togglePassword()', () => {
    expect(component.mostrarPassword).toBeFalse();
    component.togglePassword();
    expect(component.mostrarPassword).toBeTrue();
  });

  it('debe actualizar localStorage cuando el formulario es válido y se guarda', () => {
    // Modificamos el nombre en el formulario
    component.formPerfil.patchValue({ nombre: 'Nuevo Nombre' });
    
    component.guardarCambios();

    const usuariosEnStorage = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const sesionEnStorage = JSON.parse(localStorage.getItem('sesion') || '{}');

    expect(usuariosEnStorage[0].nombre).toBe('Nuevo Nombre');
    expect(sesionEnStorage.nombre).toBe('Nuevo Nombre');
    expect(component.mensaje).toBe('Cambios guardados correctamente.');
  });

  it('no debe guardar cambios si el formulario es inválido', () => {
    // Password demasiado corto
    component.formPerfil.patchValue({ password: '123' });
    
    component.guardarCambios();

    expect(component.formPerfil.invalid).toBeTrue();
    // No debería haber mensaje de éxito
    expect(component.mensaje).not.toBe('Cambios guardados correctamente.');
  });
});