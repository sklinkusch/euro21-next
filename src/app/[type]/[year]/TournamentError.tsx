'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './page.module.css'

type TournamentErrorProps = {
  type: string
  year: string
  error?: string
  redirectDelaySeconds?: number
}

export function TournamentError({ 
  type, 
  year, 
  error,
  redirectDelaySeconds = 5 
}: TournamentErrorProps) {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, redirectDelaySeconds * 1000)

    return () => clearTimeout(timer)
  }, [router, redirectDelaySeconds])

  return (
    <div className={styles.App}>
      <h1 className={styles.h1}>⚠️ This tournament was not found.</h1>
      <div style={{ padding: '2rem', fontSize: '1.1rem' }}>
        <p>The tournament <strong>{type} {year}</strong> could not be loaded.</p>
        {error && <p style={{ color: '#666', marginTop: '1rem' }}>Error: {error}</p>}
        
        <p style={{ marginTop: '2rem', color: '#999', fontSize: '0.9rem' }}>
          You are redirected to the start page in {redirectDelaySeconds} seconds...
        </p>
        
        <div style={{ marginTop: '1rem' }}>
          <Link href="/" className={styles.link}>
            To the main page
          </Link>
        </div>
      </div>
    </div>
  )
}
