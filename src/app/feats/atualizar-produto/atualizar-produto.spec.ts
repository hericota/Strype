import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtualizarProduto } from './atualizar-produto';

describe('AtualizarProduto', () => {
    let component: AtualizarProduto;
    let fixture: ComponentFixture<AtualizarProduto>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AtualizarProduto],
        }).compileComponents();

        fixture = TestBed.createComponent(AtualizarProduto);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
