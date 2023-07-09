export function getGridValue(length: number) {
  switch (length) {
    case 16:
      return 4
    case 15:
      return 3
    case 12:
      return 4
    case 10:
      return 4
    case 9:
      return 3
    case 8:
      return 4
    case 6:
      return 3
    case 4:
      return 4
    case 3:
      return 3
    case 2:
      return 2
    case 1:
      return 1
    default:
      return 3
  }
}

export function getAssociation20(winningCombination: string) {
  switch (winningCombination) {
    case "ABCD":
    case "ABCE":
    case "ABCF":
      return [3, 7, 5, 2]
    case "ABDE":
    case "ABDF":
      return [7, 5, 3, 2]
    case "ABEF":
      return [5, 7, 3, 2]
    case "ACDE":
    case "ACDF":
    case "ADEF":
    case "BCDF":
    case "BCEF":
    case "BDEF":
    case "CDEF":
      return [5, 7, 2, 3]
    case "BCDE":
      return [7, 5, 2, 3]
    default:
      return []
  }
}

export function getAssociation16(winningCombination: string) {
  switch(winningCombination) {
    case "ABCD":
    case "ABCE":
    case "ABCF":
      return [3, 7, 5, 1]
    case "ABDE":
    case "ABDF":
      return [7, 5, 3, 1]
    case "ABEF":
      return [5, 7, 3, 1]
    case "ACDE":
    case "ACDF":
    case "ADEF":
    case "BCDF":
    case "BCEF":
    case "BDEF":
    case "CDEF":
      return [5, 7, 1, 3]
    case "BCDE":
      return [7, 5, 1, 3]
    default:
      return []
  }
}

export const getKoTeam = (matchArray: MatchArray, indexMA: number, teamsA: Team | string, indexTA: number, teamsB: Team | string, indexTB: number) => {
  const teamAGoal = Array.isArray(matchArray) && typeof indexMA === "number" 
    ? matchArray[indexMA].goals[0] 
    : typeof matchArray === 'object' && 'goals' in matchArray 
      ? matchArray.goals[0] 
      : null
  const teamBGoal = Array.isArray(matchArray) && typeof indexMA === "number" 
    ? matchArray[indexMA].goals[1] 
    : typeof matchArray === 'object' && 'goals' in matchArray
      ? matchArray.goals[1]
      : null
  if (typeof teamAGoal === "number" && typeof teamBGoal === "number") {
    if (teamAGoal > teamBGoal) {
      if(typeof teamsA === "object" && Array.isArray(teamsA) && teamsA.length > -1) {
        const teamA = teamsA[indexTA]
        return teamA === "object" && teamA.hasOwnProperty("team") ? teamA.team : typeof teamA === "string" ? teamA : null
      } 
      return null
    } else if (teamBGoal > teamAGoal) {
      if(typeof teamsB === "object" && Array.isArray(teamsB) && teamsB.length > -1) {
        const teamB = teamsB[indexTB]
        return teamB === "object" && teamB.hasOwnProperty("team") ? teamB.team : typeof teamB === "string" ? teamB : null
      } 
      return null
    } else {
      const teamA = typeof teamsA === "object" && Array.isArray(teamsA) && teamsA.length > -1 ? teamsA[indexTA] : null
      const teamB = typeof teamsB === "object" && Array.isArray(teamsB) && teamsB.length > -1 ? teamsB[indexTB] : null 
      const tA = teamA === "object" && teamA.hasOwnProperty("team") 
      ? teamA.team 
      : typeof teamA === "object" && Array.isArray(teamA)
        ? teamA
        : typeof teamA === "string" 
          ? teamA 
          : null 
      const tB = teamB === "object" && teamA.hasOwnProperty("team") 
      ? teamB.team 
      : typeof teamB === "object" && Array.isArray(teamB) 
        ? teamB
        : typeof teamB === "string" ? teamB : null
      const array = tA != null && tB != null ? [tA, tB].flat() : null 
      return array
    }
  } else {
    const teamA = typeof teamsA === "object" && Array.isArray(teamsA) && teamsA.length > -1 ? teamsA[indexTA] : null
      const teamB = typeof teamsB === "object" && Array.isArray(teamsB) && teamsB.length > -1 ? teamsB[indexTB] : null 
      const tA = teamA === "object" && teamA.hasOwnProperty("team") 
      ? teamA.team 
      : typeof teamA === "object" && Array.isArray(teamA)
        ? teamA
        : typeof teamA === "string" 
          ? teamA 
          : null 
      const tB = teamB === "object" && teamA.hasOwnProperty("team") 
      ? teamB.team 
      : typeof teamB === "object" && Array.isArray(teamB) 
        ? teamB
        : typeof teamB === "string" ? teamB : null
      const array = tA != null && tB != null ? [tA, tB].flat() : null 
      return array
  }
}

export const getLoser = (matchArray: MatchArray, indexMA: number, teamsA: Team | string, indexTA: number, teamsB: Team | string, indexTB: number) => {
  const teamAGoal = Array.isArray(matchArray) && typeof indexMA === "number" 
    ? matchArray[indexMA].goals[0] 
    : typeof matchArray === 'object' && 'goals' in matchArray
      ? matchArray.goals[0]
      : null
  const teamBGoal = Array.isArray(matchArray) && typeof indexMA === "number" 
    ? matchArray[indexMA].goals[1] 
    : typeof matchArray === 'object' && 'goals' in matchArray
      ? matchArray.goals[1]
      : null
  if (typeof teamAGoal === "number" && typeof teamBGoal === "number") {
    if (teamAGoal < teamBGoal) {
      if(typeof teamsA === "object" && Array.isArray(teamsA) && teamsA.length > -1) {
        const teamA = teamsA[indexTA]
        return teamA === "object" && teamA.hasOwnProperty("team") ? teamA.team : typeof teamA === "string" ? teamA : null
      } 
      return null
    } else if (teamBGoal < teamAGoal) {
      if(typeof teamsB === "object" && Array.isArray(teamsB) && teamsB.length > -1) {
        const teamB = teamsB[indexTB]
        return teamB === "object" && teamB.hasOwnProperty("team") ? teamB.team : typeof teamB === "string" ? teamB : null
      } 
      return null
    } else {
      const teamA = typeof teamsA === "object" && Array.isArray(teamsA) && teamsA.length > -1 ? teamsA[indexTA] : null
      const teamB = typeof teamsB === "object" && Array.isArray(teamsB) && teamsB.length > -1 ? teamsB[indexTB] : null 
      const tA = teamA === "object" && teamA.hasOwnProperty("team") 
      ? teamA.team 
      : typeof teamA === "object" && Array.isArray(teamA)
        ? teamA
        : typeof teamA === "string" 
          ? teamA 
          : null 
      const tB = teamB === "object" && teamA.hasOwnProperty("team") 
      ? teamB.team 
      : typeof teamB === "object" && Array.isArray(teamB) 
        ? teamB
        : typeof teamB === "string" ? teamB : null
      const array = tA != null && tB != null ? [tA, tB].flat() : null 
      return array
    }
  } else {
    const teamA = typeof teamsA === "object" && Array.isArray(teamsA) && teamsA.length > -1 ? teamsA[indexTA] : null
      const teamB = typeof teamsB === "object" && Array.isArray(teamsB) && teamsB.length > -1 ? teamsB[indexTB] : null 
      const tA = teamA === "object" && teamA.hasOwnProperty("team") 
      ? teamA.team 
      : typeof teamA === "object" && Array.isArray(teamA)
        ? teamA
        : typeof teamA === "string" 
          ? teamA 
          : null 
      const tB = teamB === "object" && teamA.hasOwnProperty("team") 
      ? teamB.team 
      : typeof teamB === "object" && Array.isArray(teamB) 
        ? teamB
        : typeof teamB === "string" ? teamB : null
      const array = tA != null && tB != null ? [tA, tB].flat() : null 
      return array
  }
}

export const getChampion = (matchArray: MatchArray, teamA: string, teamB: string) => {
  const teamAGoal = matchArray.goals[0]
  const teamBGoal = matchArray.goals[1]
  if (typeof teamAGoal === 'number' && typeof teamBGoal === 'number') {
    if (teamAGoal > teamBGoal) return [teamA].flat()
    if (teamBGoal > teamAGoal) return [teamB].flat()
    return [ teamA, teamB ].flat()
  } else {
    return [ teamA, teamB ].flat()
  }
}

export const getKoTeams = (matchArray: MatchArray, index: number, teamA: Team | string, teamB: Team | string) => {
  const teamAGoal = Array.isArray(matchArray) && typeof index === "number" 
    ? matchArray[index].goals[0] 
    : typeof matchArray === 'object' && 'goals' in matchArray
      ? matchArray.goals[0]
      : null
  const teamBGoal = Array.isArray(matchArray) && typeof index === "number" 
    ? matchArray[index].goals[1] 
    : typeof matchArray === 'object' && 'goals' in matchArray
      ? matchArray.goals[1]
      : null
  if (typeof teamAGoal === "number" && typeof teamBGoal === "number") {
    if (teamAGoal > teamBGoal) {
      return typeof teamA === "object" && teamA.hasOwnProperty("team") ? teamA.team : typeof teamA === "string" ? teamA : null
    } else if (teamBGoal > teamAGoal) {
      return typeof teamB === "object" && teamB.hasOwnProperty("team") ? teamB.team : typeof teamB === "string" ? teamB : null
    } else {
      if (teamA != null && teamB != null) {
        const tA = typeof teamA === "object" && teamA.hasOwnProperty("team") 
        ? teamA.team 
        : typeof teamA === "object" && Array.isArray(teamA) 
          ? teamA 
          : typeof teamA === "string" 
            ? teamA 
            : null 
        const tB = typeof teamB === "object" && teamB.hasOwnProperty("team") 
        ? teamB.team 
        : typeof teamB === "object" && Array.isArray(teamB) 
          ? teamB
          : typeof teamB === "string" 
            ? teamB 
            : null 
        return [tA, tB].flat()
      }
      return null
    }
  } else {
    if (teamA != null && teamB != null) {
      const tA = typeof teamA === "object" && teamA.hasOwnProperty("team") 
      ? teamA.team 
      : typeof teamA === "object" && Array.isArray(teamA) 
        ? teamA 
        : typeof teamA === "string" 
          ? teamA 
          : null 
      const tB = typeof teamB === "object" && teamB.hasOwnProperty("team") 
      ? teamB.team 
      : typeof teamB === "object" && Array.isArray(teamB) 
        ? teamB
        : typeof teamB === "string" 
          ? teamB 
          : null 
      return [tA, tB].flat()
    }
    return null
  }
}
