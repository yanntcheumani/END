FROM python:3.12

WORKDIR /app

# Copier d'abord requirements.txt pour optimiser le cache Docker
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le fichier .env
COPY .env .

# Copier le reste du code (sera écrasé par le volume en développement)
COPY . .

# Commande avec rechargement automatique
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
