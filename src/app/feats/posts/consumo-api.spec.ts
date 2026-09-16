import { environment } from '../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConsumoApi } from './consumo-api';

const produto = { id: 7, nome: 'Tênis', descricao: 'Esportivo', preco: 150, urlImagem: 'https://example.com/tenis.jpg' };
const url = environment.apiUrl;

describe('ConsumoApi', () => {
  let service: ConsumoApi;
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(ConsumoApi);
    http = TestBed.inject(HttpTestingController);
    TestBed.tick();
    http.expectOne(url).flush([produto]);
    await TestBed.inject(ApplicationRef).whenStable();
  });

  afterEach(() => http.verify());

  it('envia PUT com os dados e aceita resposta sem corpo', () => {
    let salvo = false;
    service.atualizarPostService(7, { ...produto, preco: 200 }).subscribe(() => salvo = true);
    const req = http.expectOne(`${url}/7`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.preco).toBe(200);
    req.flush(null, { status: 204, statusText: 'No Content' });
    expect(salvo).toBe(true);
  });

  it('exclui pelo ID e remove da lista somente após o sucesso', () => {
    service.deletarPostService(7).subscribe();
    const req = http.expectOne(`${url}/7`);
    expect(req.request.method).toBe('DELETE');
    expect(service.produtoCadastrado.value()).toEqual([produto]);
    req.flush(null, { status: 204, statusText: 'No Content' });
    expect(service.produtoCadastrado.value()).toEqual([]);
  });

  it('mantém o produto quando o DELETE falha', () => {
    service.deletarPostService(7).subscribe({ error: () => {} });
    http.expectOne(`${url}/7`).flush({}, { status: 500, statusText: 'Server Error' });
    expect(service.produtoCadastrado.value()).toEqual([produto]);
  });
});
