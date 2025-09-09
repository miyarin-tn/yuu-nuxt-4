# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Build by Docker

1. Prerequisites:

- [Install docker (docker-compose integrated)](https://docs.docker.com/engine/install)

2. Build

> Only with Docker

```bash
# Build images
$ docker build -t <image_name> .
# Ex: docker build -t nuxt_web .

# Run container
docker run --name <container_name> -d -it -v .:<virtual_path> -p <real_port>:<container_expose_port> <image_name>
# Ex: docker run --name yuu_nuxt -d -it -v .:/app -p 3000:3000 nuxt_web
```

> Only with Docker Compose (Recommend)

```bash
$ docker-compose -f docker-compose.yml up

# Rebuild
$ docker-compose -f docker-compose.yml up --build

# Run with current user
$ CURRENT_UID=$(id -u):$(id -g) docker-compose up --build
```

## Run by PM2

1. Prerequisites:

- [Install pm2](https://pm2.keymetrics.io/docs/usage/quick-start)

2. Prepare and use

```bash
# Run pm2
$ pm2 start ecosystem.config.cjs --only <name>

# Stop a name of pm2
$ pm2 stop <name>

# Logs pm2
$ pm2 logs <name>
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
