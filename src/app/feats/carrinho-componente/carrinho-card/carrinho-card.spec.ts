import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrinhoCard } from './carrinho-card';

describe('CarrinhoCard', () => {
  let component: CarrinhoCard;
  let fixture: ComponentFixture<CarrinhoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrinhoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CarrinhoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
