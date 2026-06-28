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
        <Flag code="GB-WLS" alt={participantName("GB-WLS", lang)} title={participantName("GB-WLS", lang)} className={className} />
        <Flag code="BA" alt={participantName("BA", lang)} title={participantName("BA", lang)} className={className} />
        <Flag code="IT" alt={participantName("IT", lang)} title={participantName("IT", lang)} className={className} />
        <Image src={GB_NIR} alt={participantName("GB-NIR", lang)} title={participantName("GB-NIR", lang)} className={className} />
      </>
      );
    case "Q2":
      return (
        <>
          <Flag code="UA" alt={participantName("UA", lang)} title={participantName("UA", lang)} className={className} />
          <Flag code="SE" alt={participantName("SE", lang)} title={participantName("SE", lang)} className={className} />
          <Flag code="PL" alt={participantName("PL", lang)} title={participantName("PL", lang)} className={className} />
          <Flag code="AL" alt={participantName("AL", lang)} title={participantName("AL", lang)} className={className} />
        </>
      );
    case "Q3":
      return (
        <>
          <Flag code="SK" alt={participantName("SK", lang)} title={participantName("SK", lang)} className={className} />
          <Flag code="XK" alt={participantName("XK", lang)} title={participantName("XK", lang)} className={className} />
          <Flag code="TR" alt={participantName("TR", lang)} title={participantName("TR", lang)} className={className} />
          <Flag code="RO" alt={participantName("RO", lang)} title={participantName("RO", lang)} className={className} />
        </>
      );
    case "Q4":
      return (
        <>
          <Flag code="CZ" alt={participantName("CZ", lang)} title={participantName("CZ", lang)} className={className} />
          <Flag code="IE" alt={participantName("IE", lang)} title={participantName("IE", lang)} className={className} />
          <Flag code="DK" alt={participantName("DK", lang)} title={participantName("DK", lang)} className={className} />
          <Flag code="MK" alt={participantName("MK", lang)} title={participantName("MK", lang)} className={className} />
        </>
      );
    case "Q5":
      return (
        <>
          <Flag code="NC" alt={participantName("NC", lang)} title={participantName("NC", lang)} className={className} />
          <Flag code="JM" alt={participantName("JM", lang)} title={participantName("JM", lang)} className={className} />
          <Flag code="CD" alt={participantName("CD", lang)} title={participantName("CD", lang)} className={className} />
        </>
      );
    case "Q6":
      return (
        <>
          <Flag code="BO" alt={participantName("BO", lang)} title={participantName("BO", lang)} className={className} />
          <Flag code="SR" alt={participantName("SR", lang)} title={participantName("SR", lang)} className={className} />
          <Flag code="IQ" alt={participantName("IQ", lang)} title={participantName("IQ", lang)} className={className} />
        </>
      );
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