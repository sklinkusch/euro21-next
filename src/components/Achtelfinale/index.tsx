'use client'
import React, { useState, useEffect } from 'react'
import FlagSet from '../FlagSet'
import { localeName as locales } from '../countries'
import styles from './index.module.css'

function Achtelfinale({ matches, maxColumn }: AchtelfinaleProps) {
  const [lang, setLang] = useState<string>("en")
  useEffect(() => {
    if (navigator && navigator.language) {
      const mylang = navigator.language.substring(0,2)
      setLang(mylang)
    }
  },[])
  let gridColumn = styles.AF4
  if (maxColumn) {
    switch (maxColumn) {
      case 3:
        gridColumn = styles.AF3 
        break
      case 4:
        gridColumn = styles.AF4 
        break
      case 5:
        gridColumn = styles.AF5 
        break 
      case 6:
        gridColumn = styles.AF6 
        break
      case 7:
        gridColumn = styles.AF7 
        break
      case 8:
        gridColumn = styles.AF8 
        break
      default:
        gridColumn = styles.VF4
    }
  }
  const arrangement = [[0, 4], [1, 5], [2, 6], [3, 7]]
  return (
    <div className={gridColumn}>
      <h3 className={styles.h3}>
        {locales("Round16", lang)}
      </h3>
      <table className={styles.table}>
        <tbody>
          {matches.length === 8 && arrangement.map((row, index) => (
            <tr key={index}>
              <AchtelfinaleSingle match={matches[row[0]]} />
              <AchtelfinaleSingle match={matches[row[1]]} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AchtelfinaleSingle({ match}: AchtelfinaleSingleProps) {
  const [lang, setLang] = useState<string>("en")
  useEffect(() => {
    if (navigator && navigator.language) {
      const mylang = navigator.language.substring(0,2)
      setLang(mylang)
    }
  },[])
  const {teams, goals, add, date } = match
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

export default Achtelfinale