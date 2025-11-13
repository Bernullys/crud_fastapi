from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.users import router as users_router
from app.routers.products import router as products_router
from app.routers.auth import router as auth_router


origins = [
    "http://127.0.0.1:5173"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(users_router)
app.include_router(products_router)
app.include_router(auth_router)



my_fake_db = {
    "bike1": "Specialized",
    "bike2": "Trek",
    "bike3": "Konna"
}

@app.get("/")
def inicialize():
    return {
        "Hello": "Bernardo"
    }

@app.get("/bikes/{all}")
def get_all_bikes(all):
    return my_fake_db

@app.get("/bikes/")
def get_bikes(bike):
    for b in my_fake_db.keys():
        if b == bike:
            return my_fake_db[b]
        
@app.post("/new_bike/")
def create_bike(new_bike, bike_model):
    my_fake_db[new_bike] = bike_model
    return my_fake_db

@app.put("/bikes_update/")
def update_bike(bike_to_update, new_bike_model):
    for b in my_fake_db.keys():
        if bike_to_update == b:
            my_fake_db[b] = new_bike_model
            return {"Message": "Bike successfully updated", "Bikes": my_fake_db}
    return {"Message":"That bike is not in here", "Bikes": my_fake_db}


@app.delete("/delete_bike/")
def delete_bike(bike_to_delete):
    for b in my_fake_db.keys():
        if bike_to_delete == b:
            my_fake_db.pop(bike_to_delete)
            return {"Message": "Bike successfully deleted", "Bikes": my_fake_db}
    return {"Message":"That bike is not in here", "Bikes": my_fake_db}