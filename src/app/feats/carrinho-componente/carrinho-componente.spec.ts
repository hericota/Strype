import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrinhoComponente } from './carrinho-componente';

describe('CarrinhoComponente', () => {
  let component: CarrinhoComponente;
  let fixture: ComponentFixture<CarrinhoComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrinhoComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(CarrinhoComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
