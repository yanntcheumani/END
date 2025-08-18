from fastapi import FastAPI, Request
from core.middleware.LoggerMiddleware import LoggingMiddleware
from fastapi.middleware.cors import CORSMiddleware
from core.logger import setup_logging, get_logger

from api.v1.router import api_v1
from core.config import settings
from db.session import engine
from db.base import Base
from db.session import SessionLocal
from crud.role import EnumRole, get_role, create_role

logger = setup_logging()


try:
    Base.metadata.create_all(bind=engine)
    logger.info("Tables de base de données créées avec succès")
except Exception as e:
    logger.error(f"❌ Erreur lors de la création des tables: {e}")

app = FastAPI(title=settings.PROJECT_NAME)


app.include_router(api_v1, prefix="/api/v1")

app.add_middleware(LoggingMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def initRole():
    logger.info("Création des Rôles pendant le lancement du server")
    database = SessionLocal()

    for role in EnumRole:
        db_role = get_role(database, role)

        if db_role:
            logger.info("Le rôle est déjà créé")
            continue
        create_role(database, role)
    logger.info("La création de rôles est fini")

    database.close()

@app.get("/")
async def root():
    return {"message": "Welcome to END API !"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Gestionnaire global d'exceptions avec logging"""
    logger.error(f"❌ EXCEPTION GLOBALE: {exc}")
    logger.error(f"   URL: {request.method} {request.url}")
    logger.error(f"   Headers: {dict(request.headers)}")

    return {
        "error": "Erreur interne du serveur",
        "detail": str(exc),
        "type": type(exc).__name__
    }

initRole()
