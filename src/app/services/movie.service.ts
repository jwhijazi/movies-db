import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, from, map, mergeMap, Observable, switchMap, toArray } from 'rxjs';
import { Data, Movie, Search, SearchResult } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl: string = environment.baseUrl + environment.apiKey;

  constructor(private http: HttpClient) { }

  public searchMoviesByTitle(title: string, year?: number): Observable<Data> {
    let url = `${this.baseUrl}&s=${title}&type=movie`;
    if (year && year > -1)
      url += `&y=${year}`;

    return this.http.get<SearchResult>(url)
      .pipe(
        map((result: SearchResult) => {
          let movies: Movie[] = [];
          let response: boolean = result.Response == 'True';
          let d: Data = { 
            response: response, 
            error: response ? '' : result.Error,
            movies: movies, 
            total: response ? +result.totalResults : 0 };
          return d;
        }),
      )
  }

  //This merge Search then details together.
  public getMoviesDetailsList(title: string, year?: number, page: number = 1): Observable<Movie[]> {
    let url = `${this.baseUrl}&s=${title}&type=movie&page=${page}`;
    if (year && year > -1)
      url  += `&y=${year}`;

    return this.http.get<SearchResult>(url)
      .pipe(
        mergeMap((result: SearchResult) => {
          return from(result.Search).pipe(
            mergeMap((search: Search) => {
              return this.http.get<Movie>(`${this.baseUrl}&i=${search.imdbID}`);
            }),
            toArray(),
          )
        })
      )
  }

  // public getMoviesDetailsList(imdbIds: string[], page: number = 1): Observable<Movie[]> {
  //   return from(imdbIds).pipe(
  //     mergeMap((id: string) => {
  //       return this.http.get<Movie>(`${this.baseUrl}&i=${id}`);
  //     }),
  //     toArray()
  //   )
  // }
}
