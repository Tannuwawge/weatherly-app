import React from 'react'
import styles from '../styles/SearchBar.module.css'

export default function SearchBar({ value, onChange, onSubmit, loading }) {
  return (
    <div className={styles.searchWrap}>
      <div className={styles.inputWrap}>
        <span className={styles.icon}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z" fill="#FDB813"/>
          </svg>
        </span>
        <input
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for your preferred City..."
        />
        <button className={styles.button} onClick={onSubmit} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
    </div>
  )
}
