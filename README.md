*This project has been created as part of the 42 curriculum by mobouifr.*

<div align="center">

# rawhttp

**A step-by-step reconstruction of the web stack — from raw TCP sockets to a working full-stack application.**

*From TCP bytes to Express and the browser — no magic, no black boxes.*

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/docs)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTTP](https://img.shields.io/badge/HTTP-00599C?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/HTTP)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![42](https://img.shields.io/badge/42-1337-000000?style=for-the-badge)](https://42.fr)

</div>

---

## What is this?

`rawhttp` is a 42 project about rebuilding the web stack from the ground up in Node.js.

The project starts with a raw TCP socket opened manually with Node.js and evolves branch by branch into a complete full-stack application. Instead of starting with frameworks, you rebuild the pieces yourself first: HTTP parsing, routing, persistence, asynchronous execution, APIs, middleware, and frontend communication.

The goal is not simply to make a web server work — it is to deeply understand what frameworks like Express, NestJS, or React are actually doing underneath.

By the end of the project, the web stack stops feeling magical.

> This project is about understanding the layers underneath modern web frameworks — not memorizing APIs.

---

## Stack

| Layer | Technology | Purpose |
|---|---|---|
| Network | TCP sockets (`net`) | Low-level socket communication |
| Protocol | HTTP/1.1 | Request / response protocol |
| Backend | Node.js | JavaScript runtime |
| Persistence | JSON file storage | Data persistence between restarts |
| Async I/O | `fs.promises` | Non-blocking file operations |
| Framework | Express | Rebuilt abstraction layer |
| Frontend | HTML + Vanilla JavaScript | Browser client |
| Communication | `fetch()` | Frontend ↔ backend requests |
| Version control | Git branches | Stage-by-stage project evolution |

---

## Getting started

### Requirements

- Node.js 18+
- Git
- curl
- A browser

Check your Node version:

```bash
node -v
```

---

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/mobouifr/rawhttp.git
cd rawhttp

# 2. Checkout a stage
git checkout stage-0

# 3. Start the server
node server.js
```

Then open:

```txt
http://localhost:4000
```

Or test with curl:

```bash
curl -v localhost:4000
```

---

## Branches

| Branch | Focus | What changes |
|---|---|---|
| `stage-0` | Raw TCP | Open a socket and manually send an HTTP response |
| `stage-1` | HTTP parsing | Build a parser and a router manually |
| `stage-2` | Persistence | Store data inside `data.json` |
| `stage-3` | Async Node.js | Rewrite file operations using Promises and `await` |
| `stage-4` | Express | Rebuild the same server using Express |
| `stage-5` | Full-stack | Connect a frontend with vanilla JavaScript |

---

## Project philosophy

This repository intentionally evolves progressively instead of hiding everything behind frameworks immediately.

You first implement:

- Raw socket handling
- Manual HTTP parsing
- Manual routing
- File persistence
- Async execution
- Request handling

Only after understanding those layers do you rebuild the same backend with Express.

The idea is simple:

> Frameworks should feel organised — not magical.

---

## Stage breakdown

<details>
<summary>stage-0 — Raw TCP</summary>
<br/>

The server opens a raw TCP socket using `net.createServer()`.

At this stage:

- Every incoming byte is printed manually
- HTTP responses are written entirely by hand
- No parser exists yet
- No router exists yet

You directly see:

- Request line
- Headers
- Body
- The blank line separating headers from body

This is the foundation of the entire project.

</details>

<details>
<summary>stage-1 — HTTP parsing & routing</summary>
<br/>

The project now behaves like a miniature web framework internally.

Implemented manually:

- `parseRequest(raw)`
- `router(request, socket)`

Features added:

- `GET /`
- `POST /data`
- JSON request parsing
- Manual routing
- Proper 404 handling

This stage reveals what Express internally automates for you.

</details>

<details>
<summary>stage-2 — Persistence</summary>
<br/>

Data now survives server restarts.

Features added:

- `data.json`
- `loadData()`
- `saveData()`
- CRUD-style routes

Routes:

```http
GET    /items
POST   /items
DELETE /items/:id
```

The project now behaves like a small API server.

</details>

<details>
<summary>stage-3 — Async properly</summary>
<br/>

This is the most important conceptual stage of the project.

The server transitions from blocking file operations to asynchronous execution using:

```js
await fs.promises.readFile()
await fs.promises.writeFile()
```

Key concepts learned:

- Promises
- `async/await`
- Event loop
- Non-blocking execution
- Why forgetting `await` causes race conditions

This stage explains how Node.js handles concurrency without blocking the process.

</details>

<details>
<summary>stage-4 — Rebuild with Express</summary>
<br/>

The backend is rebuilt using Express.

The goal is not to learn Express syntax.

The goal is to recognize that Express is simply organising what you already built manually.

Concept mapping:

| Manual implementation | Express equivalent |
|---|---|
| `parseRequest()` | `express.json()` |
| `router()` | `app.get()` / `app.post()` |
| Manual headers | Middleware |
| Raw socket response | `res.json()` / `res.send()` |

CORS support is also added.

</details>

<details>
<summary>stage-5 — Full-stack</summary>
<br/>

The backend now connects to a real frontend.

Features:

- `index.html`
- Vanilla JavaScript frontend
- Dynamic DOM updates
- `fetch()` API calls
- Add/delete items without page reloads

The project becomes a complete full-stack application.

You can now trace the complete lifecycle of a request:

```txt
Browser
→ fetch()
→ HTTP request
→ Express route
→ File operation
→ Response
→ DOM update
```

</details>

---

## Example routes

### Get all items

```http
GET /items
```

### Add an item

```http
POST /items
Content-Type: application/json
```

Body:

```json
{
  "name": "learn HTTP"
}
```

### Delete an item

```http
DELETE /items/:id
```

---

## Useful commands

### Switch stages

```bash
git checkout stage-3
```

### Compare stages

```bash
git diff stage-2 stage-3
```

### View the full project evolution

```bash
git log --oneline --all --graph
```

---

## Design choices

<details>
<summary>Why build HTTP manually first?</summary>
<br/>

Starting directly with Express hides too many important concepts. Building HTTP manually forces you to understand how requests are structured, how routing works, and what frameworks are abstracting away.

Once those pieces are understood, Express becomes easier to reason about instead of feeling magical.

</details>

<details>
<summary>Why one branch per stage?</summary>
<br/>

The branches themselves are part of the learning process.

Each branch represents a snapshot of the project at a specific moment in its evolution. Using branches instead of folders makes it possible to inspect exactly what changed between stages using `git diff`.

The git history becomes part of the documentation.

</details>

<details>
<summary>Why use a JSON file instead of a database?</summary>
<br/>

The goal of stage-2 is not to build production-ready persistence. The JSON file exists to make the distinction between memory and disk concrete before introducing real databases later.

It keeps the persistence layer simple enough that the focus remains on HTTP and Node.js fundamentals.

</details>

<details>
<summary>Why no frontend framework?</summary>
<br/>

The frontend is intentionally written with plain HTML and vanilla JavaScript so that the connection between browser events, `fetch()`, HTTP requests, and DOM updates stays fully visible.

Using React immediately would hide too much too early.

</details>

---

## Project structure

```bash
rawhttp/
│
├── server.js
├── data.json
├── index.html
├── package.json
├── .gitignore
└── README.md
```

The project evolves progressively through branches instead of folders.

---

## Key concepts learned

### HTTP

- Request structure
- Headers
- Status codes
- Routing
- Content-Type
- CORS
- REST-style APIs

### Node.js

- TCP sockets
- Event loop
- Promises
- `async/await`
- File I/O
- Middleware

### Frontend

- DOM manipulation
- `fetch()`
- Dynamic rendering
- Client/server communication

### Architecture

- Separation of concerns
- Request lifecycle
- Persistence
- Stateless APIs
- Backend/frontend interaction

---

## Resources

- [Node.js documentation](https://nodejs.org/en/docs)
- [HTTP documentation (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [Express documentation](https://expressjs.com/)
- [MDN fetch() API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Node.js event loop guide](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick)

---

## Final note

The real deliverable of this project is not the server itself.

It is the moment when frameworks stop feeling magical.

When you look at Express, NestJS, React, Prisma, or any backend framework and immediately recognize:

> “I know what this is doing underneath.”
