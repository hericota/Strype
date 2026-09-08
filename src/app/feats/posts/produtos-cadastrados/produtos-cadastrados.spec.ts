import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutosCadastrados } from './produtos-cadastrados';

describe('ProdutosCadastrados', () => {
  let component: ProdutosCadastrados;
  let fixture: ComponentFixture<ProdutosCadastrados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosCadastrados],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutosCadastrados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
