from typing import Dict
import os
import requests

OPENWEATHER_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather"
FORECAST_ENDPOINT = "https://api.openweathermap.org/data/2.5/forecast"


def get_current_weather(city: str) -> Dict[str, object]:
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise RuntimeError("Missing OPENWEATHER_API_KEY")

    params = {
        "q": city,
        "appid": api_key,
        "units": "metric",
    }

    resp = requests.get(OPENWEATHER_ENDPOINT, params=params, timeout=12)
    resp.raise_for_status()
    data = resp.json()

    main = data.get("main", {})
    wind = data.get("wind", {})
    weather = data.get("weather", [{}])[0]

    return {
        "city": data.get("name", city),
        "temperature": main.get("temp"),
        "feels_like": main.get("feels_like"),
        "humidity": main.get("humidity"),
        "wind_kmh": round(float(wind.get("speed", 0)) * 3.6, 1),
        "description": weather.get("description"),
        "icon": weather.get("icon"),
    }


def get_forecast(city: str) -> Dict[str, object]:
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise RuntimeError("Missing OPENWEATHER_API_KEY")

    params = {
        "q": city,
        "appid": api_key,
        "units": "metric",
    }

    resp = requests.get(FORECAST_ENDPOINT, params=params, timeout=12)
    resp.raise_for_status()
    return resp.json()
