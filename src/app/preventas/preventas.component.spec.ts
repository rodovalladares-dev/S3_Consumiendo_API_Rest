import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PreventasComponent } from './preventas.component';

describe('PreventasComponent', () => {
  let component: PreventasComponent;
  let fixture: ComponentFixture<PreventasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreventasComponent]
    });
    fixture = TestBed.createComponent(PreventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
