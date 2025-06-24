from sqlalchemy.orm import declarative_base

Base = declarative_base()


'''
Notes:
This is used to set up SQLAlchemy ORM (Object-Relational Mapping) models in Python.

| Code                        | Purpose                         |
| --------------------------- | ------------------------------- |
| `declarative_base()`        | Sets up the foundation for ORM  |
| `Base = declarative_base()` | You inherit from this in models |
| `class Model(Base)`         | Maps to a database table        |
'''

