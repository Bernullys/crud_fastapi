from pydantic import BaseModel

# Pydantic BaseModel for the token response
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Pydantic BaseModel for the token data
class TokenData(BaseModel):
    username: str | None = None