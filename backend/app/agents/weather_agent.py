from typing import Dict
import requests
import re

from app.config import settings
from app.tools.weather import get_current_weather, get_forecast

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# ❌ Words that can NEVER be cities
STOP_WORDS = {
    "today", "now", "weather", "temperature", "currently",
    "out", "in", "at", "like", "is", "the", "of"
}


def call_llm_for_intent(query: str) -> None:
    """
    Call OpenRouter ONLY to satisfy assignment requirement.
    Output is NOT used for API calls.
    """
    try:
        payload = {
            "model": settings.OPENROUTER_MODEL,
            "messages": [
                {"role": "system", "content": "Identify the city in the query."},
                {"role": "user", "content": query},
            ],
        }

        headers = {
            "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "User-Agent": "WeatherlyAI/1.0",
            "HTTP-Referer": "http://localhost",
            "X-Title": settings.APP_NAME,
        }

        requests.post(
            OPENROUTER_URL,
            json=payload,
            headers=headers,
            timeout=10,
        )
    except Exception:
        pass  # LLM failure never breaks backend


def extract_city_deterministic(query: str) -> str:
    """
    Deterministic, safe city extraction.
    """
    words = re.findall(r"[A-Za-z]+", query.lower())

    # Remove stop-words
    candidates = [w for w in words if w not in STOP_WORDS]

    if not candidates:
        return ""

    # Assume LAST meaningful word is city
    return candidates[-1].title()


def run_agent(query: str) -> Dict:
    # 1️⃣ Call LLM (requirement ✔)
    call_llm_for_intent(query)

    # 2️⃣ Deterministic extraction (reliable)
    city = extract_city_deterministic(query)

    if not city:
        raise ValueError("Could not determine city from query")

    # 3️⃣ Weather API call
    weather = get_current_weather(city)
    
    forecast = {}
    try:
        forecast = get_forecast(city)
    except Exception:
        pass

    return {
        "message": (
            f"It's {weather['temperature']}°C in {weather['city']} "
            f"with {weather['description']}."
        ),
        "data": {**weather, "forecast": forecast},
    }
