from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from app.classes import Order, MyDB, CreateOrder, CreatedOrder
from app.aggregations import to_oid
from app.exceptions import NotFound

router = APIRouter()
db = MyDB()

# @router.get("/orders", response_model=list[Order], response_model_exclude_none=True)
# async def get_products(categories: str = None):
#     rtv = []
#     try:
#         rtv = await db("products").aggregate(
#             generate_product_query(categories=categories)).to_list(None)
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))
#     return rtv

@router.post("/create", response_model=CreatedOrder)
async def create_order(order: CreateOrder):
    rtv = {}
    try:
        ordered_products: list[dict] = await db("products").find({"_id": {"$in": [to_oid(id) for id in order.productIds.keys()]}}).to_list(None)
        for p in ordered_products:
            p.update({"qty": order.productIds.get(str(p.get("_id")), None)})
        print(ordered_products)
        full_order = order.createOrder(orderDetail=ordered_products)
        insert_result = await db("orders").insert_one(full_order)
        if not insert_result.inserted_id:
            raise Exception("Order was not inserted")
        rtv.update({"orderId": insert_result.inserted_id})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return rtv

@router.get("/get/{orderId}", response_model=Order, response_model_exclude_none=True)
async def get_order(orderId: str = None):
    try:
        rtv = await db("orders").find_one({"_id": to_oid(orderId)})
        if not rtv: raise NotFound(detail="Order not found")
    except NotFound as e: raise e
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return rtv