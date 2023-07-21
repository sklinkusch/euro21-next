'use client'
import styles from './page.module.css'
import { useEffect } from 'react'
import { localeName as locales } from '@/components/countries' 
import Link from 'next/link'

const tournaments = [
  // {
  //   title: `${locales("EuroMen")}`,
  //   editions: [
  //     {
  //       link: "/euromen/2020",
  //       title: `${locales("Euro")} 2020`
  //     },
  //     {
  //       link: "/euromen/2016",
  //       title: `${locales("Euro")} 2016`
  //     },
  //     {
  //       link: "/euromen/2012",
  //       title: `${locales("Euro")} 2012`
  //     },
  //     {
  //       link: "/euromen/2008",
  //       title: `${locales("Euro")} 2008`
  //     },
  //     {
  //       link: "/euromen/2004",
  //       title: `${locales("Euro")} 2004`
  //     },
  //   ],
  // },
  // {
  //   title: `${locales("EuroWomen")}`,
  //   editions: [
  //     {
  //       link: "/eurowomen/2022",
  //       title: `${locales("Euro")} 2022`
  //     },
  //     {
  //       link: "/eurowomen/2017",
  //       title: `${locales("Euro")} 2017`
  //     },
  //     {
  //       link: "/eurowomen/2013",
  //       title: `${locales("Euro")} 2013`
  //     },
  //     {
  //       link: "/eurowomen/2009",
  //       title: `${locales("Euro")} 2009`
  //     },
  //     {
  //       link: "/eurowomen/2005",
  //       title: `${locales("Euro")} 2005`
  //     },
  //     {
  //       link: "/eurowomen/2001",
  //       title: `${locales("Euro")} 2001`
  //     },
  //     {
  //       link: "/eurowomen/1997",
  //       title: `${locales("Euro")} 1997`
  //     }
  //   ],
  // },
  {
    title: `${locales("WCMen")}`,
    editions: [
      {
        link: "/worldcupmen/2022",
        title: `${locales("WorldCup")} 2022`
      },
      {
        link: "/worldcupmen/2018",
        title: `${locales("WorldCup")} 2018`
      },
      {
        link: "/worldcupmen/2014",
        title: `${locales("WorldCup")} 2014`
      },
      {
        link: "/worldcupmen/2010",
        title: `${locales("WorldCup")} 2010`
      },
      {
        link: "/worldcupmen/2006",
        title: `${locales("WorldCup")} 2006`
      },
      {
        link: "/worldcupmen/2002",
        title: `${locales("WorldCup")} 2002`
      }
      // {
      //   link: "/worldcupmen/1998",
      //   title: `${locales("WorldCup")} 1998`
      // },
      // {
      //   link: "/worldcupmen/1994",
      //   title: `${locales("WorldCup")} 1994`
      // },
      // {
      //   link: "/worldcupmen/1990",
      //   title: `${locales("WorldCup")} 1990`
      // }
    ],
  },
  {
    title: `${locales("WCWomen")}`,
    editions: [
      {
        link: "/worldcupwomen/2023",
        title: `${locales("WorldCup")} 2023`
      },
      {
        link: "/worldcupwomen/2019",
        title: `${locales("WorldCup")} 2019`
      },
      {
        link: "/worldcupwomen/2015",
        title: `${locales("WorldCup")} 2015`
      },
      {
        link: "/worldcupwomen/2011",
        title: `${locales("WorldCup")} 2011`
      }
      // {
      //   link: "/worldcupwomen/2007",
      //   title: `${locales("WorldCup")} 2007`
      // },
      // {
      //   link: "/worldcupwomen/2003",
      //   title: `${locales("WorldCup")} 2003`
      // },
      // {
      //   link: "/worldcupwomen/1999",
      //   title: `${locales("WorldCup")} 1999`
      // },
      // {
      //   link: "/worldcupwomen/1995",
      //   title: `${locales("WorldCup")} 1995`
      // },
      // {
      //   link: "/worldcupwomen/1991",
      //   title: `${locales("WorldCup")} 1991`
      // }
    ],
  }
]

export default function Home() {
  useEffect(() => {
    document.title = locales("SocTurn")
  },[])
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>{locales("Overview")}</h1>
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
