'use client'
import React from 'react'
import { FlagWrapper } from '../FlagSet'
import { participantName as participants } from "../countries"
import { getGridValue } from "../helpers"
import styles from "./index.module.css"

type SingleMatch = {
  teams: string[]
  goals: (number | null)[]
  date: string
  fairPlay: (number | null)[]
}

type TableDataset = {
  team: string
  points: number
  rank: number
  goals: number
  countergoals: number
  goalDifference: number
  fairPlay: number
  victories: number
  ownMatches: SingleMatch[]
}

type Group = {
  matches: SingleMatch[]
  table: TableDataset[]
}

type MatchListProp = {
  matches: {[key: string]: Group }
}

type GroupMatchListProp = {
  matches: SingleMatch[]
  number: number
  identifier: string
}

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
  const classKey = `group_${number}`
  const cssClass = styles[classKey]
  return (
    <div className={cssClass}>
      <div className={styles.identifier}>{identifier}</div>
      <table className={styles.table}>
        <tbody>
          {matches.map((match, index) =>{
            const { teams, goals, date } = match 
            const [teamA, teamB] = teams 
            const [goalsA, goalsB] = goals
            const aGoals = typeof goalsA === "number" ? `${goalsA}` : "-"
            const bGoals = typeof goalsB === "number" ? `${goalsB}` : "-"
            const aParticipants = participants(teamA) ? participants(teamA) : teamA
            const bParticipants = participants(teamB) ? participants(teamB) : teamB
            const language = navigator.language
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
            const formattedDate = date ? new Date(date).toLocaleString(language, { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: tz }) : null
            return (
              <tr key={index} className={styles.row}>
                <td className={styles.flag}><FlagWrapper team={teamA} participant={aParticipants} /></td>
                <td className={styles.flag}><FlagWrapper team={teamB} participant={bParticipants} /></td>
                {typeof goalsA === 'number' && typeof goalsB === 'number' ? (<td className={styles.resultcell}><span className={styles.span}>{`${aGoals}:${bGoals}`}</span></td>) : formattedDate ? (<td className={styles.resultcell}><span className={styles.span}>{formattedDate}</span></td>) : (<td className={styles.resultcell}><span className={styles.span}>-:-</span></td>)}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}