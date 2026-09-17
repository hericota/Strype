<div align="center">

# Strype

**Loja virtual de moda e produtos esportivos desenvolvida com Angular.**

Projeto acadêmico concluído: página inicial com vídeos, catálogo, pesquisa, carrinho e gerenciamento de produtos, com identidade visual em preto, branco e laranja.

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

[Site online](https://strype-frontend.henriquegdall.workers.dev/) · [Planejamento no Figma](https://www.figma.com/design/vwQVA1HrobIvbGSWvCdff7/Projeto-aula-Henrique?node-id=0-1) · [Código-fonte](https://github.com/hericota/Strype)

</div>

## Sobre o projeto

O Strype é um projeto acadêmico de e-commerce voltado a tênis, roupas, acessórios e equipamentos esportivos. A versão final reúne uma página inicial com conteúdo visual de Nike, Adidas e The North Face, navegação entre páginas, formulários, estado reativo e comunicação com uma API de produtos.

A aplicação utiliza componentes standalone, Signals e serviços compartilhados. O fluxo administrativo permite cadastrar, consultar, editar e excluir produtos. A experiência de compra inclui pesquisa, detalhes, carrinho e uma tela de favoritos.

**Status: concluído no escopo acadêmico.** A versão online usa Cloudflare para o front-end, Render para a API e Aiven para o MySQL. A cópia da API e as configurações de publicação estão na branch de deploy. A entrega demonstra os fluxos da loja e as operações de cadastro, consulta, edição e exclusão de produtos. Login, cadastro de usuários e finalização da compra possuem comportamento demonstrativo, descrito na seção de escopo.

## Deploy e acesso online

**[Acessar o Strype](https://strype-frontend.henriquegdall.workers.dev/)**

| Parte | Hospedagem | Endereço ou função |
| --- | --- | --- |
| Front-end Angular | Cloudflare Workers com arquivos estáticos | [Site publicado](https://strype-frontend.henriquegdall.workers.dev/) |
| API Spring Boot | Render, Web Service com Docker no plano Free | [API de produtos](https://strype-ehou.onrender.com/produtos) |
| Banco MySQL | Aiven, plano gratuito | Armazenamento dos produtos acessado pela API |

O navegador carrega a aplicação no Cloudflare e consulta a API no Render por HTTPS. A API se conecta ao MySQL no Aiven usando SSL.

### Onde estão as configurações

A publicação foi preparada na branch [`deploy/producao-2026-09-16`](https://github.com/hericota/Strype/tree/deploy/producao-2026-09-16). A `main` mantém a versão acadêmica com configuração local; os arquivos de implantação citados abaixo estão na branch de deploy.

| Arquivo na branch de deploy | Finalidade |
| --- | --- |
| [backend/ORIGEM.md](https://github.com/hericota/Strype/blob/deploy/producao-2026-09-16/backend/ORIGEM.md) | Crédito e referência da API original |
| [backend/Dockerfile](https://github.com/hericota/Strype/blob/deploy/producao-2026-09-16/backend/Dockerfile) | Compilação Maven e execução com Java 21 |
| [backend/render.yaml](https://github.com/hericota/Strype/blob/deploy/producao-2026-09-16/backend/render.yaml) | Serviço Docker Free e variáveis do Render |
| [application-prod.properties](https://github.com/hericota/Strype/blob/deploy/producao-2026-09-16/backend/src/main/resources/application-prod.properties) | Conexão ao banco e CORS por variáveis |
| [scripts/configure-api.mjs](https://github.com/hericota/Strype/blob/deploy/producao-2026-09-16/scripts/configure-api.mjs) | Grava a URL pública da API antes do build |
| [wrangler.jsonc](https://github.com/hericota/Strype/blob/deploy/producao-2026-09-16/wrangler.jsonc) | Arquivos estáticos e fallback das rotas Angular |

### Como hospedamos a API gratuitamente

1. **Preparamos uma cópia da API.** A base veio de [HenriqueDelegrego/api-produtos](https://github.com/HenriqueDelegrego/api-produtos) e foi colocada em `backend/` na branch de deploy. O repositório original não foi alterado. A origem e o commit utilizado estão registrados em `backend/ORIGEM.md`.
2. **Criamos o MySQL no Aiven.** O banco ficou em um serviço separado, no plano gratuito, para que os dados não dependessem do disco temporário do Render.
3. **Empacotamos a aplicação com Docker.** O Dockerfile compila o JAR com Maven e Java 21 e o executa em uma imagem Java 21 JRE, com o perfil `prod`.
4. **Publicamos no Render.** Usamos um Web Service com runtime Docker, plano Free e os arquivos de `backend/`. A aplicação lê a porta fornecida pelo Render em `PORT` e disponibiliza `/actuator/health` para verificação de saúde.
5. **Configuramos banco e CORS no ambiente.** As credenciais ficam nas variáveis do serviço. A origem do site Cloudflare foi autorizada para que o navegador pudesse consultar a API.
6. **Conectamos o front-end.** A URL HTTPS do Render foi fornecida ao build Angular por `API_URL`, substituindo o endereço local na versão publicada.

O ponto principal foi separar a execução da API, no Render Free, do banco persistente, no Aiven Free. O Aiven oferece MySQL gratuito sem cartão e distingue esse plano dos créditos temporários de avaliação. [Documentação do plano gratuito do Aiven](https://aiven.io/docs/platform/concepts/service-pricing#free-tier).

### Variáveis da API no Render

| Variável | Configuração |
| --- | --- |
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `DB_URL` | URL JDBC do MySQL com SSL |
| `DB_USERNAME` | Usuário fornecido pelo Aiven |
| `DB_PASSWORD` | Senha do banco, armazenada apenas no ambiente |
| `CORS_ALLOWED_ORIGINS` | `https://strype-frontend.henriquegdall.workers.dev` |
| `PORT` | Porta fornecida pelo Render; a aplicação usa `${PORT:8080}` |
| `DB_POOL_SIZE` | Opcional; padrão de 5 conexões |

**Correção que permitiu conectar ao banco:** o driver Java precisa de uma URL iniciada por `jdbc:mysql://`. A URL `mysql://...` não era aceita pelo driver. Usamos o formato abaixo, com os dados do serviço Aiven:

```text
jdbc:mysql://HOST:PORTA/defaultdb?sslMode=REQUIRED
```

O host e a porta devem vir do painel do banco. Usuário e senha são informados em suas próprias variáveis, sem incluí-los no README ou no código do front-end.

### Publicação do front-end no Cloudflare

Na branch de deploy, o script `build:deploy` configura o endereço da API e gera a aplicação de produção.

| Configuração | Valor |
| --- | --- |
| Branch com os arquivos de publicação | `deploy/producao-2026-09-16` |
| Variável de build `API_URL` | `https://strype-ehou.onrender.com/produtos` |
| Comando de build | `npm run build:deploy` |
| Diretório dos arquivos estáticos | `dist/stryde/browser` |
| Tratamento de rotas | `single-page-application` em `wrangler.jsonc` |

O script exige uma URL HTTPS terminada em `/produtos`. Ela é incorporada ao JavaScript durante a compilação; não é uma variável secreta. O fallback de SPA permite abrir rotas como `/produtos` e `/gerenciar` diretamente.

### Limites da hospedagem gratuita

O Render Free suspende a API após 15 minutos sem tráfego e a reativa no próximo acesso, o que pode levar cerca de um minuto. Por isso, o site pode abrir antes de os produtos carregarem. O plano compartilha 750 horas gratuitas por workspace ao mês e possui limites de tráfego e build. O disco local é temporário; neste projeto, os produtos ficam no MySQL externo. [Limites oficiais do Render Free](https://render.com/docs/free).

O Aiven pode desligar serviços gratuitos sem atividade contínua, com aviso prévio. Esses planos atendem à demonstração acadêmica, mas não representam garantia de disponibilidade permanente ou recursos ilimitados. [Condições do Aiven Free](https://aiven.io/docs/platform/concepts/service-pricing#free-tier).


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

Na `main`, a execução local utiliza a seguinte URL base:

```text
http://localhost:8080/produtos
```

Na branch de deploy, o endereço de produção é `https://strype-ehou.onrender.com/produtos`, configurado por `API_URL` no build. As instruções de publicação estão na seção de deploy acima.

As chamadas administrativas da versão local estão no [ConsumoApi](src/app/feats/posts/consumo-api.ts). Os componentes de detalhes e favoritos também possuem URLs próprias no código; ao trocar o endereço da API, revise esses pontos.

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

Front-end desenvolvido por **Smap**.

A API original foi desenvolvida por [HenriqueDelegrego](https://github.com/HenriqueDelegrego), no repositório [api-produtos](https://github.com/HenriqueDelegrego/api-produtos). A cópia utilizada no deploy recebeu adaptações de implantação, sem alteração do repositório original. Consulte o [registro de origem](https://github.com/hericota/Strype/blob/deploy/producao-2026-09-16/backend/ORIGEM.md).
