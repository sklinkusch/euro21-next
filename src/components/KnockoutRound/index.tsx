import React, { useState, useEffect } from 'react';
import FlagSet, { FlagWrapper } from '../FlagSet';
import { participantName } from '../countries';
import styles from './index.module.css';

type KnockoutRoundProps = {
  title: string;
  matches: KOMatch[];
  maxColumn: number;
};

function KnockoutRound ({title, matches, maxColumn }: KnockoutRoundProps) {
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
        gridColumn = styles.AF4
    }
  }
  let arrangement: (number | null)[] | (number | null)[][] = [];
  if (maxColumn === 1) {
    arrangement = new Array(matches.length).fill("").map((_item, index) => index);
  } else if (maxColumn === 2) {
    const isEven = matches.length % 2 === 0;
    const length = isEven ? matches.length / 2 : (matches.length + 1) / 2;
    arrangement = new Array(length).fill("").map((_item, index) => {
      if (isEven) {
        return [index, length + index];
      } else if ((length + index) < matches.length) {
        return [index, length + index];
      } else {
        return [index, null];
      }
    });
  }
  return (
    <div className={gridColumn}>
      <h3 className={styles.h3}>
        {title}
      </h3>
      <div className={styles.flexhalf}>
        {arrangement.map((matchup, i) => (
          <>
            <table className={styles.table}>
              <tbody>
                {Array.isArray(matchup) && 
                typeof matchup[0] === 'number' && 
                <AchtelfinaleSingle match={matches[matchup[0]]} />}
              </tbody>
            </table>
            <table className={styles.table}>
              <tbody>
                {Array.isArray(matchup) && 
                typeof matchup[1] === 'number' && 
                <AchtelfinaleSingle match={matches[matchup[1]]} />}
              </tbody>
            </table>
          </> 
        ))}
      </div>
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
  const {teams, goals, add, date, place } = match
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const formattedDate = date ? new Date(date).toLocaleString(lang, { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: tz }) : null
  return (
    <React.Fragment>
      {place && (<tr className={styles.smallrow}>
        <td colSpan={3}>
          <span>{place.city}</span>
          <FlagWrapper team={place.country} participant={participantName(place.country, lang)} />
          {typeof goals[0] === 'number' && typeof goals[1] === 'number' && formattedDate && <span>{formattedDate}</span>}
        </td>
      </tr>)}
      <tr>
        {Array.isArray(teams) && teams[0] 
          ? <td className={styles.team}><FlagSet code={teams[0]} /></td> 
          : <td className={styles.team}></td>}
        {Array.isArray(teams) && teams[1] 
          ? <td className={styles.team}><FlagSet code={teams[1]} /></td> 
          : <td className={styles.team}></td>}
        {Array.isArray(teams) && teams.length === 2 && teams[0] && teams[1] && typeof goals[0] === 'number' && typeof goals[1] === 'number' ? (<td className={styles.result}>{`${typeof goals[0] === "number" ? goals[0] : "-"}:${typeof goals[1] === "number" ? goals[1] : "-"} ${add ? add : ""}`}</td>) : formattedDate ? (<td className={styles.result}>{formattedDate}</td>) : (<td className={styles.result}>-:-</td>)}
      </tr>
    </React.Fragment>
  )
}

export { KnockoutRound }