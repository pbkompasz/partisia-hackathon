from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
  return {"message": "Hello World"}

@app.get("/route/{route_id}")
async def route(route_id):
  return {"message": f"route: {route_id}"}

@app.api_route("/{generic}")
async def last(generic):
  return {"message": f"{generic}"}


