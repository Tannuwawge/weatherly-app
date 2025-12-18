import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Navbar.module.css'

export default function Navbar({ dark, onToggle }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>Weatherly</div>
      <nav className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/about" className={styles.link}>About</Link>
        <Link to="/contact" className={styles.link}>Contact</Link>
      </nav>
      <div className={styles.actions}>
        <label className={styles.toggle}>
          <input type="checkbox" checked={dark} onChange={onToggle} />
          <span className={styles.slider}></span>
          <span className={styles.label}>Dark Mode</span>
        </label>
      </div>
    </header>
  )
}
