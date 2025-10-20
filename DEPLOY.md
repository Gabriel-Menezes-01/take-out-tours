# Guia de Deploy - Take Out Tours

## 🚀 Deploy no GitHub Pages

### Pré-requisitos
- Repositório GitHub criado: `Gabriel-Menezes-01/take-out-tours`
- Git configurado localmente
- Node.js instalado

### Passos para Deploy

#### 1. Inicializar Git (se ainda não estiver)
```bash
git init
git add .
git commit -m "Initial commit"
```

#### 2. Conectar ao repositório remoto
```bash
git remote add origin https://github.com/Gabriel-Menezes-01/take-out-tours.git
git branch -M main
git push -u origin main
```

#### 3. Deploy automático
```bash
npm run deploy
```

Este comando irá:
- Executar `npm run build` automaticamente (via predeploy)
- Criar/atualizar o branch `gh-pages` com o conteúdo da pasta `dist`
- Fazer push para o GitHub

**IMPORTANTE:** Se for o primeiro deploy, pode levar 5-10 minutos para o GitHub Pages processar e publicar.

#### 4. Configurar GitHub Pages
1. Acesse: https://github.com/Gabriel-Menezes-01/take-out-tours/settings/pages
2. Em "Source", selecione:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Clique em "Save"

#### 5. Aguarde o deploy
- O GitHub levará alguns minutos para processar
- O site estará disponível em: https://Gabriel-Menezes-01.github.io/take-out-tours/

---

## 🔧 Configurações Importantes

### vite.config.js
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/take-out-tours/', // Nome do repositório
})
```

### package.json
```json
{
  "homepage": "https://Gabriel-Menezes-01.github.io/take-out-tours",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

⚠️ **ATENÇÃO:** Verifique que está usando `.github.io` e NÃO `.github.com`

### React Router Basename
O router está configurado com basename automático em `src/main.jsx`:
```javascript
const router = createBrowserRouter([...], {
  basename: BASE_PATH // '/take-out-tours'
})
```

---

## 📝 Atualizações Futuras

Para atualizar o site após fazer mudanças:

```bash
git add .
git commit -m "Descrição das mudanças"
git push origin main
npm run deploy
```

---

## 🐛 Troubleshooting

### Erro: "404 Não encontrado" ou "Erro inesperado de aplicação"
**Causas comuns:**
1. ❌ URL errada no `package.json` (`.github.com` em vez de `.github.io`)
   - ✅ Corrija para: `https://Gabriel-Menezes-01.github.io/take-out-tours`
2. ❌ GitHub Pages não configurado para o branch `gh-pages`
   - ✅ Vá em Settings → Pages → Source → Selecione `gh-pages` branch
3. ❌ Deploy ainda não processado
   - ✅ Aguarde 5-10 minutos após o primeiro `npm run deploy`
4. ❌ Nome do repositório diferente do configurado
   - ✅ Verifique se o nome é exatamente `take-out-tours`

**Solução passo a passo:**
```bash
# 1. Verifique o package.json (deve ter .github.io)
# 2. Faça rebuild
npm run build

# 3. Deploy novamente
npm run deploy

# 4. Aguarde alguns minutos
# 5. Acesse: https://Gabriel-Menezes-01.github.io/take-out-tours/
```

### Erro: "Página em branco"
- Verifique se o `base` no `vite.config.js` corresponde ao nome do repositório
- Confirme que o GitHub Pages está configurado para o branch `gh-pages`
- Limpe o cache do navegador (Ctrl+Shift+R)

### Erro: "404 ao navegar para outras páginas"
- Os arquivos `404.html` e o script no `index.html` já estão configurados
- Aguarde alguns minutos após o deploy inicial
- Verifique se o branch `gh-pages` tem todos os arquivos

### Erro: "CSS não carrega"
- Verifique se o build foi executado com sucesso: `npm run build`
- Confirme que a pasta `dist` foi criada corretamente
- Limpe o cache do navegador

---

## 📦 Arquivos de Configuração Criados

✅ `public/404.html` - Redireciona rotas SPA no GitHub Pages
✅ `public/.nojekyll` - Desabilita o processamento Jekyll
✅ `public/_redirects` - Para Netlify (opcional)
✅ `index.html` - Script SPA redirect no head
✅ `src/utils/router.js` - Rotas centralizadas
✅ `vite.config.js` - Base path configurado

---

## 🌐 Testando Localmente

Para testar como ficará em produção:

```bash
npm run build
npm run preview
```

O preview estará disponível em: http://localhost:4173/take-out-tours/
