from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

from core.logger import get_logger


logger = get_logger("middleware")
 

class CORSMiddleware(BaseHTTPMiddleware):
    """Middleware CORS personnalisé avec logging"""
    
    async def dispatch(self, request: Request, call_next):
        # Log des requêtes CORS
        if request.method == "OPTIONS":
            logger.info(f"🔄 REQUÊTE CORS OPTIONS: {request.url}")
            logger.info(f"   Origin: {request.headers.get('origin', 'Unknown')}")
            logger.info(f"   Access-Control-Request-Method: {request.headers.get('access-control-request-method', 'Unknown')}")
            logger.info(f"   Access-Control-Request-Headers: {request.headers.get('access-control-request-headers', 'Unknown')}")
        
        response = await call_next(request)
        
        # Ajouter les headers CORS
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        
        return response
