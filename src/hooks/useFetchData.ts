import { useState, useEffect } from 'react';
import { fetchTournamentData, type TournamentType } from '@/utils/fetchTournamentData';

const useFetchData = (type: TournamentType, year: number) => {
  const [matches, setMatches] = useState<Matches>({})
  const [lang, setLang] = useState<string>('en');
  useEffect(() => {
    async function fetchData () {
      const longLang = navigator && "language" in navigator ? navigator.language : "en"
      const mylang = longLang.length > 0 ? longLang.substring(0,2) : "en"
      if (mylang !== 'en') {
        const data = await fetchTournamentData(type, year, mylang);
        setMatches(data);
        setLang(mylang);
      }
    }
    fetchData()
  },[type, year])
  return { matches, lang };
};

export { useFetchData };