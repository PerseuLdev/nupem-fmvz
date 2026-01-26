# NUPEM Store - System Design Document

## 1. Visão Geral do Sistema
O **NUPEM Store** é uma Single Page Application (SPA) desenvolvida em React para atuar como uma Landing Page e E-commerce leve para produtos do agronegócio (Bottoms, Adesivos, Bonés, etc.).

O sistema foca em uma experiência visual imersiva (animações, efeitos 3D) e utiliza uma abordagem **"Checkout via WhatsApp"**, eliminando a necessidade inicial de um backend complexo para processamento de pagamentos.

---

## 2. Stack Tecnológica

### Core
*   **Framework:** React 19
*   **Linguagem:** TypeScript (Tipagem estrita para Interfaces de Produtos e Carrinho)
*   **Build/Modules:** ES Modules (Importação via `esm.sh` para ambiente sem bundler local complexo)

### Estilização & UI
*   **CSS Framework:** Tailwind CSS (v3.4 via CDN)
*   **Ícones:** Lucide React
*   **Fontes:** Google Fonts (Inter)

### Integrações
*   **Checkout:** API Universal do WhatsApp (`wa.me`)
*   **Compartilhamento:** Web Share API (Nativa do navegador)
*   **Analytics:** Google Analytics 4 (GA4) e Meta Pixel (Custom Implementation)

---

## 3. Arquitetura de Software

A aplicação segue uma arquitetura baseada em componentes, com o estado global "leve" sendo gerenciado no componente raiz e propagado via *props* (Prop Drilling controlado).

### 3.1. Estrutura de Diretórios
```text
/
├── index.html          # Ponto de entrada, carrega Tailwind e Scripts
├── index.tsx           # Montagem da raiz React
├── App.tsx             # Orquestrador principal (Estado do Carrinho, Rotas simuladas)
├── types.ts            # Definições de Tipos (Product, CartItem, Category)
├── constants.ts        # Mock Database (Dados estáticos dos produtos)
├── components/         # Componentes de UI
│   ├── Header.tsx      # Navegação e Estado visual do menu
│   ├── Hero.tsx        # Banner principal com efeito Parallax
│   ├── ProductCard.tsx # Card de produto com lógica de Hover/Share
│   ├── ProductModal.tsx# Detalhes do produto com efeito 3D Tilt
│   ├── CartSidebar.tsx # Gerenciamento do carrinho e Link WhatsApp
│   ├── ProductCarousel.tsx # Slider para categorias específicas
│   ├── InstagramFeed.tsx # Integração visual de mídia social
│   ├── Analytics.tsx   # Injeção e controle de scripts de rastreamento
│   └── Footer.tsx      # Rodapé informativo
└── metadata.json       # Configurações do ambiente
```

---

## 4. Fluxo de Dados (Data Flow)

### 4.1. Gerenciamento de Estado (State Management)
O estado da aplicação reside principalmente em `App.tsx`:

1.  **Carrinho (`cartItems`):** Array de objetos `CartItem`.
    *   *Ações:* `addToCart`, `removeFromCart`, `updateQuantity`.
    *   Estas funções são passadas para `ProductCard`, `ProductModal` e `CartSidebar`.
2.  **Produto Selecionado (`selectedProduct`):** Controla a visibilidade do Modal.
3.  **Interface:** Estados de `isCartOpen` (Sidebar) e notificações (Toast).

### 4.2. Fluxo de Compra (Checkout Flow)
Não há banco de dados ou gateway de pagamento. O fluxo é:

1.  Usuário adiciona itens ao carrinho.
2.  Clica em "Gerar Pedido no WhatsApp".
3.  O sistema:
    *   Dispara evento `begin_checkout` para GA4 e Pixel.
    *   Itera sobre `cartItems` e gera ID de pedido.
    *   Formata string Markdown para o WhatsApp.
    *   Redireciona para `wa.me`.

---

## 5. Analytics & Tracking

Foi implementada uma camada de analítica customizada (`components/Analytics.tsx`) que não depende de bibliotecas externas complexas (como `react-ga4`), adequada para a arquitetura ESM do projeto.

### Eventos Rastreados:
*   `PageView`: Automático no carregamento inicial.
*   `add_to_cart` (GA4) / `AddToCart` (Pixel): Ao clicar no botão de compra.
*   `begin_checkout` (GA4) / `InitiateCheckout` (Pixel): Ao clicar em "Gerar Pedido no WhatsApp".

---

## 6. Design de Componentes e UI/UX

### 6.1. Design System (Tailwind Configuration)
Configuração personalizada injetada no `<head>`:
*   **Cores "Agro":**
    *   `primary`: #4a3728 (Café/Couro)
    *   `gold`: #e9c46a (Soja/Trigo)
    *   `soil`: #d4a373 (Terra)
    *   `bg`: #faf9f6 (Off-white quente)

### 6.2. Componentes Chave

#### **ProductCard.tsx**
*   **Solução de Renderização:** Uso de `mask-image` para bordas arredondadas suaves durante animações de hover.
*   **Features:** Web Share API e layouts condicionais.

#### **ProductModal.tsx (Efeito 3D)**
*   **Lógica:** Parallax baseado na posição do mouse com `transform: rotateX/Y` e camadas de profundidade.

---

## 7. Considerações de Performance

1.  **Lazy Animations:** Uso extensivo de `IntersectionObserver`.
2.  **Scripts Assíncronos:** GA4 e Pixel são injetados dinamicamente via `useEffect` para não bloquear a renderização inicial crítica.

---

## 8. Escalabilidade e Melhorias Futuras

1.  **Backend:** API para inventário.
2.  **Persistência:** `localStorage` para carrinho.
3.  **SEO:** SSR ou pré-renderização.
