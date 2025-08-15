from sqlalchemy import Column, Integer, String, ForeignKey, Table, UUID
from sqlalchemy.orm import relationship
import uuid

from db.base import Base

# blog_taf = Table(
#     'blog_tag',
#     Base.metadata,
#     Column('blog_id', Integer, ForeignKey('users.id')),
#     Column('blog_id', Integer, ForeignKey('roles.id'))
# )


class Tag(Base):
    """

    """
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    uuid = Column(UUID(as_uuid=True), default=uuid.uuid4)

    #users = relationship("User", secondary=user_roles, back_populates="roles")

    def __repr__(self):
        return f"Tag<id: {self.id}, name:{self.name}, uuid: {self.uuid}"
