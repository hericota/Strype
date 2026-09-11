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

O desenvolvimento atual reúne catálogo e detalhes de produtos, carrinho com estado compartilhado, favoritos baseados em IDs salvos no navegador e telas de acesso. Na administração, já existem uma listagem para escolher o produto pelo ícone de edição e uma tela de edição com prévia. O cabeçalho possui menu para celulares, e a home já inclui o rodapé.

> **Em desenvolvimento:** este repositório contém o front-end. Algumas funcionalidades usam dados demonstrativos ou ainda precisam de integração. O protótipo no Figma representa o escopo planejado da plataforma.

## Estado atual das funcionalidades

| Área | O que já existe no código | O que falta concluir |
| --- | --- | --- |
| Página inicial | Home com cabeçalho e rodapé | Banners e vitrines de produtos |
| Cabeçalho | Menu sanduíche e atalhos para login e carrinho | Pesquisa e links de marcas e categorias |
| Rodapé | Seções de redes sociais, sobre nós, entregas, ajuda e logos | Destinos reais para os links |
| Login e cadastro | Formulários com validações locais e navegação após envio | Autenticação, criação de conta na API e sessão |
| Catálogo | Rota própria, consulta à API e cards com imagem, nome, preço e link para detalhes | Filtros e tratamento de carregamento e erros |
| Detalhes do produto | Consulta por ID, escolha visual de tamanho, controle de quantidade e adição ao carrinho | Validar quantidades, incluir tamanho no item e substituir avaliações demonstrativas |
| Carrinho | Estado compartilhado em serviço, listagem, aumento e redução de quantidade, remoção e estado vazio | Persistência, cálculo de totais e descontos e finalização da compra |
| Favoritos | Consulta à API, leitura dos IDs salvos no navegador, seleção, total e remoção persistida dos IDs | Ação de favoritar no catálogo e integração com carrinho e compra |
| Cadastro de produtos | Formulário com Signal Forms e chamada POST | Validar o fluxo completo com a API e concluir a configuração HTTP |
| Administração | Painel com ações de cadastro, edição e exclusão | Conectar os botões de cadastro e edição e proteger o acesso |
| Gerenciamento | Listagem da API com ID, imagem, nome, preço e lápis que abre a edição | Implementar a pesquisa por nome ou ID |
| Edição | Consulta por ID, campos com dados do produto e painel de prévia | Capturar e validar alterações e implementar o envio à API |
| Exclusão | Tela por ID e método DELETE inicial no serviço | Corrigir a URL do método e conectar a tela ao serviço |

### Comportamento atual

- **Acesso:** login e cadastro validam os campos localmente. O login navega para `/Home`, e o cadastro navega para `/login`; ainda não há autenticação no servidor. Os botões Google e Apple são visuais.
- **Carrinho:** os itens ficam em memória no `CarrinhoService` e são perdidos ao recarregar a página. O resumo ainda exibe textos de exemplo no lugar de totais e descontos, e o botão de compra não finaliza pedidos.
- **Favoritos:** a tela cruza os produtos da API com IDs da chave `strype-favoritos` no `localStorage`. A remoção atualiza esses IDs. O código ainda não oferece uma ação para adicionar novos favoritos; comprar apenas registra os selecionados no console.
- **Edição:** o lápis de gerenciamento abre `/atualizar/:id`. A tela consulta o produto, mas o método `atualizar()` ainda está vazio. O campo de categoria atualmente reutiliza a descrição; a interface `Produto` ainda não possui uma categoria própria.

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
| --- | --- |
| Angular 22.1 | Componentes standalone e estrutura da aplicação |
| TypeScript 6.0 | Tipagem e lógica dos componentes |
| Signals e `computed` | Estado reativo, carrinho e cálculos dos favoritos |
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

A base da API está definida diretamente no serviço de produtos e nos componentes de detalhes, edição e favoritos:

```text
http://localhost:8080/produtos
```

| Método | Endpoint | Uso previsto pelo código atual |
| --- | --- | --- |
| `GET` | `/produtos` | Retornar um array de produtos |
| `POST` | `/produtos` | Cadastrar um produto |
| `GET` | `/produtos/:id` | Consultar um produto para detalhes ou edição |

O método DELETE está iniciado no serviço, mas ainda concatena o ID sem a barra separadora e não está ligado à tela de exclusão. O envio de atualização por PUT ou PATCH ainda não foi implementado.

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
- Ajustar o destino da rota curinga conforme a observação abaixo.

## Rotas declaradas

| Rota | Tela |
| --- | --- |
| `/` | Redirecionamento para `/Home` |
| `/Home` | Página inicial |
| `/telaAdmin` | Painel administrativo |
| `/CadastroProdutos` | Formulário de cadastro de produtos |
| `/produtos` | Catálogo de produtos |
| `/gerenciar` | Listagem administrativa com acesso à edição |
| `/atualizar/:id` | Tela de edição de um produto |
| `/carrinho` | Carrinho de compras |
| `/favoritos` | Produtos da API filtrados pelos IDs favoritos salvos |
| `/deletar` | Interface de exclusão de produtos |
| `/cadastro` | Cadastro de usuário |
| `/login` | Login |
| `/produto/:id` | Detalhes de um produto |

> A rota curinga `**` já está no final de `app.routes.ts`. Ainda é necessário trocar seu destino de `home` para `Home`, respeitando a capitalização da rota declarada.

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
| `src/app/components/` | Cabeçalho e rodapé |
| `src/app/home/` | Página inicial |
| `src/app/favoritos/` | Consulta de produtos, IDs favoritos no navegador e seleção |
| `src/app/feats/login-componente/` | Tela e formulário de login |
| `src/app/feats/cadastro-componente/` | Tela e formulário de cadastro de usuário |
| `src/app/feats/posts/` | Serviço, cadastro, listagem e interface de produtos |
| `src/app/feats/detalhe-produto/` | Consulta e exibição de produto por ID |
| `src/app/feats/tela-admin/` | Painel administrativo |
| `src/app/feats/deletar/` | Interface de exclusão |
| `src/app/feats/gerenciar-produtos/` | Listagem administrativa com acesso à edição |
| `src/app/feats/atualizar-produto/` | Consulta e formulário de edição com prévia |
| `src/app/feats/carrinho-componente/` | Página, cards e serviço de estado do carrinho |
| `src/app/app.routes.ts` | Rotas da aplicação |
| `src/app/app.config.ts` | Configuração e provedores |
| `src/styles.css` | Estilos globais |

## Próximas etapas

- Concluir os ajustes de roteamento e integração HTTP.
- Integrar o catálogo e os detalhes dos produtos ao fluxo da loja.
- Conectar login e cadastro à API, com sessão e controle de acesso à administração.
- Concluir o envio das alterações de produto e conectar a exclusão à API.
- Adicionar a ação de favoritar produtos e conectar favoritos ao carrinho.
- Persistir o carrinho, validar quantidades e implementar totais, descontos e finalização da compra.
- Conectar pesquisa, categorias e filtros.
- Completar banners, vitrines e catálogos previstos no Figma, incluindo Air Force, Dunk, Air Jordan, Air Max e roupas.
- Desenvolver as integrações de acesso com Google e Apple previstas no protótipo.
- Conectar os links do rodapé e implementar newsletter e informações de entrega e pagamento.
- Revisar responsividade, acessibilidade, estados de erro e testes dos fluxos principais.

## Autores

Desenvolvido por Smap
