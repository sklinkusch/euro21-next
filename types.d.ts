// Matches

type Place = {
  city: string
  country: string
}

type SingleMatch = {
  teams: string[]
  goals: (number | null)[]
  date: string
  fairPlay: (number | null)[]
  place?: Place
}

type KOMatch = {
  teams: string[] | string[][]
  goals: (number | null)[]
  add: string | null
  date: string
  place?: Place
}

// Table

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

// Backend Data

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

// Components
// 1. MatchList

type MatchListProp = {
  matches: {[key: string]: Group }
}

type GroupMatchListProp = {
  matches: SingleMatch[]
  number: number
  identifier: string
}

// 2. Table

type TableProps = {
  table: Dataset[]
  number: number
  notifier: string
}

type TableThirdProps = {
  third: Dataset3[]
  emax?: number
  maxColumns?: number
}

type TableSetProps = {
  matches: { [key: string]: Group }
}

// 3. Achtelfinale

type AchtelfinaleProps = {
  matches: KOMatch[]
  maxColumn?: number
}

type AchtelfinaleSingleProps = {
  match: KOMatch
}

// 4. Viertelfinale

type ViertelfinaleSingleProps = {
  match: KOMatch
}

type ViertelfinaleProps = {
  matches: KOMatch[]
  maxColumns?: number
}

// 5. Halbfinale

type HalbfinaleSingleProps = {
  match: KOMatch
}

type HalbfinaleProps = {
  matches: KOMatch[]
  full?: boolean
}

// 6. Finale

type FinalProps = {
  match: Match
}

// 7. helpers

type MatchArray = Match[] | Match

type Team = {
  team: string
}

// 8. FlagSet/FlagWrapper

type FlagWrapperProps = {
  team: string
  participant: string
  large?: boolean
}

type FlagSetProps = {
  code: string[] | string
  large?: boolean
}

// 9. Countries/Locales

type Participant = { [key: string]: string }
type Participants = { [key: string]: Participant }
type Locale = { [key: string]: string }
type Locales = { [key: string]: Locale }