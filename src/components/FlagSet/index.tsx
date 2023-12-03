import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Flag from "react-world-flags"
import GB_NIR from "./GB_NIR.svg"
import SU from "./SU.svg"
import SU_CIS from "./SU_CIS.svg"
import TW_OLY from "./TW_OLY.svg"
import YU_SCG from "./YU_SCG.svg"
import YU_SFR from "./YU_SFR.svg"
import { participantName } from '../countries'
import styles from "./index.module.css"

export function FlagWrapper({ team, participant, large = false }: FlagWrapperProps) {
  const className = large ? styles.large : styles.small
  const [lang, setLang] = useState<string>("en")
  useEffect(() => {
    if (navigator && navigator.language) {
      const mylang = navigator.language.substring(0,2)
      setLang(mylang)
    }
  },[])
  switch(team) {
    case "Q1":
      return (
      <>
        <Flag code='GB-WLS' alt={participantName("GB-WLS", lang)} title={participantName("GB-WLS", lang)} className={className} />
        <Flag code='FI' alt={participantName("FI", lang)} title={participantName("FI", lang)} className={className} />
        <Flag code='PL' alt={participantName("PL", lang)} title={participantName("PL", lang)} className={className} />
        <Flag code='EE' alt={participantName("EE", lang)} title={participantName("EE", lang)} className={className} />
      </>
      )
    case "Q2":
      return (
      <>
        <Flag code='BH' alt={participantName("BH", lang)} title={participantName("BH", lang)} className={className} />
        <Flag code='UA' alt={participantName("UA", lang)} title={participantName("UA", lang)} className={className} />
        <Flag code='IL' alt={participantName("IL", lang)} title={participantName("IL", lang)} className={className} />
        <Flag code='IS' alt={participantName("IS", lang)} title={participantName("IS", lang)} className={className} />
      </>
      )
    case "Q3":
      return (
      <>
        <Flag code='GE' alt={participantName("GE", lang)} title={participantName("GE", lang)} className={className} />
        <Flag code='LU' alt={participantName("LU", lang)} title={participantName("LU", lang)} className={className} />
        <Flag code='GR' alt={participantName("GR", lang)} title={participantName("GR", lang)} className={className} />
        <Flag code='KZ' alt={participantName("KZ", lang)} title={participantName("KZ", lang)} className={className} />
      </>
      )
    case "GB-NIR":
      return <Image src={GB_NIR} alt={participant} title={participant} className={className} />
    case "CS":
      return <Flag code='CZ' alt={participant} title={participant} className={className} />
    case "DE-BRD":
      return <Flag code='DE' alt={participant} title={participant} className={className} />
    case "SU":
      return <Image src={SU} alt={participant} title={participant} className={className} />
    case "SU-CIS":
      return <Image src={SU_CIS} alt={participant} title={participant} className={className} />
    case "TW-OLY":
      return <Image src={TW_OLY} alt={participant} title={participant} className={className} />
    case "YU-BR":
    case "YU-SCG":
      return <Image src={YU_SCG} alt={participant} title={participant} className={className} />
    case "YU-SFR":
      return <Image src={YU_SFR} alt={participant} title={participant} className={className} />
    default:
      return (
        <Flag
          code={team}
          title={participant}
          className={className}
          fallback={<span>🏴‍☠️</span>}
        />
      )
  }
}

export default function FlagSet({code, large = false }: FlagSetProps){
  const [lang, setLang] = useState<string>("en")
  useEffect(() => {
    if (navigator && navigator.language) {
      const mylang = navigator.language.substring(0,2)
      setLang(mylang)
    }
  },[])
  if (typeof code === "object" && Array.isArray(code) && code.length > 0) {
    return (
      <React.Fragment>
        {code.map((singleCode, index) => (
          <FlagWrapper key={index} team={singleCode} participant={participantName(singleCode, lang)} large={large} />
        ))}
      </React.Fragment>
    )
  }
  if (typeof code === 'string') {
    return (
      <FlagWrapper team={code} participant={participantName(code, lang)} large={large} />
    )
  }
}