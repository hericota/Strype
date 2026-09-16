import { environment } from '../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { AtualizarProduto } from './atualizar-produto';

const produto = { id: 7, nome: 'Tênis', descricao: 'Esportivo', preco: 150, urlImagem: 'https://example.com/tenis.jpg' };
const url = environment.apiUrl;

describe('AtualizarProduto', () => {
  let fixture: ComponentFixture<AtualizarProduto>;
  let http: HttpTestingController;
  let navegar: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    TestBed.configureTestingModule({ imports: [AtualizarProduto], providers: [
      provideRouter([]), provideHttpClient(), provideHttpClientTesting(),
      { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '7' })) } },
    ] });
    fixture = TestBed.createComponent(AtualizarProduto);
    http = TestBed.inject(HttpTestingController);
    navegar = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture.detectChanges();
    TestBed.tick();
    http.expectOne(url).flush([produto]);
    http.expectOne(`${url}/7`).flush(produto);
    await fixture.whenStable();
    fixture.detectChanges();
  });
  afterEach(() => { http.verify(); vi.restoreAllMocks(); });

  function preencher(seletor: string, valor: string) {
    const campo = fixture.nativeElement.querySelector(seletor);
    campo.value = valor;
    campo.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }
  function salvar() {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
    fixture.detectChanges();
  }

  it('preenche o preço real, atualiza a prévia e salva os campos editados', () => {
    expect(fixture.nativeElement.querySelector('#preco').value).toBe('150');
    preencher('#nome', 'Tênis novo');
    preencher('#preco', '200');
    expect(fixture.nativeElement.querySelector('.previa h2').textContent).toContain('Tênis novo');
    salvar();
    salvar();
    const req = http.expectOne(`${url}/7`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ ...produto, nome: 'Tênis novo', preco: 200 });
    req.flush(null, { status: 204, statusText: 'No Content' });
    expect(navegar).toHaveBeenCalledWith(['/gerenciar']);
  });

  it('não envia formulário vazio, só com espaços ou preço negativo', () => {
    for (const [campo, valor] of [['#nome', ''], ['#nome', '   '], ['#preco', '-1']]) {
      preencher('#nome', 'Tênis');
      preencher(campo, valor);
      salvar();
      http.expectNone(`${url}/7`);
      expect(fixture.nativeElement.textContent).toContain('Preencha todos os campos');
    }
  });

  it('mantém a edição e permite tentar novamente após falha', () => {
    preencher('#nome', 'Tênis novo');
    salvar();
    http.expectOne(`${url}/7`).flush({}, { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#nome').value).toBe('Tênis novo');
    expect(fixture.nativeElement.textContent).toContain('Não foi possível salvar');
    expect(fixture.nativeElement.querySelector('.salvar').disabled).toBe(false);
    expect(navegar).not.toHaveBeenCalled();
  });
});
