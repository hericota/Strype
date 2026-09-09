import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Deletar } from './deletar';

describe('Deletar', () => {
  let component: Deletar;
  let fixture: ComponentFixture<Deletar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deletar],
    }).compileComponents();

    fixture = TestBed.createComponent(Deletar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
