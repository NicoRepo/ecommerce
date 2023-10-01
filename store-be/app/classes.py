from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCollection
from typing import Any, List, Optional, Required
from bson import ObjectId
import os

class OID(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, *args, **kwargs):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")

class Product(BaseModel):
    id: OID = Field(default_factory=OID, alias="_id")
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    stock: Optional[int] = None
    img: Optional[str] = None
    category: OID = Field(default_factory=OID)
    artist: Optional[str] = None
    tracklist: Optional[List[str]] = None
    
    class Config:
        exclude = ['name']
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ProductInOrder(Product):
    qty: int

class Category(BaseModel):
    id: OID = Field(default_factory=OID, alias="_id")
    name: str

    class Config:
        json_encoders = {ObjectId: str}

class Order(BaseModel):
    id: OID = Field(default_factory=OID, alias="_id")
    email: Optional[str] = None
    address: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    region: Optional[str] = None
    comuna: Optional[str] = None
    cellPhone: Optional[str] = None
    RUT: Optional[str] = None
    orderDetail: Optional[list[ProductInOrder]] = []

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class CreateOrder(BaseModel):
    email: str
    emailConfirm: str
    address: str
    firstName: str
    lastName: str
    region: str
    comuna: str
    cellPhone: str
    RUT: str
    productIds: dict[str, int]

    def createOrder(self, orderDetail: list[dict[str, Any]]) -> dict:
        tmp = self.model_dump(exclude=["productIds"])
        tmp.update({"orderDetail": orderDetail})
        return tmp

class CreatedOrder(BaseModel):
    orderId: OID = Field(default_factory=OID, alias="orderId")

    class Config:
        json_encoders = {ObjectId: str}


class MyDB(AsyncIOMotorClient):
    database = os.getenv("MAIN_DB", 'vshop')
    connection_string = os.getenv("CONNECTION_STR", 'mongodb://localhost:27017/')

    def __init__(self) -> None:
        super(MyDB, self).__init__(self.connection_string)
    
    def __call__(self, collection: str, *args: Any, **kwargs: Any) -> AsyncIOMotorCollection:
        return self[self.database][collection]