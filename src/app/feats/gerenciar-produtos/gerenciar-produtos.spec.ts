import { environment } from '../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GerenciarProdutos } from './gerenciar-produtos';

const produto = { id: 7, nome: 'Tênis', descricao: 'Esportivo', preco: 150, urlImagem: 'https://example.com/tenis.jpg' };
const url = environment.apiUrl;

describe('GerenciarProdutos', () => {
  let fixture: ComponentFixture<GerenciarProdutos>;
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [GerenciarProdutos], providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()] });
    fixture = TestBed.createComponent(GerenciarProdutos);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    TestBed.tick();
    http.expectOne(url).flush([produto]);
    await fixture.whenStable();
    fixture.detectChanges();
  });
  afterEach(() => { http.verify(); vi.restoreAllMocks(); });

  it('filtra por nome e ID e exibe o estado vazio', () => {
    const busca: HTMLInputElement = fixture.nativeElement.querySelector('input');
    for (const [termo, quantidade] of [['TÊNIS', 1], ['7', 1], ['inexistente', 0]] as const) {
      busca.value = termo;
      busca.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('article').length).toBe(quantidade);
    }
    expect(fixture.nativeElement.textContent).toContain('Nenhum produto encontrado.');
  });

  it('não envia DELETE ao cancelar a confirmação', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    fixture.nativeElement.querySelector('.botao-excluir').click();
    http.expectNone(`${url}/7`);
  });

  it('bloqueia cliques duplicados, recarrega a lista e informa sucesso', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const botao = fixture.nativeElement.querySelector('.botao-excluir');
    botao.click();
    botao.click();
    const req = http.expectOne(`${url}/7`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
    TestBed.tick();
    http.expectOne(url).flush([]);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('article').length).toBe(0);
    expect(fixture.nativeElement.textContent).toContain('excluído com sucesso');
  });

  it('exibe o erro e mantém o produto quando a exclusão falha', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    fixture.nativeElement.querySelector('.botao-excluir').click();
    http.expectOne(`${url}/7`).flush({}, { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Não foi possível excluir');
    expect(fixture.nativeElement.querySelectorAll('article').length).toBe(1);
    expect(fixture.nativeElement.querySelector('.botao-excluir').disabled).toBe(false);
  });
});
