'use client'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { localeName as locales } from '@/components/countries' 
import Link from 'next/link'

export default function Home() {
  const [lang, setLang] = useState<string>("en")
  useEffect(() => {
    const mylang = navigator && navigator.language ? navigator.language.substring(0,2) : "en"
    setLang(mylang)
    document.title = locales("SocTurn", mylang)
  },[])
  const tournaments = [
  // {
  //   title: `${locales("EuroMen")}`,
  //   editions: [
  //     {
  //       link: "/euromen/2020",
  //       title: `${locales("Euro", lang)} 2020`
  //     },
  //     {
  //       link: "/euromen/2016",
  //       title: `${locales("Euro", lang)} 2016`
  //     },
  //     {
  //       link: "/euromen/2012",
  //       title: `${locales("Euro", lang)} 2012`
  //     },
  //     {
  //       link: "/euromen/2008",
  //       title: `${locales("Euro", lang)} 2008`
  //     },
  //     {
  //       link: "/euromen/2004",
  //       title: `${locales("Euro", lang)} 2004`
  //     },
  //   ],
  // },
  // {
  //   title: `${locales("EuroWomen", lang)}`,
  //   editions: [
  //     {
  //       link: "/eurowomen/2022",
  //       title: `${locales("Euro", lang)} 2022`
  //     },
  //     {
  //       link: "/eurowomen/2017",
  //       title: `${locales("Euro", lang)} 2017`
  //     },
  //     {
  //       link: "/eurowomen/2013",
  //       title: `${locales("Euro", lang)} 2013`
  //     },
  //     {
  //       link: "/eurowomen/2009",
  //       title: `${locales("Euro", lang)} 2009`
  //     },
  //     {
  //       link: "/eurowomen/2005",
  //       title: `${locales("Euro", lang)} 2005`
  //     },
  //     {
  //       link: "/eurowomen/2001",
  //       title: `${locales("Euro", lang)} 2001`
  //     },
  //     {
  //       link: "/eurowomen/1997",
  //       title: `${locales("Euro", lang)} 1997`
  //     }
  //   ],
  // },
  {
    title: `${locales("WCMen", lang)}`,
    editions: [
      {
        link: "/worldcupmen/2022",
        title: `${locales("WorldCup", lang)} 2022`
      },
      {
        link: "/worldcupmen/2018",
        title: `${locales("WorldCup", lang)} 2018`
      },
      {
        link: "/worldcupmen/2014",
        title: `${locales("WorldCup", lang)} 2014`
      },
      {
        link: "/worldcupmen/2010",
        title: `${locales("WorldCup", lang)} 2010`
      },
      {
        link: "/worldcupmen/2006",
        title: `${locales("WorldCup", lang)} 2006`
      },
      {
        link: "/worldcupmen/2002",
        title: `${locales("WorldCup", lang)} 2002`
      }
      // {
      //   link: "/worldcupmen/1998",
      //   title: `${locales("WorldCup", lang)} 1998`
      // },
      // {
      //   link: "/worldcupmen/1994",
      //   title: `${locales("WorldCup", lang)} 1994`
      // },
      // {
      //   link: "/worldcupmen/1990",
      //   title: `${locales("WorldCup", lang)} 1990`
      // }
    ],
  },
  {
    title: `${locales("WCWomen", lang)}`,
    editions: [
      {
        link: "/worldcupwomen/2023",
        title: `${locales("WorldCup", lang)} 2023`
      },
      {
        link: "/worldcupwomen/2019",
        title: `${locales("WorldCup", lang)} 2019`
      },
      {
        link: "/worldcupwomen/2015",
        title: `${locales("WorldCup", lang)} 2015`
      },
      {
        link: "/worldcupwomen/2011",
        title: `${locales("WorldCup", lang)} 2011`
      },
      {
        link: "/worldcupwomen/2007",
        title: `${locales("WorldCup", lang)} 2007`
      },
      {
        link: "/worldcupwomen/2003",
        title: `${locales("WorldCup", lang)} 2003`
      }
      // {
      //   link: "/worldcupwomen/1999",
      //   title: `${locales("WorldCup", lang)} 1999`
      // },
      // {
      //   link: "/worldcupwomen/1995",
      //   title: `${locales("WorldCup", lang)} 1995`
      // },
      // {
      //   link: "/worldcupwomen/1991",
      //   title: `${locales("WorldCup", lang)} 1991`
      // }
    ],
  },
  {
    title: `${locales("EuroMen", lang)}`,
    editions: [
      {
        link: "/euromen/2024",
        title: `${locales("Euro", lang)} 2024`
      }
      // {
      //   link: "/worldcupwomen/2019",
      //   title: `${locales("WorldCup", lang)} 2019`
      // },
      // {
      //   link: "/worldcupwomen/2015",
      //   title: `${locales("WorldCup", lang)} 2015`
      // },
      // {
      //   link: "/worldcupwomen/2011",
      //   title: `${locales("WorldCup", lang)} 2011`
      // },
      // {
      //   link: "/worldcupwomen/2007",
      //   title: `${locales("WorldCup", lang)} 2007`
      // },
      // {
      //   link: "/worldcupwomen/2003",
      //   title: `${locales("WorldCup", lang)} 2003`
      // }
      // {
      //   link: "/worldcupwomen/1999",
      //   title: `${locales("WorldCup", lang)} 1999`
      // },
      // {
      //   link: "/worldcupwomen/1995",
      //   title: `${locales("WorldCup", lang)} 1995`
      // },
      // {
      //   link: "/worldcupwomen/1991",
      //   title: `${locales("WorldCup", lang)} 1991`
      // }
    ],
  }
]
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>{locales("Overview", lang)}</h1>
      <div className={styles.grid}>
        {tournaments.map((tournament, column) => (
          <div key={column}>
            <h2 className={styles.h2}>{tournament.title}</h2>
            <ul>
              {tournament.editions.map((edition, index) => (
                <li className={styles.li} key={`${column}-${index}`}>
                  <Link href={edition.link} className={styles.link}>{edition.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  )
}
