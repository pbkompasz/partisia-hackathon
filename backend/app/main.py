from fastapi import FastAPI, Depends, HTTPException

from sqlalchemy.orm import Session

from . import models
from . import crud
from . import schemas

from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/")
async def root():
  return {"message": "Hello World"}

@app.get("/route/{route_id}")
async def route(route_id):
  return {"message": f"route: {route_id}"}

@app.api_route("/{generic}")
async def last(generic):
  return {"message": f"{generic}"}


