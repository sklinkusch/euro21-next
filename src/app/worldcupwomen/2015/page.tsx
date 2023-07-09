'use client'
import React, { useState, useEffect } from "react"
import Link from "next/link"
import NewMatchList from "@/components/MatchList"
import { GeneralTableSet, TableThird } from "@/components/Table"
import Achtelfinale from "@/components/Achtelfinale"
import Viertelfinale from "@/components/Viertelfinale"
import Halbfinale from "@/components/Halbfinale"
import { Finale, Platz3 } from '@/components/Finale';
import FlagSet from "@/components/FlagSet"
import { localeName as locales } from '@/components/countries';
import styles from "./page.module.css"
/* eslint-disable react-hooks/exhaustive-deps */

type SingleMatch = {
  teams: string[]
  goals: (number | null)[]
  date: string
  fairPlay: (number | null)[]
}

type KOMatch = {
  teams: string[] | string[][]
  goals: (number | null)[]
  add: string | null
  date: string
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

type Dataset3 = {
  team: string
  points: number
  goals: number
  countergoals: number
  goalDifference: number
  fairPlay: number
  victories: number
  group: string
}

type Group = {
  matches: SingleMatch[]
  table: TableDataset[]
}

type Matches = {
  host?: string[]
  groups?: { [key: string]: Group}
  T3?: Dataset3[]
  AF?: KOMatch[]
  VF?: KOMatch[]
  HF?: KOMatch[]
  '3P'?: KOMatch
  F?: KOMatch
  champion?: string[] | string
}

function WorldCup2015() {
  const [matches, setMatches] = useState<Matches>({})
  const [lang, setLang] = useState<string>("")
  useEffect(() => {
    document.title = `${locales("WorldCup")} 2015`
  }, [])
  useEffect(() => {
    async function fetchData () {
      const longLang = navigator && "language" in navigator ? navigator.language : ""
      const mylang = longLang.length > 0 ? longLang.substring(0,2) : "en"
      const response = await fetch(`https://euro21-api.vercel.app/worldcupwomen?year=2015&lang=${mylang}`)
      const data = await response.json()
      setMatches(await data)
      setLang(await mylang)
    }
    fetchData()
  },[])
  return (
    <div className={styles.App}>
      <h1 className={styles.h1} lang={lang}>
        <span>{locales("WorldCup")}</span>{" "}
        <span>2015</span>
        {matches.hasOwnProperty("host") && matches.host && (<FlagSet code={matches.host} large={true} />)}
      </h1>
      <header className={styles.App_header}>
        <aside className={styles.aside}>
          {matches.hasOwnProperty("groups") && matches.groups && (<NewMatchList matches={matches.groups} />)}
        </aside>
        <main className={styles.main}>
          {matches.hasOwnProperty("groups") && matches.groups && (<GeneralTableSet matches={matches.groups} />)}
           <div className={styles.finalgrid}>
            {matches.hasOwnProperty("T3") && matches.T3 && (<TableThird third={matches.T3} maxColumns={4} />)}
            {matches.hasOwnProperty("AF") && matches.AF && (<Achtelfinale matches={matches.AF} />)}
            {matches.hasOwnProperty("VF") && matches.VF && (<Viertelfinale matches={matches.VF} maxColumns={4} />)}
            {matches.hasOwnProperty("HF") && matches.HF && (<Halbfinale matches={matches.HF} />)}
            {matches.hasOwnProperty("3P") && matches["3P"] && (<Platz3 match={matches["3P"]} />)}
            {matches.hasOwnProperty("F") && matches.F && (<Finale match={matches.F} />)}
          </div> 
        </main>
      </header>
      {matches.hasOwnProperty("champion") && matches.champion && <h2 className={styles.h2}>
        {locales("WChampion")}: <FlagSet code={matches.champion} large={true} />
      </h2>}
      <div className={styles.linkcontainer}>
        <Link href="/" className={styles.link}>{locales("Back")}</Link>
      </div>
    </div>
  );
}

export default WorldCup2015;
