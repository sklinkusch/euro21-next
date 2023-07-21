type LocaleLang = {
  "EChampion": string
	"WChampion": string
	"Difference": string
	"ExtraTime": string
	"FairPlay": string
	"Final": string
	"Goals": string
	"GoldenGoal": string
	"Group": string
	"Penalties": string
	"Pts": string
	"Quarterfinal": string
	"Round16": string
	"Semifinal": string
	"SilverGoal": string
	"Team": string
	"Euro": string
	"Victories": string
	"WorldCup": string
	"Place3": string
	"Back": string
	"SocTurn": string
	"Overview": string
	"EuroMen": string
	"EuroWomen": string
	"WCMen": string
	"WCWomen": string
}

type Locales = { [key: string]: LocaleLang }

declare const locales: Locales;
export default locales;