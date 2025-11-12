from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()
MYSQL_URL = os.getenv("DATABASE_URL") 

engine = create_engine(MYSQL_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Now I'm going to create a connection with my database using this function to use as a dependency in my path operation function

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


'''
Notes:
This code sets up the SQLAlchemy engine and session so your app can connect to and interact with a MySQL database (or any supported SQL database).
Line by line:
from sqlalchemy import create_engine ---- Imports the function to create a connection to the database.
from sqlalchemy.orm import sessionmaker - Imports sessionmaker, which is a factory for creating SQLAlchemy Session objects. You use these to query and write to the database.
import os ------------------------------- Used to access environment variables, which is a good practice for storing sensitive info like database URLs.
MYSQL_URL = os.getenv("DATABASE_URL") --- Gets the database connection URL from the environment variable DATABASE_URL.
Example format: mysql+pymysql://username:password@localhost/dbname
engine = create_engine(MYSQL_URL) ------- Creates the engine, which manages the connection pool to the database.
This is the core interface between SQLAlchemy and your DB.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) -- Creates a custom Session class called SessionLocal that:
    does not auto-commit transactions (autocommit=False)
    does not auto-flush pending changes to the DB (autoflush=False)
    is bound to your engine, so it knows which DB to connect to

Sumary Table
| Code                               | Purpose                                 |
| ---------------------------------- | --------------------------------------- |
| `create_engine()`                  | Connect to the DB                       |
| `sessionmaker()`                   | Factory for DB sessions                 |
| `SessionLocal = sessionmaker(...)` | Custom session class with DB connection |
| `os.getenv("DATABASE_URL")`        | Securely load DB connection string      |

'''