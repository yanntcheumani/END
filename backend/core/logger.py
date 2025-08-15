import logging
import sys
from pathlib import Path

def setup_logging():
    """Configuration complète du logging pour diagnostiquer les problèmes"""
    
    # Créer le dossier logs s'il n'existe pas
    log_dir = Path("logs")
    log_dir.mkdir(exist_ok=True)
    
    # Configuration du format de log
    log_format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    date_format = "%Y-%m-%d %H:%M:%S"
    
    # Configuration du logger principal
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)
    
    # Supprimer les handlers existants
    for handler in logger.handlers[:]:
        logger.removeHandler(handler)
    
    # Handler pour la console (niveau INFO)
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    console_formatter = logging.Formatter(log_format, date_format)
    console_handler.setFormatter(console_formatter)
    logger.addHandler(console_handler)
    
    # Handler pour les erreurs (niveau ERROR)
    error_handler = logging.FileHandler(log_dir / "error.log")
    error_handler.setLevel(logging.ERROR)
    error_formatter = logging.Formatter(log_format, date_format)
    error_handler.setFormatter(error_formatter)
    logger.addHandler(error_handler)
    
    # Handler pour tous les logs (niveau DEBUG)
    debug_handler = logging.FileHandler(log_dir / "debug.log")
    debug_handler.setLevel(logging.DEBUG)
    debug_formatter = logging.Formatter(log_format, date_format)
    debug_handler.setFormatter(debug_formatter)
    logger.addHandler(debug_handler)
    
    # Handler pour les requêtes HTTP (niveau INFO)
    access_handler = logging.FileHandler(log_dir / "access.log")
    access_handler.setLevel(logging.INFO)
    access_formatter = logging.Formatter(log_format, date_format)
    access_handler.setFormatter(access_formatter)
    logger.addHandler(access_handler)
    
    # Configuration des loggers spécifiques
    loggers_to_configure = [
        "uvicorn",
        "uvicorn.error",
        "uvicorn.access",
        "fastapi",
        "sqlalchemy.engine",
        "sqlalchemy.pool",
        "sqlalchemy.dialects",
        "sqlalchemy.orm",
        "app",
        "app.api",
        "app.core",
        "app.crud",
        "app.models"
    ]
    
    for logger_name in loggers_to_configure:
        specific_logger = logging.getLogger(logger_name)
        specific_logger.setLevel(logging.DEBUG)
        specific_logger.handlers = []  # Supprimer les handlers par défaut
        specific_logger.propagate = True  # Propager vers le logger parent
    
    return logger

def get_logger(name: str = None):
    """Obtenir un logger configuré"""
    if name:
        return logging.getLogger(__name__)
    return logging.getLogger(__name__)

# Configuration initiale
main_logger = setup_logging() 