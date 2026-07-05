// lib/fetchTournamentData.ts
export type TournamentType = 'euromen' | 'eurowomen' | 'worldcupmen' | 'worldcupwomen';

export async function fetchTournamentData(
  type: TournamentType,
  year: number,
  lang: string = 'en'
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ||'https://euro21-api.vercel.app';
  const url = `${baseUrl}/${type}?year=${year}&lang=${lang}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  
  return await response.json();
}
