# Publicação do Strype

## Estado atual

As cópias locais foram preparadas em `Strype` e `api-produtos-producao`. Nenhuma alteração foi enviada ao GitHub. O endereço de push da API original foi bloqueado na cópia local (`DISABLED`). Os dois clones estavam limpos antes das alterações.

A publicação ainda depende de login no Render e no Aiven. Não há URL pública da API nem banco online criado nesta etapa. Não foi contratado serviço pago.

## Hospedagem sem cartão

- Angular: Cloudflare Pages. A conexão Cloudflare foi confirmada.
- API Java: Render, serviço Web com Docker, plano Free. Pode adormecer após 15 minutos sem tráfego e demorar para responder à primeira chamada. É uma hospedagem para demonstração, sem garantia de disponibilidade de produção.
- MySQL: Aiven, plano Free, sem cartão. Tem limites de recursos e pode ser desligado por inatividade.

Referências: https://render.com/docs/free e https://aiven.io/docs/products/mysql/concepts/mysql-free-tier

## API

Configurações de produção estão em `application-prod.properties`; ativar com `SPRING_PROFILES_ACTIVE=prod`.

| Variável | Valor |
| --- | --- |
| `DB_URL` | URL JDBC do MySQL Aiven, com TLS e verificação do certificado |
| `DB_USERNAME` | Usuário do banco |
| `DB_PASSWORD` | Senha, somente nas configurações secretas do provedor |
| `CORS_ALLOWED_ORIGINS` | Origem HTTPS exata do frontend, sem barra final; múltiplas origens separadas por vírgula |
| `PORT` | Porta fornecida pela hospedagem; padrão 8080 |
| `DB_POOL_SIZE` | Padrão 5 |

Criar um banco vazio exclusivo para este projeto. O Flyway cria a tabela `produto`, e o Hibernate valida o esquema. Não executar a migração automaticamente em banco já utilizado: antes é preciso inspecionar o esquema, fazer backup e planejar a adoção do Flyway. Nenhum `DROP`, `create-drop` ou baseline automático foi adicionado.

O modelo existente usa `double` para preço; isso foi preservado para limitar o escopo. A migração corresponde a esse modelo. O SQL antigo em `docs/db/schema.sql` é apenas legado e não deve ser executado junto com a migração.

No Aiven, baixar a CA do serviço e criar um truststore PKCS12 para o Connector/J. Armazená-lo como arquivo secreto no Render. Exemplo de URL, com valores a preencher:

```text
jdbc:mysql://HOST:PORT/defaultdb?sslMode=VERIFY_IDENTITY&trustCertificateKeyStoreUrl=file:/etc/secrets/aiven-truststore.p12&trustCertificateKeyStoreType=PKCS12&trustCertificateKeyStorePassword=TRUSTSTORE_PASSWORD
```

Validar o certificado e o hostname no serviço real antes de publicar; não desativar TLS para a conexão remota.

Publicar a cópia da API em um novo repositório controlado pelo usuário. Não apontar o deploy para `HenriqueDelegrego/api-produtos`, pois ele não contém estas alterações. O `Dockerfile` usa Java 21; o `render.yaml` declara o plano gratuito. Endpoint de saúde: `/actuator/health`.

`compose.production.yaml` é uma alternativa para servidor próprio com Docker. Mantém MySQL em volume e API na interface local; requer proxy HTTPS para acesso público. Nunca executar `docker compose down -v` em banco com dados que precisam ser preservados.

## Angular

As chamadas de serviço, detalhes e favoritos usam `environment.apiUrl`. O ambiente de desenvolvimento mantém o endereço local. A configuração de produção deve ser gerada com a URL real:

```powershell
$env:API_URL='https://DOMINIO-REAL-DA-API/produtos'
npm run build:deploy
```

O script exige HTTPS e o caminho `/produtos`. Não colocar senhas no environment: ele é público no navegador. O valor relativo inicial `/api/produtos` é provisório e não constitui uma integração publicada; usar obrigatoriamente `build:deploy` com o endereço real.

No Cloudflare Pages: comando `npm run build:deploy`, diretório `dist/stryde/browser`, variável `API_URL` com o endpoint real. `public/_redirects` permite abrir diretamente as rotas do Angular. Após obter o domínio do frontend, configurar esse domínio em `CORS_ALLOWED_ORIGINS` na API.

## Validação

Verificação local em 16/09/2026: pacote JAR gerado; 3 testes Java passaram sem falhas; verificação de tipos/templates Angular com `ngc --noEmit` passou; `git diff --check` passou nos dois projetos. O build completo e os testes Angular ficaram bloqueados pelo erro `spawn EPERM` do Windows ao iniciar o esbuild. Docker estava instalado, mas seu servidor não estava em execução. O MySQL real e os fluxos no navegador publicado ainda não foram testados.

Os testes da API utilizam Spring MVC e banco H2 em modo MySQL; não substituem o teste no MySQL real. Cobrem cadastro, listagem com descrição, detalhes, edição, exclusão, preço negativo e CORS permitido/bloqueado.

Depois do deploy, executar:

```text
node testar-api.mjs https://API_REAL/produtos https://FRONTEND_REAL
```

O script cria um produto exclusivo e remove apenas esse produto. Depois verificar os mesmos fluxos pela interface do Angular, incluindo recarregar uma rota de detalhes diretamente.

## Limite funcional existente

A aplicação não implementa autenticação/autorização real para administrar produtos. CORS limita requisições de navegadores, mas não protege POST, PUT e DELETE contra outros clientes. O deploy deve usar somente dados demonstrativos até que seja implementada autenticação para administração.
