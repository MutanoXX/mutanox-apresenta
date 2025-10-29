# MutanoX - Apresenta

Um site de apresentação de slides moderno e interativo com tema roxo/preto, introdução animada e transições extremas.

## 🎨 Características

- **Introdução Animada**: Tela de boas-vindas com efeito roxo e preto, nome "MutanoX-Apresenta" com glow animado
- **Sistema de Slides**: 5 slides temáticos sobre "Abaixo-Assinado e Manifesto"
- **Transições Extremas**: Efeitos 3D ao navegar entre slides
- **Controles Intuitivos**: 
  - Setas do teclado (← →) para navegar
  - Espaço para próximo slide
  - Tecla "F" para tela cheia
  - Botões de navegação visual
- **Cookies/LocalStorage**: Introdução aparece apenas uma vez por dispositivo
- **Fullscreen Automático**: Suporte a tela cheia para apresentações
- **Responsivo**: Funciona em desktop, tablet e mobile

## 🚀 Desenvolvimento Local

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview do build
pnpm preview
```

## 📱 Navegação

| Ação | Efeito |
|------|--------|
| Seta Direita / Espaço | Próximo slide |
| Seta Esquerda | Slide anterior |
| Tecla F | Ativar/Desativar fullscreen |
| Clique nos pontos | Ir para slide específico |
| Clique nos botões | Navegar entre slides |

## 🌐 Deploy na Vercel

O projeto está configurado para deploy automático na Vercel:

```bash
# 1. Fazer push do código para GitHub
git push origin main

# 2. Conectar repositório na Vercel (vercel.com)
# 3. Clicar em "Deploy"
```

Ou usar Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 📁 Estrutura do Projeto

```
mutanox-apresenta/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx          # Sistema de slides
│   │   ├── App.tsx               # Introdução animada
│   │   └── index.css             # Estilos e animações
│   ├── public/                   # Arquivos estáticos
│   └── index.html
├── vercel.json                   # Configuração Vercel
└── README.md
```

## 🎯 Customização

### Adicionar Novos Slides

Edite o array `slides` em `client/src/pages/Home.tsx`:

```typescript
const slides = [
  {
    id: 1,
    title: "Seu Título",
    subtitle: "Seu Subtítulo",
    content: "Seu Conteúdo",
    color: "from-purple-600 to-purple-900",
  },
  // ... mais slides
];
```

### Alterar Cores

Modifique as variáveis CSS em `client/src/index.css`:

```css
--accent: oklch(0.5 0.2 280);  /* Cor roxa */
```

## 🔧 Tecnologias

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilos utilitários
- **Vite** - Build tool
- **Lucide React** - Ícones

## 📝 Licença

Projeto criado com Manus AI.

## 💡 Dicas

- Use a tecla "F" para apresentações em tela cheia
- Os cookies garantem que a introdução não apareça novamente
- Customize os slides conforme necessário
- Teste em diferentes navegadores antes de apresentar
