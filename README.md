# crud_fastapi

Recomended folder structure: (by now)

my-project/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── endpoints/
│   │   │   │   │   └── users.py
│   │   │   │   └── __init__.py
│   │   │   └── __init__.py
│   │   ├── core/             # App config (settings, security, etc.)
│   │   │   └── config.py
│   │   ├── db/               # DB init, session, migrations
│   │   │   ├── base.py
│   │   │   ├── session.py
│   │   │   └── init_db.py
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic models (input/output)
│   │   ├── services/         # Business logic
│   │   ├── main.py           # FastAPI app instance
│   │   └── __init__.py
│   ├── tests/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── alembic/              # (Optional) DB migrations
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/         # API service functions (e.g., Axios)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .env                     # Root-level environment variables
├── .gitignore
├── docker-compose.yml       # Orchestrates backend + frontend
└── README.md

# Installations:
    pip3 install "fastapi[standard]"
    