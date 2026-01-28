# Plano de Redesign - Estética Fazenda Premium

## Visão Geral

Transformar o site NUPEM em uma experiência visual que remeta ao **estilo fazenda premium/ranch**, mantendo elegância e sofisticação. A estética deve transmitir: tradição, autenticidade, força do campo, e qualidade artesanal.

---

## Paleta de Cores (Já existente - manter)

| Cor | Hex | Uso |
|-----|-----|-----|
| Primary (Café/Couro) | `#4a3728` | Fundos, headers, CTAs secundários |
| Secondary (Terracota) | `#8c6b5d` | Acentos, hover states |
| Gold (Colheita) | `#e9c46a` | Destaques, badges, linhas decorativas |
| Soil (Areia) | `#d4a373` | Gradientes, elementos suaves |
| Background | `#faf9f6` | Fundo geral (off-white quente) |

---

## Tipografia

### Fontes a Utilizar

1. **Playfair Display** (Serif Bold)
   - Uso: Títulos principais, headlines, logo
   - Estilo: Elegante, premium, tradicional
   - Peso: 700, 800, 900

2. **Bebas Neue** (Sans-serif Condensada)
   - Uso: Navegação, labels, tags, CTAs
   - Estilo: Impactante, all-caps, moderno-rústico
   - Peso: 400

3. **Inter** (Sans-serif - já existente)
   - Uso: Corpo de texto, descrições, parágrafos
   - Peso: 300, 400, 600

### Hierarquia Tipográfica

```
H1 (Hero): Playfair Display, 4.5rem, bold
H2 (Seções): Playfair Display, 3rem, bold
H3 (Cards/Títulos): Playfair Display, 1.75rem, bold
Nav Links: Bebas Neue, 1.125rem, tracking-wide
Labels/Tags: Bebas Neue, 0.75rem, uppercase
Body: Inter, 1rem, regular
```

---

## Componentes - Redesign Detalhado

### 1. Header/Navbar ✅ (Já implementado)
- Logo badge circular com borda dupla dourada
- Logo "pendura" metade para fora ao scrollar
- Links em Bebas Neue com underline animado
- Linhas decorativas ornamentais

### 2. Hero Section

**Mudanças:**
- Título em Playfair Display (serif elegante)
- Adicionar textura de papel/couro sutil no overlay
- Badge "NOVA COLEÇÃO" com estilo de selo/carimbo
- Botões com cantos mais arredondados e bordas douradas

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│         ╭──────────────────────╮                      │
│         │  NOVA COLEÇÃO 2025  │  ← selo estilo stamp  │
│         ╰──────────────────────╯                      │
│                                                        │
│     A Identidade do Agro                              │
│     Em Cada Detalhe          ← Playfair Display       │
│                                                        │
│   [ Ver Produtos ]  [ Conheça a NUPEM ]               │
│                        ↑ bordas douradas              │
└────────────────────────────────────────────────────────┘
```

### 3. Seção de Categorias

**Mudanças:**
- Título "Escolha sua Categoria" em Playfair Display
- Subtítulo "Catálogo Oficial" em Bebas Neue
- Cards de categoria com moldura estilo "frame de madeira"
- Hover com efeito de textura de couro

**Títulos de cada categoria:**
- Decoração com linha dourada e pontos ornamentais
- Fonte Playfair Display para o nome da categoria

```
     ●────────● BOTTOMS ●────────●
         ↑ linhas com terminações ornamentais
```

### 4. Product Cards

**Mudanças:**
- Título do produto em Playfair Display
- Tag de categoria em Bebas Neue
- Badge "NOVO" estilo selo de cera
- Borda sutil dourada no hover
- Preço com estilo de etiqueta antiga

### 5. About Section

**Mudanças:**
- Título "Plantando o futuro, colhendo história" em Playfair Display
- Adicionar elemento decorativo de moldura
- Badge "Sobre Nós" estilo carimbo
- Imagens com bordas arredondadas + sombra de papel

### 6. Testimonials

**Mudanças:**
- Título em Playfair Display
- Cards com aspas decorativas estilo vintage
- Avatar com borda dourada
- Fundo com textura sutil de papel

### 7. FAQ Section

**Mudanças:**
- Título "Dúvidas Frequentes" em Playfair Display
- Perguntas em peso bold mas estilo mais elegante
- Ícone de interrogação dentro de badge circular dourado
- Accordion com bordas mais suaves

### 8. Footer

**Mudanças:**
- Logo NUPEM em Playfair Display
- Títulos de seção em Bebas Neue
- Adicionar elemento decorativo de cerca/porteira estilizada
- Links sociais com bordas douradas no hover

---

## Elementos Decorativos Recorrentes

### Linhas Ornamentais
```css
/* Linha com pontos nas extremidades */
●──────────────────────●

/* Linha com gradiente dourado */
━━━━━━━━━━━━━━━━━━━━━━
```

### Molduras/Frames
- Bordas duplas (externa dourada, interna marrom)
- Cantos arredondados suaves (não muito sharp)
- Box-shadow com tom sépia

### Texturas (Sutis)
- Padrão de pontos (já existente) - manter
- Possível: textura de papel/couro no hero overlay

### Badges/Selos
- Estilo "carimbo" para tags
- Bordas tracejadas ou pontilhadas
- Rotação leve (-2deg a 2deg)

---

## Animações e Transições

| Elemento | Animação |
|----------|----------|
| Títulos | Fade in + slide up ao aparecer |
| Cards | Scale sutil + sombra no hover |
| Botões | Glow dourado + lift no hover |
| Links | Underline slide-in |
| Imagens | Zoom suave no hover |

---

## Arquivos a Modificar

### 1. `index.html`
- [ ] Já atualizado com Google Fonts

### 2. `index.css`
- [ ] Adicionar classes utilitárias para decorações
- [ ] Estilos de moldura fazenda
- [ ] Animações de selo/carimbo

### 3. `components/Hero.tsx`
- [ ] Aplicar Playfair Display nos títulos
- [ ] Redesenhar badge de coleção
- [ ] Ajustar botões com estética fazenda

### 4. `components/About.tsx`
- [ ] Título em Playfair Display
- [ ] Adicionar elementos decorativos
- [ ] Estilizar badge "Sobre Nós"

### 5. `components/FAQ.tsx`
- [ ] Título em Playfair Display
- [ ] Ajustar estilo das perguntas
- [ ] Ícone decorativo

### 6. `components/Testimonials.tsx`
- [ ] Título em Playfair Display
- [ ] Aspas decorativas vintage
- [ ] Cards com textura sutil

### 7. `components/Footer.tsx`
- [ ] Logo em Playfair Display
- [ ] Títulos em Bebas Neue
- [ ] Elementos decorativos

### 8. `components/ProductCard.tsx`
- [ ] Título em Playfair Display
- [ ] Tag em Bebas Neue
- [ ] Badge "NOVO" estilo selo

### 9. `App.tsx`
- [ ] Títulos de seção em Playfair Display
- [ ] Subtítulos em Bebas Neue
- [ ] Decorações nas categorias

---

## Ordem de Implementação

1. **CSS Base** - Adicionar classes utilitárias e decorações
2. **Hero** - Maior impacto visual inicial
3. **Categorias (App.tsx)** - Títulos e navegação
4. **Product Cards** - Tipografia e badges
5. **About** - Seção de destaque
6. **Testimonials** - Cards elegantes
7. **FAQ** - Ajustes finos
8. **Footer** - Finalização

---

## Resultado Esperado

Um site que transmite:
- **Tradição** - Fontes serifadas clássicas
- **Autenticidade** - Elementos rústicos mas elegantes
- **Qualidade** - Detalhes ornamentais e acabamento
- **Campo/Agro** - Cores terrosas e texturas naturais
- **Premium** - Sofisticação sem perder a identidade

---

## Preview Visual (ASCII Art)

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   INÍCIO   CATEGORIAS  ═══╣ 🐄 NUPEM ╠═══  SOBRE   FAQ  🛒  ║
║                              ╰──────╯                        ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║              ╭─────────────────────╮                         ║
║              │  NOVA COLEÇÃO 2025  │                         ║
║              ╰─────────────────────╯                         ║
║                                                              ║
║         𝓐 𝓘𝓭𝓮𝓷𝓽𝓲𝓭𝓪𝓭𝓮 𝓭𝓸 𝓐𝓰𝓻𝓸                                ║
║         𝓔𝓶 𝓒𝓪𝓭𝓪 𝓓𝓮𝓽𝓪𝓵𝓱𝓮                                      ║
║                                                              ║
║       [ Ver Produtos ]    [ Conheça ]                        ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║              ●━━━ Catálogo Oficial ━━━●                      ║
║                                                              ║
║         𝓔𝓼𝓬𝓸𝓵𝓱𝓪 𝓼𝓾𝓪 𝓒𝓪𝓽𝓮𝓰𝓸𝓻𝓲𝓪                                 ║
║                                                              ║
║   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           ║
║   │ BOTTOMS │ │ADESIVOS │ │  BONÉS  │ │CHAVEIROS│           ║
║   └─────────┘ └─────────┘ └─────────┘ └─────────┘           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

**Pronto para implementação após aprovação.**
