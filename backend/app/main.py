from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def inicialize():
    return {
        "hello": "Bernardo"
    }