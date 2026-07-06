# SEO Setup

Este site e estatico: HTML, CSS, imagens, `robots.txt`, `sitemap.xml` e `CNAME`.

## Dados principais

- Dominio final: `https://www.cibeleneuropsicologa.com.br/`
- Sitemap: `https://www.cibeleneuropsicologa.com.br/sitemap.xml`
- Robots: `https://www.cibeleneuropsicologa.com.br/robots.txt`
- WhatsApp: `https://wa.me/5531989484911`
- Instagram: `https://www.instagram.com/cibeleneuropsi/`

## Google Search Console

1. Acesse `https://search.google.com/search-console`.
2. Adicione uma propriedade do tipo **Dominio** para `cibeleneuropsicologa.com.br`.
3. Siga a verificacao por DNS no Registro.br.
4. Depois de verificado, envie o sitemap:
   `https://www.cibeleneuropsicologa.com.br/sitemap.xml`
5. Use a ferramenta **Inspecao de URL** para solicitar indexacao da home e das paginas principais.

## Google Analytics ou Google Tag Manager

Nao ha ID de rastreamento configurado no codigo.

Para Google Analytics 4, inserir o Measurement ID real no `<head>` de todas as paginas, substituindo `G-XXXXXXXXXX`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Para Google Tag Manager, usar somente o ID real `GTM-XXXXXXX`. Nao publicar IDs falsos.

## Atualizar titulos e descriptions

Cada pagina possui no `<head>`:

- `<title>`
- `<meta name="description">`
- canonical
- Open Graph
- Twitter Card
- robots `index, follow`

Ao alterar uma pagina, mantenha o titulo unico e a description natural, com cerca de 140 a 160 caracteres.

## Criar nova pagina de servico

1. Copie uma pagina de servico existente, por exemplo `tdah.html`.
2. Atualize:
   - title;
   - meta description;
   - canonical;
   - Open Graph e Twitter;
   - H1;
   - breadcrumbs;
   - conteudo;
   - FAQ;
   - JSON-LD `Service`, `FAQPage` e `BreadcrumbList`.
3. Adicione link no menu ou em links relacionados.
4. Inclua a URL nova em `sitemap.xml`.

## Criar uma postagem de blog

Ainda nao existe pasta de blog. Se for criada, usar estrutura como:

```text
blog/
  quando-procurar-avaliacao-neuropsicologica.html
```

Cada postagem deve ter um tema especifico, H1 unico, canonical, FAQ quando fizer sentido e links internos para paginas de servico.

## Validar dados estruturados

Use:

- Rich Results Test: `https://search.google.com/test/rich-results`
- Schema Validator: `https://validator.schema.org/`

Valide principalmente:

- ProfessionalService;
- Person;
- WebSite;
- WebPage;
- BreadcrumbList;
- Service;
- FAQPage.

## Testar velocidade

Use PageSpeed Insights:

`https://pagespeed.web.dev/`

Prioridades:

- desempenho mobile;
- tamanho de imagens;
- contraste;
- layout shift;
- acessibilidade;
- links tocaveis.

## Checklist pos-deploy

- [ ] GitHub Pages com dominio customizado configurado.
- [ ] HTTPS ativo e forcado.
- [ ] `https://www.cibeleneuropsicologa.com.br/` abrindo corretamente.
- [ ] `https://cibeleneuropsicologa.com.br/` redirecionando ou resolvendo corretamente.
- [ ] Sitemap acessivel.
- [ ] Robots acessivel.
- [ ] Search Console verificado.
- [ ] Sitemap enviado ao Search Console.
- [ ] Perfil da Empresa no Google com site, telefone, endereco e Instagram atualizados.
