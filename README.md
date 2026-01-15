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
    But that is not safe. Instead:
        Inside alembic.ini let sqlalchemy.url =
        Then create app/core/config.py the way of charge from .env
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
│   │   └── user.py           # SQLAlchemy models (tables of my db)
|   |-- core/                 # Files where are the core functions of the app
|   |--utils/                 # Here I can make files with helper functions
│   ├── schemas/              # Pydantic models to validate data
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

# How my backend works:
This project works as follows:

Database Model:
I create a model using SQLAlchemy. This model represents a table inside my already-created database.

Data Validation with Pydantic Schemas:
Using FastAPI, I validate all incoming data through Pydantic schemas.
For each model, I define:
A base schema (shared fields)
A response schema (what I return to the frontend)
Additional schemas for each CRUD operation, depending on their requirements
(e.g., create, update, search)
If authentication is needed, I also define an authentication schema.

Routes (Endpoints):
In each route, I define:
The path (URL)
The HTTP method
The response_model, which determines what the frontend receives.

Path Function Logic:
Inside each path function, I describe the parameters I need, including:
The database session (provided via dependency injection)
The schema received from the frontend for that operation
Any additional parameters (e.g., path or query parameters)

The function then performs the required logic (CRUD operation, authentication, etc.) and returns data according to the selected response_model.

# Resume to fetch HTTP methods in frontend:
Below is a concise, practical reference for how fetch() should be configured for each HTTP method, aligned with REST and FastAPI usage.

General fetch() structure
fetch(url, {
  method: "METHOD",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data) // only when needed
})

GET — Read data
Rules
❌ No body
✅ Use query parameters
Headers usually optional
fetch("/meters/?id=1&name=Main", {
  method: "GET"
})
FastAPI
@router.get("/meters/")

POST — Create resource
Rules
✅ body required
✅ Content-Type: application/json
❌ No query params for data
fetch("/meters/add/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Meter 1",
    type: "cem6"
  })
})
FastAPI
@router.post("/meters/add/")

PATCH — Partial update
Rules
✅ body with only changed fields
✅ Path param or query param to identify resource
fetch("/meters/patch/Lavanderia", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Lavanderia 2"
  })
})
FastAPI
@router.patch("/meters/patch/{meter_name}")

PUT — Full update (replace)
Rules
✅ body with all fields
❗ Replaces the resource completely
fetch("/meters/put/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Meter 1",
    type: "cem6"
  })
})
FastAPI
@router.put("/meters/put/{id}")

DELETE — Remove resource
Rules
❌ No body (recommended)
✅ Identify resource via path or query
fetch("/meters/delete/Lavanderia", {
  method: "DELETE"
})
FastAPI
@router.delete("/meters/delete/{meter_name}")

Summary table
Method        Purpose        Body        Params location
GET            Read	        ❌            Query / Path
POST	       Create	    ✅	            Body
PATCH	     Partial update	✅	            Body + Path
PUT          Full update	✅	            Body + Path
DELETE	     Delete	        ❌	            Path / Query

Golden rules (important)
GET never has body
PATCH sends only changed fields
DELETE identifies, does not send data
Path params identify the resource
Body modifies the resource
