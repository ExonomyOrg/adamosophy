# Adamosophy

**Social Wisdom Through Technology for Created Civilization**

Adamosophy is a monorepo hosting a showroom of decentralized applications designed for humanity. Built on Turborepo and pnpm workspaces, it provides shared infrastructure for autonomous scientific publication, collaborative creative writing, self-sovereign economics, and decentralized content viewing.

## 🌐 Live Site

- **Main Site**: https://thalperi.github.io/adamosophy/
- **Documentation**: https://thalperi.github.io/adamosophy/docs/vision

## 🏗️ Architecture

This is a **Turborepo** monorepo managed with **pnpm**.

```
adamosophy/
├── apps/
│   ├── web/          # Main showroom & documentation reader (Astro)
│   ├── exonomy/      # Self-sovereign economics (Voucher minting)
│   ├── republet/     # Autonomous scientific publication
│   ├── internovel/   # Collaborative creative writing
│   └── inviewer/     # Standalone novel viewer (PDF-style)
├── packages/
│   ├── willow/       # Shared Willow/Earthstar networking
│   ├── vouchers/     # Shared voucher logic (spending/verification)
│   ├── mint/         # Exclusive voucher minting logic
│   └── ui/           # Shared UI components
└── docs/             # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)

### Installation

```bash
pnpm install
```

### Development

Run all apps in development mode:

```bash
pnpm dev
```

Run only the web app (showroom):

```bash
pnpm --filter=web dev
```

### Building

Build all apps:

```bash
pnpm build
```

Build only the web app:

```bash
pnpm --filter=web build
```

## 📚 Documentation

Documentation is hosted within the web app using a drawer-style navigation inspired by Couchers.org.

- Read the [Vision Document](https://thalperi.github.io/adamosophy/docs/vision)
- Add new docs by placing `.md` files in `apps/web/public/docs/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details.
