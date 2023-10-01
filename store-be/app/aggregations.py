from bson import ObjectId


def to_oid(id: str) -> ObjectId:
    rtv = ObjectId(id) if ObjectId.is_valid(id) else None
    return rtv


def parse_categories(categories: str) -> list[ObjectId]:
    splitted_cats = categories.split(",")
    oid_cats = [to_oid(id) for id in splitted_cats if to_oid(id)]
    return oid_cats


def generate_product_query(categories: str = None):
    filt = {} if not categories else {"category": {"$in": parse_categories(categories)}}
    query = [
        {"$match": filt},
        {
            "$lookup": {
                "from": "categories",
                "localField": "category",
                "foreignField": "_id",
                "as": "category2",
            }
        },
        # {"$unwind": "$category2"},
        # {
        #     "$project": {
        #         "img": 1,
        #         "name": 1,
        #         "description": 1,
        #         "artist": 1,
        #         "price": 1,
        #         "tracklist": 1,
        #         "category": 1,
        #         "stock": 1,
        #         "category": "$category2.category",
        #     }
        # }
    ]
    return query
