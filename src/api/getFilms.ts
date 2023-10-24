import axios from "axios";

export type Film = {
    Title: string;
    Poster: string;
    Type: string;
    imdbID: string;
}
type films = {
    Search: Film[];
}
type Props = {
    currentPage: number;
    searchParams: URLSearchParams;
}

export async function getFilms({currentPage, searchParams} : Props) {
    searchParams.delete('apikey');
    searchParams.delete('page');
    const response = axios.get(`http://www.omdbapi.com/?apikey=966f2bf4&${searchParams || ''}&page=${currentPage}`);
    const answer: films = (await response).data;
    return answer;
}