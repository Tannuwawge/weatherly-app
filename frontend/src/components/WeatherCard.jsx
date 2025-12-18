import React from 'react'
import styles from '../styles/Card.module.css'

function SunIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="5" fill="#FDB813" />
      {[...Array(8)].map((_, i) => {
        const angle = (i * Math.PI) / 4
        const x1 = 12 + Math.cos(angle) * 7
        const y1 = 12 + Math.sin(angle) * 7
        const x2 = 12 + Math.cos(angle) * 10.5
        const y2 = 12 + Math.sin(angle) * 10.5
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#FDB813"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

export default function WeatherCard({ loading, error, message, data }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.city}>{data?.city || 'Your City'}</div>
        <div className={styles.time}>{new Date().toLocaleString()}</div>
      </div>

      <div className={styles.content}>
        <div className={styles.tempBlock}>
          <div className={styles.tempMain}>
            {data?.temperature_c !== undefined ? `${Math.round(data.temperature_c)}°C` : '--'}
          </div>
          <div className={styles.tempSecondary}>
            {data?.feels_like_c !== undefined ? `Feels like: ${Math.round(data.feels_like_c)}°C` : ''}
          </div>
        </div>
        <div className={styles.iconWrap}><SunIcon /></div>

        <div className={styles.stats}>
          <div className={styles.stat}><span>Humidity</span><strong>{data?.humidity_pct ?? '--'}%</strong></div>
          <div className={styles.stat}><span>Wind</span><strong>{data?.wind_kmh ?? '--'} km/h</strong></div>
          <div className={styles.stat}><span>Condition</span><strong>{data?.condition ?? '--'}</strong></div>
        </div>
      </div>

      <div className={styles.footer}>
        {loading && <div className={styles.info}>Fetching latest weather...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {!loading && !error && message && <div className={styles.info}>{message}</div>}
      </div>
    </div>
  )
}

