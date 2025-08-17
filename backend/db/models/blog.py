from sqlalchemy import Column, Integer, String, UUID, Boolean, DateTime, Text, ForeignKey
import uuid
from sqlalchemy.orm import relationship

from db.base import Base
from db.models.tag import blog_tag


class Blog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    uuid = Column(UUID(as_uuid=True), default=uuid.uuid4)
    title = Column(String(255), nullable=False, unique=True)
    description = Column(String(255), nullable=False)

    read_time = Column(Integer, nullable=False, default=0)
    video_pathname = Column(String(255), nullable=True)
    picture_preview_pathname = Column(String(255), nullable=False)

    text = Column(Text, default="", nullable=False)
    author_id = Column(Integer(), ForeignKey('users.id'))
    author = relationship("User", back_populates="blogs")
    is_public = Column(Boolean, default=False)
    
    tags = relationship("Tag", secondary=blog_tag, back_populates="blogs")
    
    def __repr__(self):
        return f"<Blog(id: {self.id}, uuid: {self.uuid}, title: {self.title}, \
        description: {self.description}, read_time: {self.read_time}, video_url: {self.video_url}, picture_preview_url: {self.picture_preview_url}) \
        tags: [{self.get_all_tags()}]"

    def get_all_tags(self):
        return [tag.name for tag in self.tags]
