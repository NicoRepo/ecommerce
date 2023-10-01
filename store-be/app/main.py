from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException
from fastapi.responses import JSONResponse
from app.classes import MyDB, Product, Category
from app.aggregations import generate_product_query, to_oid
from app.exceptions import NotFound
from app.routers import orders

app = FastAPI()
db = MyDB()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(orders.router, prefix="/orders")

@app.exception_handler(NotFound)
async def unicorn_exception_handler(request: Request, exc: NotFound):
    return JSONResponse(
        status_code=404,
        content={"message": exc.detail, "search": request.path_params},
    )

@app.get("/")
async def root():
    return {"STATUS": "OK"}

@app.get("/products", response_model=list[Product], response_model_exclude_none=True)
async def get_products(categories: str = None):
    rtv = []
    try:
        rtv = await db("products").aggregate(
            generate_product_query(categories=categories)).to_list(None)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return rtv

@app.get("/product/{productId}", response_model=Product, response_model_exclude_none=True)
async def get_product(productId: str = None):
    try:
        rtv = await db("products").find_one({"_id": to_oid(productId)})
        if not rtv: raise NotFound(detail="Product not found")
    except NotFound as e: raise e
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return rtv

@app.get("/categories", response_model=list[Category])
async def get_categories():
    rtv = []
    try:
        rtv = await db("categories").find({}).to_list(None)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error al procesar la solicitud")
    return rtv
