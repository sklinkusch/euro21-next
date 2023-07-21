import React, { useState, useEffect } from 'react'
import FlagSet from '../FlagSet'
import { localeName as locales } from '../countries'
import styles from "./index.module.css"

function Finale({ match }: FinalProps) {
  return (
    <div className={styles.matchWrapper}>
      <h3 className={styles.title}>
        {locales("Final")}
      </h3>
      <table className={styles.table}>
        <tbody>
          <tr>
            <FinaleSingle match={match} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function Platz3({ match }: FinalProps) {
  return (
    <div className={styles.matchWrapper}>
      <h3 className={styles.title}>
        {locales("Place3")}
      </h3>
      <table className={styles.table}>
        <tbody>
          <tr>
            <FinaleSingle match={match} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function FinaleSingle({ match }: FinalProps) {
  const [lang, setLang] = useState<string>("")
  useEffect(() => {
    if (navigator && navigator.language) {
      const mylang = navigator.language.substring(0,2)
      setLang(mylang)
    }
  },[])
  const { teams, goals, add, date } = match
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const formattedDate = date ? new Date(date).toLocaleString(lang, { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: tz }) : null
  return (
    <React.Fragment>
      <td className={styles.team}><FlagSet code={teams[0]} /></td>
      <td className={styles.team}><FlagSet code={teams[1]} /></td>
      {teams[0] && teams[1] && typeof goals[0] === 'number' && typeof goals[1] === 'number' ? (<td className={styles.result}>{`${typeof goals[0] === "number" ? goals[0] : "-"}:${typeof goals[1] === "number" ? goals[1] : "-"} ${add ? add : ""}`}</td>) : formattedDate ? (<td className={styles.result}>{formattedDate}</td>) : (<td className={styles.result}>-:-</td>)}
    </React.Fragment>
  )
}

export { Platz3, Finale }