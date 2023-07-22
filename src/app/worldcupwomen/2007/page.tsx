'use client'
import React, { useState, useEffect } from 'react'
import Link from "next/link"
import NewMatchList from "@/components/MatchList"
import { GeneralTableSet } from "@/components/Table"
import Viertelfinale from "@/components/Viertelfinale"
import Halbfinale from "@/components/Halbfinale"
import { Finale, Platz3 } from '@/components/Finale';
import FlagSet from "@/components/FlagSet"
import { localeName as locales } from '@/components/countries';
import styles from "./page.module.css"
/* eslint-disable react-hooks/exhaustive-deps */

function WorldCup2007() {
  const [matches, setMatches] = useState<Matches>({})
  const [lang, setLang] = useState<string>("en")
  useEffect(() => {
    async function fetchData () {
      const longLang = navigator && "language" in navigator ? navigator.language : ""
      const mylang = longLang.length > 0 ? longLang.substring(0,2) : "en"
      const response = await fetch(`https://euro21-api.vercel.app/worldcupwomen?year=2007&lang=${mylang}`)
      const data = await response.json()
      setMatches(await data)
      setLang(await mylang)
      document.title = `${locales("WorldCup", mylang)} 2023`
    }
    fetchData()
  },[])
  return (
    <div className={styles.App}>
      <h1 className={styles.h1} lang={lang}>
        <span>{locales("WorldCup", lang)}</span>{" "}
        <span>2007</span>
        {matches.hasOwnProperty("host") && matches.host && (<FlagSet code={matches.host} large={true} />)}
      </h1>
      <header className={styles.App_header}>
        <aside className={styles.aside}>
          {matches.hasOwnProperty("groups") && matches.groups && (<NewMatchList matches={matches.groups} />)}
        </aside>
        <main className={styles.main}>
          {matches.hasOwnProperty("groups") && matches.groups && (<GeneralTableSet matches={matches.groups} />)}
           <div className={styles.finalgrid}>
            {matches.hasOwnProperty("VF") && matches.VF && (<Viertelfinale matches={matches.VF} maxColumns={4} />)}
            {matches.hasOwnProperty("HF") && matches.HF && (<Halbfinale matches={matches.HF} />)}
            {matches.hasOwnProperty("3P") && matches["3P"] && (<Platz3 match={matches["3P"]} />)}
            {matches.hasOwnProperty("F") && matches.F && (<Finale match={matches.F} />)}
          </div>
        </main>
      </header>
      {matches.hasOwnProperty("champion") && matches.champion && <h2 className={styles.h2}>
        {locales("WChampion", lang)}: <FlagSet code={matches.champion} large={true} />
      </h2>}
      <div className={styles.linkcontainer}>
        <Link href="/" className={styles.link}>{locales("Back", lang)}</Link>
      </div>
    </div>
  );
}

export default WorldCup2007;
