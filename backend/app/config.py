
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Weatherly AI"

    # OpenRouter
    OPENROUTER_API_KEY: str | None = None
    OPENROUTER_MODEL: str = "openai/gpt-4o-mini"
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1"

    # Weather
    OPENWEATHER_API_KEY: str | None = None

    # ✅ Store as STRING (no JSON parsing)
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173,http://localhost:5174"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
