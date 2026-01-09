from sqlmodel import Session, create_engine

DATABASE_URL = "postgresql+psycopg2://app_user:app_password@localhost:5432/app_db"

engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session

