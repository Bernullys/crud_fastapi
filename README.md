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

Remember do: pip freeze > requirements.txt
Also on every other pc I want to work, I have to create a virtual enviroment.
    python3 -m venv venv
    go into the enviroment and then
    pip install -r requirements.txt

    pip3 install "fastapi[standard]"
    pip install sqlalchemy
    pip install pymysql
    pip install alembic
    pip install python-dotenv
    pip install cryptography
    pip install passlib
    pip install pyjwt
    pip install python-jose


# I'm going to make migrations with alembic
Is used to keep our database in sync with our code. Is great to manage SQL schemas with sqlalchemy
First step:
    alembic init alembic    This creates a folder alembic/ and alembic.ini | The second alembic is the name of the folder (we can change it).
Second step:
    Inside alembic.ini file, search for sqlalchemy.url = driver://user:pass@localhost/db and replace it with sqlalchemy.url = mysql+pymysql://username:password@localhost:3306/dbname
Third step:
    Inside env.py (inside alembic/versions/) find and update target_metadata = Base.metadata | And also have to import Base and the models I have.
Fourd step:
    Create the first migration with alembic revision --autogenerate -m "message"
    This will generate a file inside /alembic/versions where have the message and the description.
Fiveth step:
    Execute the migration with: alembic upgrade head
    But I have an syntax error on my model so the upgrade head didn't run.
    I had to delete the file that was created on 4th step and do 4th step again. Then I could run this step.


Summary of Alembic Commands:

| Step                    | Command                                        |
| ----------------------- | ---------------------------------------------- |
| Initialize Alembic      | `alembic init alembic`                         |
| Create new migration    | `alembic revision --autogenerate -m "message"` |
| Apply migrations        | `alembic upgrade head`                         |
| Check migration history | `alembic history`                              |
| Rollback one migration  | `alembic downgrade -1`                         |
| To bring back a rollback| `alembic upgrade head`                         |


How goes the structure:
To work propertly I have to run: uvicorn app.main:app --reload

backend/
│
├── app/
│   ├── routers/              # FastAPI routes
│   ├── db/
│   │   ├── base.py           # SQLAlchemy base
│   │   ├── session.py        # DB session (engine, SessionLocal)
│   │   └── init_db.py        # Optional: create fake data
│   ├── models/
│   │   └── user.py           # SQLAlchemy models
|   |-- core/
|   |--utils/
│   ├── schemas/              # Pydantic models
│   ├── main.py               # FastAPI app
|   └── .env                  # DB credentials (This file has to be in the same folder of the main file)
|   |__ __init__.py
│
|
├── alembic/                  # Alembic migrations
├── alembic.ini               # Alembic config
├── requirements.txt

Always make absolute imports.
Always create __init__.py file inside the directories wich I'm using as modules.

# How work mysql database:
When you run with uvicorn, your FastAPI app:
Loads the DB URL from .env
Creates a SQLAlchemy engine using SessionLocal (in session.py)
Your API routes use Depends(get_db) to get a DB session
You query or update the database using SQLAlchemy inside each route
✅ So FastAPI connects to MySQL automatically using the engine/session when you call your API.

To bring mysql database from one pc to another I have to:
    Original pc: mysqldump -u username -p db_name > backup.sql
    New pc: mysql - username -p db_name < backup.sql