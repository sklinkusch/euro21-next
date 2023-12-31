'use client'
const dynamic = require('next/dynamic')
const participants: Participants = require("./teams.json")
const locales: Locales = require("./locales.json")

export const participantName = (code: string, lang: string) => {
    if (typeof participants === 'object' && participants.hasOwnProperty(code)) {
      if( /^de/.test(lang)) {
        return participants[code]["de"]
      } else if( /^es/.test(lang)) {
        return participants[code]["es"]
      } else if( /^fr/.test(lang)) {
        return participants[code]["fr"]
      } else if( /^it/.test(lang)) {
        return participants[code]["it"]
      } else if( /^pl/.test(lang)) {
        return participants[code]["pl"]
      } else if( /^pt/.test(lang)) {
        return participants[code]["pt"]
      } else {
        return participants[code]["en"]
      }
    } else {
      return code
    }
}

export const localeName = (code: string, lang: string) => {
  if(code && typeof code === "string" && code != null && code !== "?") {
    if (/^de/.test(lang)) {
      return locales.de[code]
    } else if (/^es/.test(lang)) {
      return locales.es[code]
    } else if (/^fr/.test(lang)) {
      return locales.fr[code]
    } else if (/^it/.test(lang)) {
      return locales.it[code]
    } else if (/^pl/.test(lang)) {
      return locales.pl[code]
    } else if (/^pt/.test(lang)) {
      return locales.pt[code]
    } else {
      return locales.en[code]
    }
  }
  return ""
}
