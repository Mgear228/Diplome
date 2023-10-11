import axios from "axios";

export type film = {
    Title: string;
    Poster: string;
    Type: string;
    imdbID: string;
}
type films = {
    Search: film[];
}
type props = {
    currentPage: number;
    searchParams: URLSearchParams;
}

export async function getFilms({currentPage, searchParams} : props) {
    searchParams.delete('apikey');
    searchParams.delete('page');
    const response = axios.get(`http://www.omdbapi.com/?apikey=966f2bf4&${searchParams || ''}&page=${currentPage}`);
    const answer: films = (await response).data;
    return answer;
}