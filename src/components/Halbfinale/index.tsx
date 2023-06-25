'use client'
import React from 'react'
import FlagSet from '../FlagSet'
import { localeName as locales } from '../countries'
import { useRouter } from 'next/router'
import styles from './index.module.css'

type KOMatch = {
  teams: string[] | string[][]
  goals: (number | null)[]
  add: string | null
  date: string
}

type HalbfinaleSingleProps = {
  match: KOMatch
}

type HalbfinaleProps = {
  matches: KOMatch[]
  full?: boolean
}

function Halbfinale({ matches, full = false }: HalbfinaleProps) {
  const location = useRouter()
  const gridColumn = full ? styles.HFFull : location.pathname.includes("worldcup") ? styles.HFWorld : styles.HFEuro
  return (
    <div className={gridColumn}>
      <h3 className={styles.h3}>
        {locales("Semifinal")}
      </h3>
      <table className={styles.table}>
        <tbody>
          {matches.length > 0 && matches.map((match, index) => (
            <tr key={index}>
              <HalbfinaleSingle match={match} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function HalbfinaleSingle({ match }: HalbfinaleSingleProps) {
  const { teams, goals, add, date } = match
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const formattedDate = date ? new Date(date).toLocaleString(navigator.language, { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: tz }) : null
  return (
    <React.Fragment>
      <td className={styles.team}><FlagSet code={teams[0]} /></td>
      <td className={styles.team}><FlagSet code={teams[1]} /></td>
      {teams[0] && teams[1] && typeof goals[0] === 'number' && typeof goals[1] === 'number' ? (<td className={styles.result}>{`${typeof goals[0] === "number" ? goals[0] : "-"}:${typeof goals[1] === "number" ? goals[1] : "-"} ${add ? add : ""}`}</td>) : formattedDate ? (<td className={styles.result}>{formattedDate}</td>) : (<td className={styles.result}>-:-</td>)}
    </React.Fragment>
  )
}

export default Halbfinale