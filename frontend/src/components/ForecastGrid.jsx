import React from 'react'
import styles from '../styles/Forecast.module.css'

const items = [
  { time: '12:00', temp: 26, wind: 3 },
  { time: '15:00', temp: 27, wind: 2 },
  { time: '18:00', temp: 27, wind: 2 },
  { time: '21:00', temp: 25, wind: 3 },
  { time: '00:00', temp: 22, wind: 3 }
]

export default function ForecastGrid() {
  return (
    <div className={styles.gridWrap}>
      <h3 className={styles.title}>Hourly Forecast</h3>
      <div className={styles.grid}>
        {items.map((it) => (
          <div key={it.time} className={styles.item}>
            <div className={styles.hour}>{it.time}</div>
            <div className={styles.icon}>☀️</div>
            <div className={styles.temp}>{it.temp}°C</div>
            <div className={styles.wind}>{it.wind}km/h</div>
          </div>
        ))}
      </div>
    </div>
  )
}

