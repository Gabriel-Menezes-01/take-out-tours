# ✅ Checklist de Deploy - GitHub Pages

## Antes de fazer deploy:

### 1. Verificar package.json
```json
"homepage": "https://Gabriel-Menezes-01.github.io/take-out-tours"
```
- [ ] URL está correta (`.github.io` e NÃO `.github.com`)
- [ ] Nome do repositório está correto (`take-out-tours`)

### 2. Verificar vite.config.js
```javascript
base: '/take-out-tours/'
```
- [ ] Base path corresponde ao nome do repositório
- [ ] Tem a barra final `/`

### 3. Fazer Build Local
```bash
npm run build
```
- [ ] Build executou sem erros
- [ ] Pasta `dist` foi criada

### 4. Testar Localmente
```bash
npm run preview
```
- [ ] Preview funciona em `http://localhost:4173/take-out-tours/`
- [ ] Navegação entre páginas funciona
- [ ] CSS carrega corretamente

## Durante o deploy:

### 5. Commit das mudanças
```bash
git add .
git commit -m "Fix: Corrigir configuração para GitHub Pages"
git push origin main
```
- [ ] Todas as mudanças foram commitadas
- [ ] Push para o main foi bem-sucedido

### 6. Deploy para GitHub Pages
```bash
npm run deploy
```
- [ ] Deploy executou sem erros
- [ ] Branch `gh-pages` foi criado/atualizado

### 7. Configurar GitHub Pages
1. Acesse: https://github.com/Gabriel-Menezes-01/take-out-tours/settings/pages
2. Em "Source":
   - [ ] Branch: `gh-pages` (não `main`)
   - [ ] Folder: `/ (root)`
3. [ ] Clique em "Save"

### 8. Aguardar Deploy
- [ ] Aguardar 5-10 minutos para o GitHub processar
- [ ] Verificar status em: https://github.com/Gabriel-Menezes-01/take-out-tours/actions

### 9. Testar Site Online
- [ ] Acessar: https://Gabriel-Menezes-01.github.io/take-out-tours/
- [ ] Página inicial carrega
- [ ] Navegação funciona
- [ ] CSS está aplicado
- [ ] Imagens carregam
- [ ] Links funcionam

## Se algo der errado:

### Erro 404 ou "Erro inesperado"
```bash
# Verifique o package.json
cat package.json | grep homepage

# Se estiver errado (.github.com), corrija e:
npm run build
npm run deploy
```

### Página em branco
```bash
# Limpe o cache e rebuilde
rm -rf dist
npm run build
npm run deploy
```

### Aguarde sempre 5-10 minutos após o primeiro deploy!

## Comandos úteis:

```bash
# Ver status do repositório
git status

# Ver branches
git branch -a

# Forçar rebuild completo
rm -rf dist node_modules/.vite
npm run build

# Testar localmente antes de deploy
npm run preview
```

---

## 🎉 Deploy bem-sucedido?

Seu site deve estar em:
**https://Gabriel-Menezes-01.github.io/take-out-tours/**

Para atualizações futuras:
```bash
git add .
git commit -m "Suas mudanças"
git push origin main
npm run deploy
```
