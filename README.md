<div align="center">

# Stryde

**E-commerce de moda e equipamentos esportivos desenvolvido com Angular.**

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![npm](https://img.shields.io/badge/npm-11-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)

[Planejamento no Figma](https://www.figma.com/design/vwQVA1HrobIvbGSWvCdff7/Projeto-aula-Henrique?node-id=0-1)

</div>

## Sobre o projeto

O **Stryde** é uma loja virtual voltada a tênis, roupas, calçados, acessórios e equipamentos esportivos. O projeto acadêmico está sendo desenvolvido em Angular e segue um protótipo criado no Figma, com identidade visual em preto, branco e laranja.

> O projeto está em desenvolvimento. O Figma representa o escopo planejado; nem todas as telas e interações já estão disponíveis na aplicação.

## Estado atual

- Aplicação standalone configurada com Angular 22;
- Página inicial com cabeçalho;
- Navegação inicial por marcas e categorias;
- Campo de pesquisa e atalhos visuais para usuário e carrinho;
- Roteamento com Angular Router;
- Tela inicial da área administrativa;
- Formulário de cadastro de produtos;
- Validação dos campos com Signal Forms;
- Integração HTTP para cadastrar produtos;
- Localização configurada como `pt-BR`.

## Escopo planejado no Figma

O protótipo apresenta o fluxo completo esperado para a plataforma:

- Home com banners promocionais e vitrines por marcas e categorias;
- Catálogos das linhas Air Force, Dunk, Air Jordan, Air Max e roupas;
- Login e criação de conta;
- Entrada com Google e Apple;
- Pesquisa de produtos;
- Lista de favoritos;
- Carrinho com seleção de itens, controle de quantidade, descontos e total;
- Área administrativa;
- Cadastro, edição e exclusão de produtos;
- Newsletter, redes sociais e rodapé informativo;
- Informações sobre entregas, pagamentos e segurança.

## Tecnologias

- [Angular 22](https://angular.dev/)
- [TypeScript 6](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)
- Signal Forms
- Angular Router
- HTML5
- CSS3
- [Vitest](https://vitest.dev/)
- npm

## Pré-requisitos

Antes de começar, tenha instalado:

- [Node.js](https://nodejs.org/)
- npm

Para utilizar o cadastro de produtos, também é necessário executar uma API compatível em:

```text
http://localhost:8080/produtos
```

A API deve aceitar uma requisição `POST` com o seguinte formato:

```json
{
  "nome": "Nome do produto",
  "descricao": "Descrição do produto",
  "preco": 199.90,
  "urlImagem": "https://exemplo.com/imagem.png"
}
```

## Como executar

1. Clone o repositório:

```bash
git clone https://github.com/hericota/Strype.git
```

2. Entre na pasta do projeto:

```bash
cd Strype
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm start
```

5. Acesse `http://localhost:4200` no navegador.

## Rotas atuais

| Rota | Descrição |
| --- | --- |
| `/Home` | Página inicial |
| `/telaAdmin` | Área administrativa |

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run watch` | Compila continuamente no modo de desenvolvimento |
| `npm test` | Executa os testes com Vitest |

## Estrutura principal

```text
src/
├── app/
│   ├── components/       # Componentes reutilizáveis
│   ├── feats/            # Funcionalidades e páginas
│   │   ├── posts/        # Cadastro e integração de produtos
│   │   └── tela-admin/   # Área administrativa
│   ├── home/             # Página inicial
│   ├── app.config.ts     # Configurações da aplicação
│   └── app.routes.ts     # Definição das rotas
├── index.html
├── main.ts
└── styles.css            # Estilos globais
```

## Próximas etapas

- Montar a home completa conforme o protótipo;
- Criar catálogo e cards reutilizáveis de produtos;
- Implementar as páginas de login e cadastro;
- Implementar favoritos e carrinho;
- Conectar pesquisa, categorias e filtros;
- Adicionar as operações de consulta, edição e exclusão de produtos;
- Transformar o painel administrativo em rotas funcionais;
- Adaptar as telas para diferentes tamanhos de dispositivo;
- Ampliar a cobertura de testes.

## Autor

Desenvolvido por [Henrique (hericota)](https://github.com/hericota).
