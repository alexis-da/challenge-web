from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from sqlmodel import SQLModel
from db import engine
from routers.users import router as users_router
from routers.posts import router as posts_router
from routers.categories import router as categories_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Créer les tables au démarrage
    SQLModel.metadata.create_all(engine)
    yield

app = FastAPI(lifespan=lifespan)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Origines autorisées
    allow_credentials=True,
    allow_methods=["*"],  # Méthodes autorisées
    allow_headers=["*"],  # En-têtes autorisés
)

app.include_router(users_router)
app.include_router(posts_router)
app.include_router(categories_router)
