from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import relationship

from .database import Base

class Shipper():
    __tablename__ = "shippers"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Carrier():
    __tablename__ = "carriers"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Consignee():
    __tablename__ = "consignees"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Contract(Base):
    __tablename__ = "contracts"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    shipper = relationship("Shipper")
    carrier = relationship("Carrier")
    goods = relationship("Goods", )
    third_party_carriers = relationship("Carrier")

    items = relationship("Item", back_populates="owner")

class Goods(Base):
    __tablename__ = "goods"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")

class Route(Base):
    __tablename__ = 'maps'

    from_location = Column(JSON)
    to_location = Column


# A contract contains checkpoints, a checkpoint is where a package is
    # a. handed over to checkpoint
    # b. a check procedure happens
    # c. handed to the same logistics agent or a different one
# Client will be able to verify checking procedure if package is damaged, tempered with, underweight etc.
