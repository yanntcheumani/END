import enum
from typing import Union
from db.models.role import Role

class EnumRole(enum.Enum):
    USER = "users"
    BLOG = "blogger"
    ADMIN = "admin"


def get_role(db, role_in: EnumRole):
    return db.query(Role).filter(Role.name == role_in.value).first()

def create_role(db, role_in: EnumRole):
    
    roleExist = get_role(db, role_in)

    if roleExist:
        return roleExist
    
    role = Role(name=role_in.value, description="")

    db.add(role)
    db.commit()
    db.refresh(role)
    return role



