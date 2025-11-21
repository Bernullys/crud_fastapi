from pydantic import BaseModel, EmailStr

# Base:
class AppUserBase(BaseModel):
    name: str
    email: EmailStr
    user_name: str

# Create an app user (post):
class AppUserCreate(AppUserBase):
    password: str   # Recives the password as plain text from client.

# Response to client:
class AppUserResponse(AppUserBase):
    id: int

    class Config:
        orm_mode = True

'''
| Clase                 | Propósito                                                                | Por qué existe                                                                      |
| --------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| **`AppUserBase`**     | Define los campos comunes (nombre, email, usuario)                       | Evita repetir código en los otros schemas                                           |
| **`AppUserCreate`**   | Se usa para validar los datos cuando un usuario se registra              | El cliente envía `password`, **no** `hashed_password`                               |
| **`AppUserResponse`** | Se usa para devolver datos al cliente (GET, POST)                        | No se devuelve la contraseña por seguridad, solo `id`, `name`, `email`, `user_name` |
| **`orm_mode = True`** | Permite convertir directamente un objeto SQLAlchemy a un schema Pydantic | Necesario para que FastAPI lea los modelos como diccionarios                        |

💡 Explicación clara
Clase	Propósito	Por qué existe
AppUserBase	Define los campos comunes (nombre, email, usuario)	Evita repetir código en los otros schemas
AppUserCreate	Se usa para validar los datos cuando un usuario se registra	El cliente envía password
AppUserResponse	Se usa para devolver datos al cliente (GET, POST)	No se devuelve la contraseña por seguridad, solo id, name, email, user_name
orm_mode = True	Permite convertir directamente un objeto SQLAlchemy a un schema Pydantic	Necesario para que FastAPI lea los modelos como diccionarios
'''
