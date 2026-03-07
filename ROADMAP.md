# Roadmap: Java (Refresh) + Node.js (Básico → Mid-Senior) + Front básico

> Objetivo: recordar Java moderno, aprender Node.js en profundidad y montar
> un proyecto fullstack Node + Java con algo de front.

---

## PARTE 1 — Java (Refresh desde 2015)

### ¿Qué cambió desde Java 8?

| Versión | Novedades clave |
|---------|-----------------|
| Java 8 (2014) | Lambdas, Streams, Optional, LocalDate |
| Java 11 (LTS) | `var` implícito, `String.strip()`, HttpClient moderno |
| Java 17 (LTS) | Records, Sealed classes, Pattern matching, Text blocks |
| Java 21 (LTS) | Virtual Threads (Project Loom), Pattern matching avanzado |

> **Recomendación**: apunta a Java 21 LTS.

---

### 1.1 Que ya sabes (recordatorio rápido)

```java
// Clases y objetos
public class Persona {
    private String nombre;
    private int edad;

    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    public String getNombre() { return nombre; }
}

// Herencia
public class Empleado extends Persona {
    private double salario;

    public Empleado(String nombre, int edad, double salario) {
        super(nombre, edad);
        this.salario = salario;
    }
}

// Interfaces
public interface Trabajador {
    void trabajar();
    default String descansar() { return "descansando..."; }
}
```

---

### 1.2 Lo que cambió: Lambdas y Streams (Java 8)

```java
import java.util.*;
import java.util.stream.*;

List<String> nombres = List.of("Ana", "Carlos", "Beatriz", "David");

// Filtrar, transformar, recoger
List<String> resultado = nombres.stream()
    .filter(n -> n.length() > 4)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());

// Optional (evitar NullPointerException)
Optional<String> nombre = Optional.ofNullable(null);
String valor = nombre.orElse("desconocido");

// Método de referencia
nombres.forEach(System.out::println);
```

---

### 1.3 Records (Java 16+) — clases de datos sin boilerplate

```java
// Antes (Java < 16): getter, equals, hashCode, toString a mano
// Ahora:
public record Punto(int x, int y) {}

Punto p = new Punto(3, 4);
System.out.println(p.x());   // 3
System.out.println(p);        // Punto[x=3, y=4]
```

---

### 1.4 Pattern Matching (Java 17+)

```java
Object obj = "Hola";

// Antes
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Ahora
if (obj instanceof String s) {
    System.out.println(s.length());
}

// Switch expression (Java 14+)
String resultado = switch (obj) {
    case Integer i -> "entero: " + i;
    case String s  -> "texto: " + s;
    default        -> "desconocido";
};
```

---

### 1.5 Text Blocks (Java 15+)

```java
String json = """
    {
        "nombre": "Ana",
        "edad": 30
    }
    """;
```

---

### 1.6 Virtual Threads (Java 21) — muy relevante para tu proyecto Node+Java

```java
// Antes: Thread del SO, caro
Thread t = new Thread(() -> System.out.println("hola"));
t.start();

// Ahora: virtual thread, baratísimo (millones a la vez)
Thread.ofVirtual().start(() -> System.out.println("virtual!"));

// Con ExecutorService
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> procesarPeticion());
}
```

---

### 1.7 Maven / Gradle (gestión de dependencias)

```xml
<!-- pom.xml básico (Maven) -->
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.miapp</groupId>
  <artifactId>backend-java</artifactId>
  <version>1.0.0</version>

  <dependencies>
    <!-- Spring Boot -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
      <version>3.2.0</version>
    </dependency>
  </dependencies>
</project>
```

---

### 1.8 Spring Boot (el framework dominante)

```java
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @GetMapping
    public List<Usuario> listar() {
        return List.of(new Usuario("Ana"), new Usuario("Carlos"));
    }

    @PostMapping
    public ResponseEntity<Usuario> crear(@RequestBody Usuario usuario) {
        // guardar...
        return ResponseEntity.status(201).body(usuario);
    }
}
```

---

## PARTE 2 — Node.js (Básico → Mid-Senior)

### 2.1 ¿Qué es Node y por qué se diferencia de Java?

| | Java | Node.js |
|---|---|---|
| Modelo | Multihilo | Event loop (monohilo) |
| I/O | Bloqueante por defecto | No bloqueante por defecto |
| Tipado | Estático | Dinámico (TypeScript lo añade) |
| Arranque | Lento (JVM) | Muy rápido |
| Throughput I/O | Muy alto (virtual threads) | Muy alto (event loop) |
| CPU intensiva | Mejor | Peor |

---

### 2.2 Nivel Básico

#### Event Loop (el concepto más importante)

```js
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Salida: 1, 4, 3, 2
// Call stack → microtasks (Promises) → macrotasks (setTimeout)
```

#### Módulos (CommonJS vs ESModules)

```js
// CommonJS (el clásico)
const fs = require("fs");
module.exports = { miFuncion };

// ESModules (moderno, usar siempre que puedas)
import fs from "fs";
export { miFuncion };
```

#### Manejo de archivos (async/await)

```js
import { readFile, writeFile } from "fs/promises";

const contenido = await readFile("datos.txt", "utf-8");
await writeFile("salida.txt", contenido.toUpperCase());
```

---

### 2.3 npm / package.json

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tsx": "^4.0.0",
    "@types/express": "^4.17.0"
  }
}
```

---

### 2.4 Express (servidor HTTP básico)

```ts
import express from "express";

const app = express();
app.use(express.json());

// Middleware propio
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.get("/api/saludo", (req, res) => {
    res.json({ mensaje: "Hola desde Node" });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
```

---

### 2.5 Nivel Intermedio

#### Async/Await y manejo de errores

```ts
async function obtenerUsuario(id: number) {
    try {
        const respuesta = await fetch(`https://api.ejemplo.com/usuarios/${id}`);
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        return await respuesta.json();
    } catch (error) {
        console.error("Error:", error);
        throw error; // re-lanzar para que el caller lo maneje
    }
}
```

#### Promesas en paralelo

```ts
// Mal: secuencial (lento)
const usuario = await getUsuario(1);
const pedidos = await getPedidos(1);

// Bien: paralelo (rápido)
const [usuario, pedidos] = await Promise.all([
    getUsuario(1),
    getPedidos(1)
]);

// Promise.allSettled: cuando no quieres que un fallo cancele todo
const resultados = await Promise.allSettled([tarea1(), tarea2()]);
```

#### Variables de entorno

```ts
// .env
// DATABASE_URL=postgres://localhost/midb
// PORT=3000

// código
import "dotenv/config"; // npm install dotenv
const puerto = process.env.PORT ?? "3000";
```

#### Estructura de proyecto recomendada

```
src/
  controllers/   # lógica HTTP (request/response)
  services/      # lógica de negocio
  repositories/  # acceso a datos
  models/        # tipos/interfaces/schemas
  middlewares/   # autenticación, logs, errores
  routes/        # definición de rutas
  index.ts       # entry point
```

---

### 2.6 Nivel Mid-Senior

#### Middleware de errores centralizado

```ts
// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
    }
}

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
}

// Uso en un controller:
// throw new AppError(404, "Usuario no encontrado");
```

#### Base de datos con Prisma (ORM moderno)

```ts
// schema.prisma
// model Usuario {
//   id        Int      @id @default(autoincrement())
//   email     String   @unique
//   nombre    String
//   createdAt DateTime @default(now())
// }

// Uso en código
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const usuario = await prisma.usuario.create({
    data: { email: "ana@test.com", nombre: "Ana" }
});

const todos = await prisma.usuario.findMany({
    where: { nombre: { contains: "Ana" } }
});
```

#### Autenticación con JWT

```ts
import jwt from "jsonwebtoken"; // npm install jsonwebtoken

const SECRET = process.env.JWT_SECRET!;

// Generar token
function generarToken(userId: number) {
    return jwt.sign({ sub: userId }, SECRET, { expiresIn: "7d" });
}

// Middleware de autenticación
function autenticar(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No autorizado" });

    try {
        const payload = jwt.verify(token, SECRET);
        (req as any).user = payload;
        next();
    } catch {
        res.status(401).json({ error: "Token inválido" });
    }
}
```

#### Testing con Vitest / Jest

```ts
import { describe, it, expect } from "vitest";
import { suma } from "./utils";

describe("suma", () => {
    it("suma dos números", () => {
        expect(suma(2, 3)).toBe(5);
    });

    it("maneja negativos", () => {
        expect(suma(-1, 1)).toBe(0);
    });
});
```

#### Docker para Node

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

---

## PARTE 3 — Proyecto Node + Java

### Arquitectura recomendada

```
                    [Navegador / Front]
                           |
                    [Node.js - API Gateway]
                    (Express / Fastify)
                    /                  \
          [Servicio Java]        [Servicio Node]
          (Spring Boot)          (lógica rápida)
          [Base de datos]        [Cache / Redis]
          PostgreSQL / MySQL
```

**Node como gateway/orquestador**: recibe peticiones del front, las distribuye.  
**Java para lógica pesada**: cálculos, procesos batch, reglas de negocio complejas.

---

### Comunicación Node → Java

#### Opción 1: REST (la más simple)

```ts
// Node llama a Java via HTTP
const respuesta = await fetch("http://java-service:8080/api/calcular", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ datos: "..." })
});
const resultado = await respuesta.json();
```

#### Opción 2: Mensajería con RabbitMQ / Kafka (más robusto)

```ts
// Node publica un mensaje, Java lo consume de forma async
// (introduce cuando el proyecto crezca)
```

---

### 3.1 docker-compose para el proyecto completo

```yaml
version: "3.9"
services:
  node-api:
    build: ./node-api
    ports: ["3000:3000"]
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/midb
      - JAVA_SERVICE_URL=http://java-service:8080
    depends_on: [db, java-service]

  java-service:
    build: ./java-service
    ports: ["8080:8080"]
    depends_on: [db]

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: midb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

---

## PARTE 4 — Front básico

### HTML + JS vanilla (suficiente para empezar)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi App</title>
</head>
<body>
  <h1>Usuarios</h1>
  <ul id="lista"></ul>

  <script>
    async function cargarUsuarios() {
      const res = await fetch("/api/usuarios");
      const usuarios = await res.json();
      const lista = document.getElementById("lista");
      usuarios.forEach(u => {
        const li = document.createElement("li");
        li.textContent = u.nombre;
        lista.appendChild(li);
      });
    }

    cargarUsuarios();
  </script>
</body>
</html>
```

### O con Vite + TypeScript (más moderno, sigue siendo "básico")

```bash
npm create vite@latest mi-front -- --template vanilla-ts
cd mi-front && npm install && npm run dev
```

---

## PARTE 5 — Hoja de ruta de aprendizaje

### Semanas 1-2: Java Refresh
- [ ] Instalar Java 21 + IntelliJ IDEA Community
- [ ] Repasar Streams, Optional, Lambdas
- [ ] Crear un CRUD con Spring Boot + H2 (base de datos en memoria)
- [ ] Records, Pattern Matching, Text Blocks

### Semanas 3-4: Node básico-intermedio
- [ ] Node sin frameworks: `fs`, `http`, `path`
- [ ] Express + TypeScript: rutas, middlewares, error handling
- [ ] Prisma + PostgreSQL: CRUD completo
- [ ] Variables de entorno, estructura de proyecto

### Semanas 5-6: Node mid-senior
- [ ] Autenticación JWT
- [ ] Testing con Vitest
- [ ] Docker + docker-compose
- [ ] Logging estructurado (pino)

### Semanas 7-8: Integración
- [ ] Node llama a Java via REST
- [ ] docker-compose con ambos servicios + DB
- [ ] Front básico conectado al Node API

---

## Referencias rápidas

| Tema | Recurso |
|------|---------|
| Java moderno | https://dev.java/learn/ |
| Spring Boot | https://start.spring.io |
| Node.js docs | https://nodejs.org/docs/latest/api/ |
| TypeScript | https://www.typescriptlang.org/docs/ |
| Prisma | https://www.prisma.io/docs |
| Express | https://expressjs.com |
| Vite | https://vitejs.dev |
| Docker | https://docs.docker.com |
