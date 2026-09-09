<div align="center">

# Strype

**E-commerce de moda e produtos esportivos desenvolvido com Angular.**

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![npm](https://img.shields.io/badge/npm-11-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)

[Planejamento no Figma](https://www.figma.com/design/vwQVA1HrobIvbGSWvCdff7/Projeto-aula-Henrique?node-id=0-1)

</div>

## Sobre o projeto

O **Strype** é um projeto acadêmico de loja virtual voltada a tênis, roupas, acessórios e equipamentos esportivos. A interface segue o planejamento criado no Figma, com identidade visual em preto, branco e laranja.

O desenvolvimento atual envolve a construção das telas de acesso, a interação com favoritos, a adaptação do cabeçalho para celulares e a integração de produtos com uma API. A área administrativa também está sendo estruturada para cadastrar, editar e excluir produtos.

> **Em desenvolvimento:** este repositório contém o front-end. Algumas funcionalidades usam dados demonstrativos ou ainda precisam de integração. O protótipo no Figma representa o escopo planejado da plataforma.

## Estado atual das funcionalidades

| Área | O que já existe no código | O que falta concluir |
| --- | --- | --- |
| Página inicial | Home com cabeçalho, marca, pesquisa e atalhos visuais | Banners, vitrines e conexão dos atalhos com as páginas |
| Navegação mobile | Media queries e menu sanduíche com abertura e fechamento | Revisão da navegação e da responsividade nas demais telas |
| Login | Formulário com validação de e-mail, campos obrigatórios e senha mínima de 8 caracteres | Autenticação pela API e gerenciamento de sessão |
| Cadastro de usuário | Campos de nome, sobrenome, telefone, CPF, e-mail e senha, com validações de formulário | Persistência dos dados e integração com o back-end |
| Favoritos | Dados demonstrativos, seleção individual ou de todos os itens, exclusão dos selecionados e total pelo preço Pix | Persistência, integração com produtos reais e fluxo de compra |
| Cadastro de produtos | Formulário com Signal Forms e chamada HTTP de cadastro | Concluir a configuração da integração e validar o fluxo com a API |
| Listagem de produtos | Consulta com `httpResource` e componente de cards com imagem, nome e preço | Integrar a listagem à navegação e concluir o catálogo |
| Detalhes do produto | Consulta por ID e template com imagem, nome, descrição e preço | Ajustar a rota e tratar carregamento, erros e produto não encontrado |
| Administração | Painel com ações de cadastro, edição e exclusão | Conectar todas as ações e implementar edição |
| Exclusão de produtos | Tela com campo para ID e botão de exclusão | Implementar a chamada de exclusão à API |

Os formulários de login e cadastro de usuário validam os dados localmente, mas ainda não autenticam nem criam contas no servidor. Em favoritos, a ação de comprar apenas registra os itens selecionados no console.

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
| --- | --- |
| Angular 22.1 | Componentes standalone e estrutura da aplicação |
| TypeScript 6.0 | Tipagem e lógica dos componentes |
| Signals e `computed` | Estado reativo e cálculos dos favoritos |
| Signal Forms | Formulários e validações |
| Angular Router | Definição de rotas e navegação |
| HttpClient e `httpResource` | Código de comunicação com a API de produtos |
| RxJS 7.8 | Tratamento de operações assíncronas |
| HTML e CSS | Estrutura, identidade visual e responsividade |
| Vitest 4 e jsdom | Ferramentas configuradas para testes |
| Prettier | Formatação de código |

A aplicação utiliza a localização `pt-BR`. O nome interno nas configurações Angular e npm ainda é `stryde`.

## Como executar

Tenha Git, Node.js compatível com as dependências do projeto e npm instalados. O gerenciador declarado no `package.json` é `npm@11.17.0`.

```bash
git clone https://github.com/hericota/Strype.git
cd Strype
npm ci
npm start
```

Acesse [http://localhost:4200](http://localhost:4200). A rota inicial redireciona para `/Home`.

Para os recursos de produtos, também é necessário iniciar uma API compatível separadamente. O back-end não está incluído neste repositório.

### Integração com a API

O endereço está definido diretamente em `src/app/feats/posts/consumo-api.ts` e `src/app/feats/detalhe-produto/detalhe-produto.ts`:

```text
http://localhost:8080/produtos
```

| Método | Endpoint | Uso previsto pelo código atual |
| --- | --- | --- |
| `GET` | `/produtos` | Retornar um array de produtos |
| `POST` | `/produtos` | Cadastrar um produto |
| `GET` | `/produtos/:id` | Retornar um produto pelo ID |

Exemplo de corpo para cadastro:

```json
{
  "nome": "Tênis esportivo",
  "descricao": "Descrição do produto",
  "preco": 199.90,
  "urlImagem": "https://exemplo.com/imagem.png"
}
```

Para os links de detalhes, os produtos retornados na listagem devem incluir `id`. As imagens são exibidas a partir de `urlImagem`; não há upload de arquivos implementado nesse formulário.

### Ajustes de integração pendentes

- Registrar o provedor HTTP na configuração da aplicação; o `app.config.ts` atual ainda não inclui `provideHttpClient()`.
- Permitir na API as requisições da origem do front-end, quando necessário.
- Revisar a ordem das rotas conforme a observação abaixo.

## Rotas declaradas

| Rota | Tela |
| --- | --- |
| `/` | Redirecionamento para `/Home` |
| `/Home` | Página inicial |
| `/telaAdmin` | Painel administrativo |
| `/produtos` | Formulário de cadastro de produtos |
| `/favoritos` | Lista demonstrativa de favoritos |
| `/deletar` | Interface de exclusão de produtos |
| `/cadastro` | Cadastro de usuário |
| `/login` | Login |
| `/produto/:id` | Detalhes de um produto |

> Em `app.routes.ts`, a rota curinga `**` está antes de `cadastro`, `login` e `produto/:id`, interceptando esses caminhos. Ela também redireciona para `home`, enquanto a rota declarada é `Home`. É necessário mover a curinga para o final e ajustar o destino para liberar essa navegação.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a compilação de produção |
| `npm run watch` | Compila continuamente em modo de desenvolvimento |
| `npm test` | Executa os testes configurados com Vitest |

## Organização do projeto

| Caminho | Responsabilidade |
| --- | --- |
| `public/assets/` | Logos, ícones e imagens |
| `src/app/components/` | Cabeçalho e estrutura inicial do rodapé |
| `src/app/home/` | Página inicial |
| `src/app/favoritos/` | Interface e estado local dos favoritos |
| `src/app/feats/login-componente/` | Tela e formulário de login |
| `src/app/feats/cadastro-componente/` | Tela e formulário de cadastro de usuário |
| `src/app/feats/posts/` | Serviço, cadastro, listagem e interface de produtos |
| `src/app/feats/detalhe-produto/` | Consulta e exibição de produto por ID |
| `src/app/feats/tela-admin/` | Painel administrativo |
| `src/app/feats/deletar/` | Interface de exclusão |
| `src/app/app.routes.ts` | Rotas da aplicação |
| `src/app/app.config.ts` | Configuração e provedores |
| `src/styles.css` | Estilos globais |

## Próximas etapas

- Concluir os ajustes de roteamento e integração HTTP.
- Integrar o catálogo e os detalhes dos produtos ao fluxo da loja.
- Conectar login e cadastro à API, com sessão e controle de acesso à administração.
- Implementar edição e exclusão de produtos.
- Persistir favoritos e desenvolver o carrinho com quantidades, descontos e total.
- Conectar pesquisa, categorias e filtros.
- Completar banners, vitrines e catálogos previstos no Figma, incluindo Air Force, Dunk, Air Jordan, Air Max e roupas.
- Desenvolver as integrações de acesso com Google e Apple previstas no protótipo.
- Completar rodapé, newsletter e informações de entrega e pagamento.
- Revisar responsividade, acessibilidade, estados de erro e testes dos fluxos principais.

## Autor

Desenvolvido por [Henrique (hericota)](https://github.com/hericota).
