from fastapi import FastAPI


from api.v1.router import api_v1
from core.config import settings
from db.session import engine
from db.base import Base
from db.session import SessionLocal
from crud.role import EnumRole, get_role, create_role

app = FastAPI(title=settings.PROJECT_NAME)

Base.metadata.create_all(bind=engine)

app.include_router(api_v1, prefix="/api/v1")



def initRole():
    database = SessionLocal()

    for role in EnumRole:
        print("voici la value de ", role, ": ", role.value)
        db_role = get_role(database, role)

        if db_role:
            print("le role exist \n")
            continue
        create_role(database, role)
        print("role créé")
    database.close()

@app.get("/")
async def root():
    return {"message": "Welcome to END API !"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

initRole()
