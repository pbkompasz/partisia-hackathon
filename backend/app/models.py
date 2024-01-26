from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import relationship

from .database import Base

# class Manufacturer():
#     __tablename__ = "manufacturers"
#     id = Column(Integer, primary_key=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)

#     user = relationship("User")

# class Carrier():
#     __tablename__ = "carriers"
#     id = Column(Integer, primary_key=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)

#     owner = relationship("User")
#     # one to many
#     users = relationship("User")


# class Client():
#     __tablename__ = "clients"
#     id = Column(Integer, primary_key=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)

# class Contract(Base):
#     __tablename__ = "contracts"

#     id = Column(Integer, primary_key=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)
#     is_active = Column(Boolean, default=True)
#     shipper = relationship("Shipper")
#     carrier = relationship("Carrier")
#     goods = relationship("Goods", )
#     third_party_carriers = relationship("Carrier")

#     items = relationship("Item", back_populates="owner")

# class Goods(Base):
#     __tablename__ = "goodss"

#     id = Column(Integer, primary_key=True)
#     title = Column(String, index=True)
#     description = Column(String, index=True)
#     owner_id = Column(Integer, ForeignKey("users.id"))

#     owner = relationship("User", back_populates="items")

# class Route(Base):
#     __tablename__ = "maps"

#     from_location = Column(JSON)
#     to_location = Column

# class RoadEvent(Base):
#     __tablename__ = "road_events"

#     coord_x = Column(String)
#     coord_y = Column(String)
#     duration_min = Column(Boolean)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    first_name = Column(String, unique=False, index=True)
    last_name = Column(String, unique=False, index=True)
    chain_token = Column(String, unique=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    role = Column(String)

# A contract contains checkpoints, a checkpoint is where a package is
    # a. handed over to checkpoint
    # b. a check procedure happens
    # c. handed to the same logistics agent or a different one
# Client will be able to verify checking procedure if package is damaged, tempered with, underweight etc.
