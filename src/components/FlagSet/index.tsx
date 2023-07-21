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
  switch(team) {
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
  const [lang, setLang] = useState<string>("")
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