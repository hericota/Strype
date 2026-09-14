import { ComponentFixture, TestBed } from '@angular/core/testing';
import { produtosCadastrados } from './produtos-cadastrados';
import { produtosCadastrados as ProdutosCadastrados } from './produtos-cadastrados';

describe('ProdutosCadastrados', () => {
  let component: produtosCadastrados;
  let fixture: ComponentFixture<produtosCadastrados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [produtosCadastrados],
    }).compileComponents();

    fixture = TestBed.createComponent(produtosCadastrados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
