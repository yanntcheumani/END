from sqlalchemy import Column, Integer, String, ForeignKey, Table, UUID
from sqlalchemy.orm import relationship
import uuid

from db.base import Base

blog_tag = Table(
    'blog_tag',
    Base.metadata,
    Column('blog_id', Integer, ForeignKey('blogs.id')),
    Column('tags_id', Integer, ForeignKey('tags.id'))
)


class Tag(Base):
    """

    """
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True)
    uuid = Column(UUID(as_uuid=True), default=uuid.uuid4)
    color = Column(String(255))
    description = Column(String(255), default="")

    blogs = relationship("Blog", secondary=blog_tag, back_populates="tags")

    def __repr__(self):
        return f"Tag<id: {self.id}, name:{self.name}, uuid: {self.uuid}"
