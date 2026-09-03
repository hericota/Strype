import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaAdmin } from './tela-admin';

describe('TelaAdmin', () => {
  let component: TelaAdmin;
  let fixture: ComponentFixture<TelaAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
