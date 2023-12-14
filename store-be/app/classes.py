from pydantic import BaseModel, Field
from pydantic_core import core_schema
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
    def __get_pydantic_core_schema__(
        cls, _source_type: Any, _handler: Any
    ) -> core_schema.CoreSchema:
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema(
                [
                    core_schema.is_instance_schema(ObjectId),
                    core_schema.chain_schema(
                        [
                            core_schema.str_schema(),
                            core_schema.no_info_plain_validator_function(cls.validate),
                        ]
                    ),
                ]
            ),
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda x: str(x)
            ),
        )


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
        exclude = ["name"]
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
    database = os.getenv("MAIN_DB", "vshop")
    connection_string = os.getenv("CONNECTION_STR", "mongodb://localhost:27017/")
    tls = bool(os.environ.get("MONGOTLS", False))
    pem_file = os.environ.get("MONGOPEM", None)
    auth_mechanism = os.environ.get("MONGOAM", "MONGODB-X509")

    def __init__(self) -> None:
        super(MyDB, self).__init__(
            self.connection_string,
            tls=self.tls,
            tlsCertificateKeyFile=self.pem_file,
            authMechanism=self.auth_mechanism,
        )

    def __call__(
        self, collection: str, *args: Any, **kwargs: Any
    ) -> AsyncIOMotorCollection:
        return self[self.database][collection]
