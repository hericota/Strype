import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroComponente } from './cadastro-componente';

describe('CadastroComponente', () => {
  let component: CadastroComponente;
  let fixture: ComponentFixture<CadastroComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
