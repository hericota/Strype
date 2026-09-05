<div align="center">

# Stryde

**Interface de e-commerce esportivo desenvolvida com Angular.**

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![npm](https://img.shields.io/badge/npm-11-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)

</div>

## Sobre o projeto

O **Stryde** é o front-end de uma loja virtual voltada a roupas, calçados, acessórios e equipamentos esportivos. O projeto está sendo construído em Angular e conta com uma interface responsiva, navegação entre páginas e uma área administrativa para o gerenciamento de produtos.

> O projeto está em desenvolvimento. Alguns links e recursos exibidos na interface ainda são demonstrativos.

## Funcionalidades

- Página inicial com cabeçalho e navegação por marcas;
- Campo de pesquisa e atalhos para usuário e carrinho;
- Roteamento com Angular Router;
- Área administrativa;
- Formulário para cadastro de produtos;
- Validação dos campos com Signal Forms;
- Integração HTTP para envio de produtos a uma API;
- Formatação configurada para o padrão brasileiro (`pt-BR`).

## Tecnologias

- [Angular 22](https://angular.dev/)
- [TypeScript 6](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)
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

5. Acesse no navegador:

```text
http://localhost:4200
```

## Rotas

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

## Próximos passos

- Finalizar a listagem e exibição dos produtos;
- Implementar pesquisa e filtros;
- Adicionar autenticação de usuários;
- Implementar o carrinho de compras;
- Concluir as ações de cadastro, atualização e exclusão na área administrativa;
- Ampliar a cobertura de testes.

## Autor

Desenvolvido por [Henrique (hericota)](https://github.com/hericota).
