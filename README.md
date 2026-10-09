# test

## Estructura

en carpeta apps/

**web** = React + Vite

**mobile** = React native + Expo

**api** = backend, Nestjs


## Requisitos

* Node.js
* pnpm

```
npm install -g pnpm
```

## Instalar dependencias
* En la carpeta raíz del proyecto, cmd:
```
pnpm install
```

## Ejecución local

### web
```
pnpm --dir apps/web dev
```

### mobile
```
pnpm --dir apps/mobile start
```

### Backend (api)
```
pnpm --dir apps/api start:dev
```