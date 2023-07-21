'use client'
import React, { useEffect, useState } from 'react'
import { FlagWrapper } from "../FlagSet"
import { participantName as participants, localeName as locales } from '../countries'
import { getGridValue } from '../helpers'
import styles from './index.module.css'
/* eslint-disable react-hooks/exhaustive-deps */

export function GeneralTableSet({ matches }: TableSetProps) {
  const keys = Object.keys(matches)
  const sortedKeys = keys.sort()
  const sortedValues = sortedKeys.map(key => matches[key])
  const gridValue = getGridValue(keys.length)
  let className = styles.grid_2
  switch (gridValue) {
    case 1:
      className = styles.grid_1 
      break
    case 3:
      className = styles.grid_3 
      break
    case 4:
      className = styles.grid_4 
      break 
    default:
      className = styles.grid_2
  }
  if (sortedValues.length > 0) {
    return (
      <div className={className}>
        {sortedValues.map((group, index) => (<NewTable table={group.table} number={index} key={index} notifier={sortedKeys[index]} />))}
      </div>
    )
  }
  return null
}

function NewTable ({ table, number, notifier }: TableProps) {
  const [lang, setLang] = useState<string>("en")
  useEffect(() => {
    if (navigator && navigator.language) {
      const mylang = navigator.language.substring(0,2)
      setLang(mylang)
    }
  },[])
  let className = styles.tablemain
  switch (number) {
    case 0:
      className = styles.table_0
      break
    case 1:
      className = styles.table_1 
      break
    case 2:
      className = styles.table_2 
      break
    case 3:
      className = styles.table_3 
      break
    case 4:
      className = styles.table_4 
      break
    case 5:
      className = styles.table_5 
      break
    case 6:
      className = styles.table_6 
      break
    case 7:
      className = styles.table_7 
      break 
    default:
      className = styles.tablemain
  }
  if (table.length > 0) {
    return (
    <div className={className}>
      <div className={styles.notifier}>{notifier}</div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tablerow}>
            <td>{locales("Team", lang)}</td>
            <td>{locales("Pts", lang)}</td>
            <td>{locales("Difference", lang)}</td>
            <td>{locales("Goals", lang)}</td>
            <td>{locales("FairPlay", lang)}</td>
          </tr>
        </thead>
        <tbody>
          {table.map((dataset: TableDataset, index: number) => {
            const { team, points, goals, countergoals, goalDifference, fairPlay } = dataset
            return (
              <tr key={index} className={styles.tablerow}>
                <td><FlagWrapper team={team} participant={participants(team, lang)} /></td>
                <td>{points}</td>
                <td>{goalDifference}</td>
                <td>{goals}:{countergoals}</td>
                <td>{fairPlay}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    )
  }
  return null
}

export function TableThird({ third, emax, maxColumns }: TableThirdProps) {
  const [lang, setLang] = useState<string>("")
  useEffect(() => {
    if (navigator && navigator.language) {
      const mylang = navigator.language.substring(0,2)
      setLang(mylang)
    }
  },[])
  const max = emax ? emax : 3
  let tableclass = styles.tablethird_2
  switch (maxColumns) {
    case 3:
      tableclass = styles.tablethird_3 
      break
    case 4:
      tableclass = styles.tablethird_4 
      break 
    case 5:
      tableclass = styles.tablethird_5 
      break 
    case 6:
      tableclass = styles.tablethird_6 
      break
    case 7:
      tableclass = styles.tablethird_7 
      break
    case 8:
      tableclass = styles.tablethird_8 
      break 
    default:
      tableclass = styles.tablethird_2
  }
  return (
    <table className={tableclass}>
      <thead>
        <tr>
        <td>{locales("Group", lang)}</td>
        <td>{locales("Team", lang)}</td>
        <td>{locales("Pts", lang)}</td>
        <td>{locales("Victories", lang)}</td>
        <td>{locales("Difference", lang)}</td>
        <td>{locales("FairPlay", lang)}</td>
        </tr>
      </thead>
      <tbody>
        {third && third.length > 0 && third.map((team: Dataset3, index: number) => {
          const line = index === max ? styles.border : styles.noborder
          if (team) {
            return (
              <tr key={index}>
                <td className={line}>{team.group}</td>
                <td className={line}><FlagWrapper team={team.team} participant={participants(team.team, lang)} /></td>
                <td className={line}>{team.points}</td>
                <td className={line}>{team.victories}</td>
                <td className={line}>{team.goalDifference}</td>
                <td className={line}>{team.fairPlay}</td>
              </tr>
            )
          } else { return null }
        })}
      </tbody>
    </table>
  )
}