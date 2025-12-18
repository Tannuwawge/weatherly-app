# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel
# import traceback

# from app.agents.weather_agent import run_agent
# from app.config import settings

# router = APIRouter(prefix="/api", tags=["query"])


# class QueryRequest(BaseModel):
#     query: str


# @router.post("/query")
# def handle_query(req: QueryRequest):
#     if not settings.OPENROUTER_API_KEY or not settings.OPENWEATHER_API_KEY:
#         raise HTTPException(status_code=500, detail="Server not configured")

#     try:
#         result = run_agent(req.query)
#         return {
#             "success": True,
#             "message": result["message"],
#             "data": result["data"],
#         }

#     except Exception as e:
#         traceback.print_exc()
#         raise HTTPException(status_code=500, detail=str(e))


# @router.get("/health")
# def health():
#     return {"status": "ok"}
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.agents.weather_agent import run_agent
from app.config import settings

router = APIRouter(prefix="/api", tags=["query"])


class QueryRequest(BaseModel):
    query: str


@router.post("/query")
def handle_query(req: QueryRequest):
    missing = []
    if not settings.OPENROUTER_API_KEY:
        missing.append("OPENROUTER_API_KEY")
    if not settings.OPENWEATHER_API_KEY:
        missing.append("OPENWEATHER_API_KEY")

    if missing:
        raise HTTPException(
            status_code=500,
            detail=f"Server not configured: {', '.join(missing)}",
        )

    try:
        result = run_agent(req.query)
        return {
            "success": True,
            "message": result["message"],
            "data": result["data"],
        }
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))


@router.get("/health")
def health():
    return {"status": "ok"}
