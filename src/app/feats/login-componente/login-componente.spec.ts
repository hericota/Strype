import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponente } from './login-componente';

describe('LoginComponente', () => {
  let component: LoginComponente;
  let fixture: ComponentFixture<LoginComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
