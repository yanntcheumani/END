from fastapi.responses import JSONResponse
from core.logger import get_logger
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
import time

logger = get_logger("middleware")


class LoggingMiddleware(BaseHTTPMiddleware):
    """Middleware pour logger toutes les requêtes et réponses"""

    async def dispatch(self, request: Request, call_next):
        # Timestamp de début
        start_time = time.time()
        
        # Log de la requête entrante
        logger.info(f"🚀 REQUÊTE ENTRANTE: {request.method} {request.url}")
        logger.info(f"   Headers: {dict(request.headers)}")
        logger.info(f"   Client: {request.client.host if request.client else 'Unknown'}")
        
        # Capturer le body de la requête si c'est un POST/PUT
        if request.method in ["POST", "PUT", "PATCH"]:
            try:
                body = await request.body()
                if body:
                    logger.info(f"   Body: {body.decode()}")
            except Exception as e:
                logger.warning(f"   Erreur lecture body: {e}")
        
        try:
            # Traiter la requête
            response = await call_next(request)
            
            # Calculer le temps de traitement
            process_time = time.time() - start_time
            
            # Log de la réponse
            logger.info(f"✅ RÉPONSE: {response.status_code} - {process_time:.3f}s")
            
            # Ajouter le temps de traitement dans les headers
            response.headers["X-Process-Time"] = str(process_time)
            
            return response
            
        except Exception as e:
            # Log des erreurs
            process_time = time.time() - start_time
            logger.error(f"❌ ERREUR: {e} - {process_time:.3f}s")
            logger.error(f"   URL: {request.method} {request.url}")
            logger.error(f"   Headers: {dict(request.headers)}")
            
            # Retourner une réponse d'erreur
            return JSONResponse(
                status_code=500,
                content={
                    "error": "Erreur interne du serveur",
                    "detail": str(e),
                    "process_time": process_time
                }
            )
