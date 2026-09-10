import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroForm } from './cadastro-form';

describe('CadastroForm', () => {
  let component: CadastroForm;
  let fixture: ComponentFixture<CadastroForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
