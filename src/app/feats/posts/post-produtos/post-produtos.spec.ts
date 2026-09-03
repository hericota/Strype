import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProdutos } from './post-produtos';

describe('PostProdutos', () => {
  let component: PostProdutos;
  let fixture: ComponentFixture<PostProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostProdutos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostProdutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
