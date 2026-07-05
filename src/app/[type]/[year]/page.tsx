import React from "react"
import { fetchTournamentData, type TournamentType } from "@/utils/fetchTournamentData"
import TournamentClient from "./TournamentClient"
import { TournamentError } from "./TournamentError"

type PageParams = {
  type: TournamentType
  year: string
}

const tournaments: Record<TournamentType, number[]> = {
  worldcupmen: [2002, 2006, 2010, 2014, 2018, 2022, 2026],
  worldcupwomen: [2003, 2007, 2011, 2015, 2019, 2023],
  euromen: [2024],
  eurowomen: []
}

export async function generateStaticParams() {
  const paths: PageParams[] = []

  Object.entries(tournaments).forEach(([type, years]) => {
    years.forEach((year) => {
      paths.push({
        type: type as TournamentType,
        year: year.toString()
      })
    })
  })

  return paths
}

export async function generateMetadata({ params }: { params: PageParams }) {
  const { year } = params
  return {
    title: `Tournament ${year}`
  }
}

export const revalidate = 86400 // ISR: 24 hours

async function TournamentPage({ params }: { params: PageParams }) {
  const { type, year } = params

  try {
    const matches = await fetchTournamentData(type, parseInt(year), 'en')

    return (
      <TournamentClient 
        type={type} 
        year={parseInt(year)} 
        initialMatches={matches} 
      />
    )
  } catch (error) {
  console.error(`Error fetching ${type}/${year}:`, error)
  const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler'
  return <TournamentError type={type} year={year} error={errorMessage} redirectDelaySeconds={5} />
}

}

export default TournamentPage
