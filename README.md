# 🧪 Poções e Soluções

Site de vendas da loja de poções, desenvolvido como atividade prática da disciplina **SCC0219 - Introdução ao Desenvolvimento Web**.

---

## 🗂 Estrutura do Projeto

```
/
├── administracao/
│   ├── admin.html          # Painel administrativo
│   ├── script.js           # Cadastro de Produtos
│   ├── style.css           # Estilização da página
│
└── backend/
│    ├── index.js            # Inicialização do servidor
│    ├── routes.js           # Definição das rotas
│    ├── connection.js       # Conexão com o banco SQLite
│    ├── model/
│    │   └── potion.js       # Model Sequelize da Poção
│    └── controller/
│        └── potion.js       # Funções de CRUD
│
├── frontend/
│   ├── index.html          # Página principal (vitrine)
│   ├── script.js           # Lógica da vitrine
│   ├── style.css           # Estilização da vitrine
│   └── utils/              # Imagens locais (hero, carrossel)

```

---

## 🛠 Tecnologias

### Frontend
| Tecnologia | Versão |
|---|---|
| HTML5 | — |
| CSS3 | — |
| JavaScript | ES6+ |
| Bootstrap | 5.3.3 |

### Backend
| Tecnologia | Versão |
|---|---|
| Node.js | 18+ |
| Express | 4.x |
| Sequelize | 6.x |
| SQLite3 | 5.x |

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

---

## 🚀 Como rodar

### 1. Instalar dependências do backend

```bash
cd backend
npm install
```

As principais dependências instaladas são:

```bash
npm install express sequelize sqlite3 cors
```

### 2. Iniciar o servidor

```bash
node index.js
```

O servidor estará disponível em `http://localhost:3000`.

> O banco de dados SQLite roda **em memória** — os dados são resetados a cada reinício do servidor.

### 3. Abrir o frontend

Abra os arquivos diretamente no navegador ou utilize uma extensão como **Live Server** (VS Code):

- `index.html` → vitrine para o comprador
- `admin.html` → painel de gerenciamento de poções

> Certifique-se de que o backend está rodando antes de abrir o frontend, pois os dados são carregados via fetch através de `http://localhost:3000`.

---

## 🔌 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/potions` | Lista todas as poções |
| `GET` | `/potion/:id` | Busca uma poção por ID |
| `POST` | `/create-potion` | Cadastra uma nova poção |
| `PUT` | `/update-potion/:id` | Atualiza uma poção existente |
| `DELETE` | `/delete-potion/:id` | Remove uma poção |

### Exemplo de body para POST/PUT

```json
{
  "name": "Poção Blue Sky",
  "description": "Provê um surto de inspiração por 24 horas.",
  "photo": "https://exemplo.com/blue-sky.png",
  "value": 300
}
```

---

## 📦 Populando o banco inicial

Para inserir poções de exemplo ao iniciar o servidor, adicione no `server.js` ou `connection.js` após o `sync()`:

```js
await Potion.bulkCreate([
  { name: "Poção Blue Sky", description: "Provê um surto de inspiração por 24 horas.", value: 300 },
  { name: "Poção do Perfume Misterioso", description: "Faz você cheirar lilás e groselha por 24 dias.", value: 200 },
  { name: "Poção de Pinus", description: "Faz você ficar 10 cm mais alto! Efeitos colaterais desconhecidos.", value: 3000 },
  { name: "Poção da Beleza Eterna", description: "Veneno que mata rápido.", value: 100 },
  { name: "Poção do Arco Íro", description: "Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.", value: 120 },
  { name: "Caldeirão das Verdades Secretas", description: "As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.", value: 150 },
]);
```