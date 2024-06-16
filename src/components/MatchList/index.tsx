'use client'
import React, { useState, useEffect } from 'react'
import { FlagWrapper } from '../FlagSet'
import { participantName as participants } from "../countries"
import { getGridValue } from "../helpers"
import styles from "./index.module.css"

export default function NewMatchList({ matches }: MatchListProp) {
  const keys = Object.keys(matches)
  const sortedKeys = keys.sort()
  const sortedValues = sortedKeys.map(key => matches[key])
  const gridValue = getGridValue(keys.length)
  const classKey = `matchList_${gridValue}`
  const cssClass = styles[classKey]
  if (sortedValues.length > 0) {
    return (
      <div className={cssClass}>
        {sortedValues.map((group, index) => (<GroupMatchList matches={group.matches} number={index} key={index} identifier={sortedKeys[index]} />))}
      </div>
    )
  }
  return null
}

function GroupMatchList({ matches, number, identifier }: GroupMatchListProp) {
  const [lang, setLang] = useState<string>("en")
  useEffect(() => {
    if (navigator && navigator.language) {
      const mylang = navigator.language.substring(0,2)
      setLang(mylang)
    }
  },[])
  const classKey = `group_${number}`
  const cssClass = styles[classKey]
  return (
    <div className={cssClass}>
      <div className={styles.identifier}>{identifier}</div>
      <table className={styles.table}>
        <tbody>
          {matches.map((match, index) =>{
            const { teams, goals, date, place, live } = match 
            const [teamA, teamB] = teams 
            const [goalsA, goalsB] = goals
            const aGoals = typeof goalsA === "number" ? `${goalsA}` : "-"
            const bGoals = typeof goalsB === "number" ? `${goalsB}` : "-"
            const aParticipants = participants(teamA, lang) ? participants(teamA, lang) : teamA
            const bParticipants = participants(teamB, lang) ? participants(teamB, lang) : teamB
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
            const formattedDate = date ? new Date(date).toLocaleString(lang, { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: tz }) : null
            return (
              <React.Fragment key={index}>
                {place && (<tr className={styles.smallrow}>
                  <td colSpan={3}>
                    <span>{place.city}</span>
                    <FlagWrapper team={place?.country} participant={participants(place?.country, lang)} />
                    {typeof goalsA === 'number' && typeof goalsB === 'number' && formattedDate && <span>{formattedDate}</span>}
                  </td>
                </tr>)}
                <tr className={styles.row}>
                  <td className={styles.flag}><FlagWrapper team={teamA} participant={aParticipants} /></td>
                  <td className={styles.flag}><FlagWrapper team={teamB} participant={bParticipants} /></td>
                  {typeof goalsA === 'number' && typeof goalsB === 'number' 
                    ? live
                      ? (<td className={styles.resultcell}><span className={styles.boldspan}>{`${aGoals}:${bGoals}`}</span></td>) 
                      : (<td className={styles.resultcell}><span className={styles.span}>{`${aGoals}:${bGoals}`}</span></td>) 
                    : formattedDate 
                      ? (<td className={styles.resultcell}><span className={styles.span}>{formattedDate}</span></td>) 
                      : (<td className={styles.resultcell}><span className={styles.span}>-:-</span></td>)}
                </tr>
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}