from pymongo.command_cursor import CommandCursor
from pymongo.results import InsertOneResult
from pymongo.cursor import Cursor
from bson import ObjectId
from datetime import datetime
import json


def to_json(data: any):
  json.dumps(data, default=custom_serializer)

def custom_serializer(x):
  if isinstance(x, CommandCursor):
    rtv = [custom_serializer(v) for v in x]
  elif isinstance(x, InsertOneResult):
    rtv = {'_id': str(x.inserted_id)}
  elif isinstance(x, Cursor):
    print("XD")
    rtv = [custom_serializer(v) for v in x]
  elif isinstance(x, datetime):
    rtv = x.isoformat()
  elif isinstance(x, ObjectId):
    rtv = str(x)
  elif hasattr(x, '__str__'):
    rtv = str(x)
  else:
    raise TypeError(x)
  return rtv