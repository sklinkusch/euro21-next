'use client'
import React, { useState, useEffect } from 'react'
import FlagSet from '../FlagSet'
import { localeName as locales } from '../countries'
import { usePathname } from 'next/navigation'
import styles from "./index.module.css"

function Viertelfinale({ matches, maxColumns }: ViertelfinaleProps) {
  const pathname = usePathname()
  let gridColumn = styles.VF2
  if (maxColumns) {
    switch (maxColumns) {
      case 3:
        gridColumn = styles.VF3 
        break
      case 4:
        gridColumn = styles.VF4 
        break
      case 5:
        gridColumn = styles.VF5 
        break 
      case 6:
        gridColumn = styles.VF6 
        break
      case 7:
        gridColumn = styles.VF7 
        break
      case 8:
        gridColumn = styles.VF8 
        break
      default:
        if (pathname.includes("worldcup")) {
          gridColumn = styles.VF4
        } else {
          gridColumn = styles.VF6
        }
    }
  }
  return (
    <div className={gridColumn}>
      <h3 className={styles.h3}>
        {locales("Quarterfinal")}
      </h3>
      <table className={styles.table}>
        <tbody>
          {matches.length > 0 && matches.map((match, index) => (
            <tr key={index}>
              <ViertelfinaleSingle match={match} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ViertelfinaleSingle({ match }: ViertelfinaleSingleProps) {
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

export default Viertelfinale