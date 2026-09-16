<div align="center">

# Strype

**Loja virtual de moda e produtos esportivos desenvolvida com Angular.**

Projeto acadêmico concluído: página inicial com vídeos, catálogo, pesquisa, carrinho e gerenciamento de produtos, com identidade visual em preto, branco e laranja.

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

[Planejamento no Figma](https://www.figma.com/design/vwQVA1HrobIvbGSWvCdff7/Projeto-aula-Henrique?node-id=0-1) · [Código-fonte](https://github.com/hericota/Strype)

</div>

## Sobre o projeto

O Strype é um projeto acadêmico de e-commerce voltado a tênis, roupas, acessórios e equipamentos esportivos. A versão final reúne uma página inicial com conteúdo visual de Nike, Adidas e The North Face, navegação entre páginas, formulários, estado reativo e comunicação com uma API de produtos.

A aplicação utiliza componentes standalone, Signals e serviços compartilhados. O fluxo administrativo permite cadastrar, consultar, editar e excluir produtos. A experiência de compra inclui pesquisa, detalhes, carrinho e uma tela de favoritos.

**Status: concluído no escopo acadêmico.** Este repositório contém o front-end; a API de produtos deve ser executada separadamente. A entrega demonstra os fluxos da loja e as operações de cadastro, consulta, edição e exclusão de produtos. Login, cadastro de usuários e finalização da compra possuem comportamento demonstrativo, descrito na seção de escopo.

## Funcionalidades

| Área | Implementação atual |
| --- | --- |
| Página inicial | Hero com vídeo, banner promocional, vitrines Nike e Adidas, seção The North Face e rodapé |
| Navegação | Cabeçalho com pesquisa, atalhos de marcas, acesso à administração, login e carrinho |
| Catálogo | Produtos da API em três cards por linha no desktop, dois no tablet e um no celular, com imagens limitadas e acesso aos detalhes |
| Pesquisa | Busca parcial por nome no catálogo, atalhos de marcas via URL e página própria de pesquisa por nome ou descrição |
| Detalhes | Consulta por ID, seleção visual de tamanho, quantidade e adição ao carrinho |
| Cadastro de produtos | Formulário com Signal Forms e envio de dados por POST |
| Gerenciamento | Listagem administrativa com busca por nome ou ID, edição e exclusão com confirmação |
| Edição | Carregamento dos dados, validação, prévia reativa e envio por PUT |
| Exclusão | DELETE pelo ID, bloqueio de cliques repetidos e atualização da lista após sucesso |
| Carrinho | Alteração de quantidades, remoção de itens, subtotal, descontos e total reativos |
| Favoritos | Consulta dos produtos associados aos IDs salvos no navegador, seleção e remoção dos favoritos |
| Login e cadastro | Formulários com validações locais e navegação após o envio |

### Gerenciamento de produtos

O painel em `/telaAdmin` oferece acesso ao cadastro e ao gerenciamento. Em `/gerenciar`, é possível pesquisar produtos, abrir a edição pelo lápis e excluir pela lixeira.

Na edição, o formulário carrega nome, descrição, preço e URL da imagem. Os campos são obrigatórios, o preço deve ser um número maior ou igual a zero e a prévia acompanha as alterações. Após salvar, a aplicação retorna ao gerenciamento; em caso de erro, preserva os valores digitados.

A exclusão solicita confirmação com nome e ID do produto. A lista só remove o item depois de uma resposta bem-sucedida da API. As telas de gerenciamento e edição apresentam estados de carregamento e erro, com opção de tentar novamente nas consultas.

A rota antiga `/deletar` redireciona para `/gerenciar`. O componente de exclusão separado e o serviço `Deletando` foram removidos; as operações administrativas usam `ConsumoApi`.

### Carrinho e favoritos

O `CarrinhoService` inicia vazio e mantém em memória os produtos adicionados pela tela de detalhes. O resumo calcula o subtotal, um desconto de 10% identificado como Pix e um desconto adicional de R$ 100 quando o subtotal atinge R$ 900. Esses cálculos são locais. Ao finalizar a compra, a aplicação exibe a confirmação e limpa o carrinho, simulando o encerramento do fluxo sem pagamento ou criação de pedido no servidor.

Os favoritos usam a chave `strype-favoritos` do `localStorage` para guardar IDs. A tela cruza esses IDs com os produtos da API e permite selecionar e remover favoritos. Nesta entrega, a tela trabalha com IDs já armazenados: o catálogo não possui ação de adicionar favoritos, e a compra a partir dessa tela apenas registra os itens selecionados no console.

## Pesquisa e navegação por marcas

A pesquisa do cabeçalho é enviada ao pressionar **Enter**. O catálogo lê o parâmetro `q` da URL e filtra os nomes dos produtos por correspondência parcial, sem diferenciar maiúsculas e minúsculas.

| Endereço | Resultado |
| --- | --- |
| `/produtos` | Todos os produtos retornados pela API |
| `/produtos?q=adidas` | Produtos com “adidas” no nome |
| `/produtos?q=nike` | Produtos com “nike” no nome |
| `/produtos?q=north` | Produtos com “north” no nome |

Os atalhos de marcas do cabeçalho e do hero utilizam esse mesmo mecanismo. O filtro é textual, aplicado no front-end; não depende de um campo específico de marca na API.

## Escopo da entrega

- **Produtos:** cadastro, consulta, edição e exclusão enviam requisições à API externa.
- **Contas:** login e cadastro validam os campos e navegam para a home, sem criar usuários ou autenticar no servidor. Os botões de Google e Apple são elementos visuais.
- **Administração:** as rotas administrativas são acessíveis diretamente, sem autenticação ou controle de permissões.
- **Carrinho:** o estado dura enquanto a aplicação está aberta e é perdido ao recarregar. A seleção visual de tamanho não é incluída no item do carrinho.
- **Compra:** confirmação demonstrativa e cálculos locais, sem processamento de pagamentos.
- **Conteúdo visual:** promoções, avaliações e parte dos links de vitrines e rodapé são demonstrativos.

## Tecnologias

| Tecnologia | Aplicação |
| --- | --- |
| Angular 22.1 e TypeScript 6.0 | Componentes, tipagem e organização da aplicação |
| Signals, `computed` e `effect` | Estado reativo, cálculos e sincronização de dados |
| Signal Forms e FormsModule | Formulários e vinculação dos campos |
| Angular Router | Rotas, parâmetros de URL e navegação |
| HttpClient e `httpResource` | Requisições e carregamento de produtos |
| RxJS 7.8 | Tratamento das operações assíncronas |
| HTML e CSS | Interface e estilos responsivos |
| Vitest 4 e jsdom | Testes de serviços e componentes |
| Prettier | Formatação do código |

A localização configurada é `pt-BR`. O nome público é **Strype**, mas o identificador interno no Angular e no `package.json` ainda é `stryde`.

## Como executar

### Requisitos

- Git instalado.
- Node.js compatível com o `package-lock.json`: `^22.22.3`, `^24.15.0` ou `>=26.0.0`.
- npm instalado; o gerenciador declarado no projeto é `npm@11.17.0`.
- Uma API compatível para utilizar os recursos de produtos.

### Instalação e desenvolvimento

```bash
git clone https://github.com/hericota/Strype.git
cd Strype
npm ci
npm start
```

Abra [http://localhost:4200](http://localhost:4200). A entrada da aplicação redireciona para `/Home`, com vídeos, vitrines e seções de marcas. Para consultar os produtos, acesse [http://localhost:4200/produtos](http://localhost:4200/produtos); para administrá-los, use [http://localhost:4200/telaAdmin](http://localhost:4200/telaAdmin).

O comando `npm start` inicia apenas o front-end. Inicie o back-end separadamente e permita o acesso da origem `http://localhost:4200` na configuração de CORS da API.

### Compilação

```bash
npm run build
```

Os arquivos de produção são gerados em `dist/stryde/`. Em uma hospedagem estática, configure o retorno de `index.html` para as rotas da aplicação, permitindo abrir diretamente endereços como `/gerenciar`.

## Integração com a API

O front-end utiliza a seguinte URL base:

```text
http://localhost:8080/produtos
```

As chamadas administrativas estão no [ConsumoApi](src/app/feats/posts/consumo-api.ts). Os componentes de detalhes e favoritos também possuem URLs próprias no código; ao trocar o endereço da API, revise esses pontos.

| Método | Endpoint | Dados enviados | Resposta esperada pelo front-end |
| --- | --- | --- | --- |
| `GET` | `/produtos` | Sem corpo | Array de produtos |
| `GET` | `/produtos/:id` | Sem corpo | Produto correspondente ao ID |
| `POST` | `/produtos` | Nome, descrição, preço e URL da imagem | Produto cadastrado |
| `PUT` | `/produtos/:id` | ID e campos atualizados do produto | Produto atualizado ou sucesso sem corpo, como 204 |
| `DELETE` | `/produtos/:id` | Sem corpo | Resposta de sucesso, como 204 |

A API externa deve atender a esse contrato. Os testes automatizados de HTTP usam respostas simuladas.

### Modelo de produto

A interface está em [produto.ts](src/app/feats/posts/produto.ts):

```ts
export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  preco: number | null;
  urlImagem: string;
}
```

Exemplo de corpo para cadastro:

```json
{
  "nome": "Tênis esportivo",
  "descricao": "Tênis casual com acabamento em tecido",
  "preco": 199.90,
  "urlImagem": "https://exemplo.com/tenis.jpg"
}
```

Os produtos retornados pela API devem incluir um ID único para os links de detalhes, edição e exclusão. O preço deve ser enviado como número. As imagens são exibidas por URL; não há upload de arquivos. Categoria não faz parte do modelo atual.

## Rotas

As rotas estão definidas em [app.routes.ts](src/app/app.routes.ts). Respeite as letras maiúsculas dos caminhos existentes.

| Rota | Destino |
| --- | --- |
| `/` | Redirecionamento para `/Home` |
| `/Home` | Página inicial com vídeos, promoções e vitrines |
| `/produtos` | Catálogo; aceita `?q=termo` para filtrar por nome |
| `/produto/:id` | Detalhes do produto |
| `/pesquisa` | Pesquisa por nome ou descrição |
| `/carrinho` | Carrinho e resumo dos valores |
| `/favoritos` | Produtos associados aos favoritos salvos |
| `/login` | Formulário de login |
| `/cadastro` | Formulário de cadastro de usuário |
| `/telaAdmin` | Painel administrativo |
| `/CadastroProdutos` | Cadastro de produtos |
| `/gerenciar` | Pesquisa, edição e exclusão administrativas |
| `/atualizar/:id` | Edição do produto selecionado |
| `/deletar` | Redirecionamento para `/gerenciar` |
| Demais caminhos | Redirecionamento para `/Home` |

## Testes

Os arquivos `.spec.ts` verificam comportamentos dos serviços e componentes. O projeto utiliza Vitest e jsdom, com `HttpTestingController` para simular respostas da API nos testes de gerenciamento.

Para executar os testes uma vez:

```bash
npm test -- --watch=false
```

Para executar apenas os testes do serviço de produtos, gerenciamento e edição:

```bash
npm test -- --watch=false --include="src/app/feats/posts/consumo-api.spec.ts" --include="src/app/feats/gerenciar-produtos/gerenciar-produtos.spec.ts" --include="src/app/feats/atualizar-produto/atualizar-produto.spec.ts"
```

Os testes HTTP simulam respostas da API e podem ser executados sem o back-end. Para verificar a integração completa, utilize também a aplicação com uma API compatível em execução.

## Scripts

| Comando | Finalidade |
| --- | --- |
| `npm start` | Iniciar o servidor de desenvolvimento |
| `npm run build` | Gerar a versão de produção |
| `npm run watch` | Recompilar ao detectar alterações, em configuração de desenvolvimento |
| `npm test` | Executar os testes com acompanhamento de alterações |
| `npm test -- --watch=false` | Executar os testes uma vez e encerrar |

## Organização do código

| Caminho | Responsabilidade |
| --- | --- |
| `public/assets/` | Imagens, logos e ícones |
| `src/app/components/` | Cabeçalho, hero com vídeo e rodapé |
| `src/app/home/` | Página inicial |
| `src/app/feats/posts/` | Serviço `ConsumoApi`, modelo `Produto`, cadastro e catálogo |
| `src/app/feats/gerenciar-produtos/` | Listagem administrativa, pesquisa e exclusão |
| `src/app/feats/atualizar-produto/` | Formulário de edição e prévia |
| `src/app/feats/tela-admin/` | Atalhos administrativos |
| `src/app/feats/detalhe-produto/` | Detalhes e adição ao carrinho |
| `src/app/feats/pesquisa/` | Página de pesquisa |
| `src/app/feats/carrinho-componente/` | Interface e serviço do carrinho |
| `src/app/favoritos/` | Consulta e gestão dos favoritos salvos |
| `src/app/feats/login-componente/` | Tela e formulário de login |
| `src/app/feats/cadastro-componente/` | Tela e formulário de cadastro de usuário |
| `src/app/app.routes.ts` | Rotas da aplicação |
| `src/app/app.config.ts` | Provedores HTTP, navegação e localização |
| `src/styles.css` | Estilos globais |

## Autoria

Desenvolvido por **Smap**.
