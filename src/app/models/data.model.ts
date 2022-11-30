import { Movie } from "./movie.model";

export interface Data{
    movies: Movie[];
    response: boolean;
    total: number;
    error?: string;
}