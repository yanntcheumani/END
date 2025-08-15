from sqlalchemy import Column, Integer, String, UUID, Boolean, DateTime
import uuid
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func

from db.base import Base
from db.models.role import user_roles


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    uuid = Column(UUID(as_uuid=True), default=uuid.uuid4)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    username = Column(String(255), unique=True, index=True, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())

    roles = relationship("Role", secondary=user_roles, back_populates="users")

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, username={self.username})>"
    
    def get_roles_to_list(self):
        return [role.name for role in self.roles]
