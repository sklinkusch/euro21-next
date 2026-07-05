// app/[type]/[year]/TournamentClient.tsx
'use client'

import React from "react"
import Link from "next/link"
import NewMatchList from "@/components/MatchList"
import { GeneralTableSet, TableThird } from "@/components/Table"
import Viertelfinale from "@/components/Viertelfinale"
import Halbfinale from "@/components/Halbfinale"
import { Finale, Platz3 } from '@/components/Finale'
import FlagSet from "@/components/FlagSet"
import { localeName, localeName as locales } from '@/components/countries'
import styles from "./page.module.css"
import { KnockoutRound } from "@/components/KnockoutRound"
import { type TournamentType } from "@/utils/fetchTournamentData"
import { useFetchData } from "@/hooks/useFetchData"

type TournamentClientProps = {
  type: TournamentType
  year: number
  initialMatches: Record<string, any>
}

function TournamentClient({ type, year, initialMatches }: TournamentClientProps) {
  const { matches: updatedMatches, lang } = useFetchData(type, year)

  const matches = Object.keys(updatedMatches).length > 0 ? updatedMatches : initialMatches
  const t3max: number | null = matches.hasOwnProperty("T3") && matches.hasOwnProperty('T3Max') ? matches.T3Max : null;

  React.useEffect(() => {
    document.title = `${localeName("WorldCup", lang)} ${year}`
  }, [year, lang])

  return (
    <div className={styles.App}>
      <h1 className={styles.h1} lang={lang}>
        <span>{locales("WorldCup", lang)}</span> <span>{year}</span>
        {matches.hasOwnProperty("host") && matches.host && (
          <FlagSet code={matches.host} large={true} />
        )}
      </h1>
      <header className={styles.App_header}>
        <aside className={styles.aside}>
          {matches.hasOwnProperty("groups") && matches.groups && (
            <NewMatchList matches={matches.groups} />
          )}
        </aside>
        <main className={styles.main}>
          {matches.hasOwnProperty("groups") && matches.groups && (
            <GeneralTableSet matches={matches.groups} />
          )}
          <div className={styles.finalgrid}>
            {matches.hasOwnProperty("T3") && matches.T3 && (
              <TableThird third={matches.T3} emax={t3max as number} maxColumns={4} />
            )}
            {matches.hasOwnProperty("SF") && matches.SF && (
              <KnockoutRound title={localeName("Round32", lang)} matches={matches.SF} />
            )}
            {matches.hasOwnProperty("AF") && matches.AF && (
              <KnockoutRound title={localeName("Round16", lang)} matches={matches.AF} />
            )}
            {matches.hasOwnProperty("VF") && matches.VF && (
              <Viertelfinale matches={matches.VF} maxColumns={4} />
            )}
            {matches.hasOwnProperty("HF") && matches.HF && (
              <Halbfinale matches={matches.HF} />
            )}
            {matches.hasOwnProperty("3P") && matches["3P"] && (
              <Platz3 match={matches["3P"]} />
            )}
            {matches.hasOwnProperty("F") && matches.F && (
              <Finale match={matches.F} />
            )}
          </div>
        </main>
      </header>
      {matches.hasOwnProperty("champion") && matches.champion && (
        <h2 className={styles.h2}>
          {locales("WChampion", lang)}: <FlagSet code={matches.champion} large={true} />
        </h2>
      )}
      <div className={styles.linkcontainer}>
        <Link href="/" className={styles.link}>
          {locales("Back", lang)}
        </Link>
      </div>
    </div>
  )
}

export default TournamentClient
