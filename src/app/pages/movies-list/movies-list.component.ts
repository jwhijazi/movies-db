import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Movie } from 'src/app/models';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  constructor(private service: MovieService) { }
  page: number = 1;
  title: string = '';
  year: number = -1;

  noMovies: boolean = false;
  error?: string;

  movies: Movie[] = [
    // {
    //   Title: "Inception: The Cobol Job",
    //   Year: "2010",
    //   Rated: "Not Rated",
    //   Released: "07 Dec 2010",
    //   Runtime: "15 min",
    //   Genre: "Animation, Short, Sci-Fi",
    //   Director: "Ian Kirby",
    //   Writer: "Christopher Nolan (based on characters by)",
    //   Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Lukas Haas",
    //   Plot: "This Inception prequel unfolds courtesy of a beautiful Motion Comic, and explains how Cobb, Arthur and Nash were enlisted by Cobol Engineering. Diehard fans of the film will be especially interested in this one.",
    //   Language: "English",
    //   Country: "USA",
    //   Awards: "N/A",
    //   Poster: "https://m.media-amazon.com/images/M/MV5BMjE0NGIwM2EtZjQxZi00ZTE5LWExN2MtNDBlMjY1ZmZkYjU3XkEyXkFqcGdeQXVyNjMwNzk3Mjk@._V1_SX300.jpg",
    //   Ratings: [
    //     {
    //       Source: "Internet Movie Database",
    //       Value: "7.8/10"
    //     }
    //   ],
    //   Metascore: "N/A",
    //   imdbRating: "7.8",
    //   imdbVotes: "2,160",
    //   imdbID: "tt5295894",
    //   Type: "movie",
    //   DVD: "N/A",
    //   BoxOffice: "N/A",
    //   Production: "N/A",
    //   Website: "N/A",
    //   Response: "True"
    // },
    // {
    //   Title: "Inception",
    //   Year: "2010",
    //   Rated: "PG-13",
    //   Released: "16 Jul 2010",
    //   Runtime: "148 min",
    //   Genre: "Action, Adventure, Sci-Fi",
    //   Director: "Christopher Nolan",
    //   Writer: "Christopher Nolan",
    //   Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    //   Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    //   Language: "English, Japanese, French",
    //   Country: "United States, United Kingdom",
    //   Awards: "Won 4 Oscars. 158 wins & 220 nominations total",
    //   Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    //   Ratings: [
    //     {
    //       Source: "Internet Movie Database",
    //       Value: "8.8/10"
    //     },
    //     {
    //       Source: "Rotten Tomatoes",
    //       Value: "87%"
    //     },
    //     {
    //       Source: "Metacritic",
    //       Value: "74/100"
    //     }
    //   ],
    //   Metascore: "74",
    //   imdbRating: "8.8",
    //   imdbVotes: "2,328,647",
    //   imdbID: "tt1375666",
    //   Type: "movie",
    //   DVD: "07 Dec 2010",
    //   BoxOffice: "$292,587,330",
    //   Production: "N/A",
    //   Website: "N/A",
    //   Response: "True"
    // },
    // {
    //   Title: "The Crack: Inception",
    //   Year: "2019",
    //   Rated: "N/A",
    //   Released: "04 Oct 2019",
    //   Runtime: "122 min",
    //   Genre: "Drama",
    //   Director: "José Luis Garci",
    //   Writer: "José Luis Garci, Javier Muñoz",
    //   Actors: "Carlos Santos, Miguel Ángel Muñoz, Luisa Gavasa",
    //   Plot: "In this prequel, Germán Areta leaves his position as a policeman to become a private detective in post-Francoist Spain.",
    //   Language: "Spanish, English",
    //   Country: "Spain",
    //   Awards: "4 wins & 7 nominations",
    //   Poster: "https://m.media-amazon.com/images/M/MV5BZTU1M2U4OWUtZTQ5OS00OWM1LTljN2EtMWJmZDgxNzUwZGNkXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_SX300.jpg",
    //   Ratings: [
    //     {
    //       Source: "Internet Movie Database",
    //       Value: "6.6/10"
    //     }
    //   ],
    //   Metascore: "N/A",
    //   imdbRating: "6.6",
    //   imdbVotes: "786",
    //   imdbID: "tt6793710",
    //   Type: "movie",
    //   DVD: "N/A",
    //   BoxOffice: "N/A",
    //   Production: "N/A",
    //   Website: "N/A",
    //   Response: "True"
    // },
    // {
    //   Title: "Inception: Jump Right Into the Action",
    //   Year: "2010",
    //   Rated: "N/A",
    //   Released: "07 Dec 2010",
    //   Runtime: "44 min",
    //   Genre: "Documentary, Short",
    //   Director: "N/A",
    //   Writer: "N/A",
    //   Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Christopher Nolan",
    //   Plot: "Join filmmaker Christopher Nolan and his cast and crew as they reveal the secrets of Inception, its development, characters, performances, story and jaw-dropping special effects in this solid 14-segments piece.",
    //   Language: "English",
    //   Country: "USA",
    //   Awards: "N/A",
    //   Poster: "https://m.media-amazon.com/images/M/MV5BZGFjOTRiYjgtYjEzMS00ZjQ2LTkzY2YtOGQ0NDI2NTVjOGFmXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_SX300.jpg",
    //   Ratings: [
    //     {
    //       Source: "Internet Movie Database",
    //       Value: "8.6/10"
    //     }
    //   ],
    //   Metascore: "N/A",
    //   imdbRating: "8.6",
    //   imdbVotes: "905",
    //   imdbID: "tt5295990",
    //   Type: "movie",
    //   DVD: "N/A",
    //   BoxOffice: "N/A",
    //   Production: "N/A",
    //   Website: "N/A",
    //   Response: "True"
    // },
    // {
    //   Title: "Cyberalien: Inception",
    //   Year: "2017",
    //   Rated: "N/A",
    //   Released: "07 Jun 2017",
    //   Runtime: "4 min",
    //   Genre: "Short, Sci-Fi",
    //   Director: "Viktor Acidhouse",
    //   Writer: "Vladislav Averbakh",
    //   Actors: "Viktor Acidhouse",
    //   Plot: "N/A",
    //   Language: "English",
    //   Country: "Ukraine",
    //   Awards: "N/A",
    //   Poster: "N/A",
    //   Ratings: [
    //     {
    //       Source: "Internet Movie Database",
    //       Value: "1.0/10"
    //     }
    //   ],
    //   Metascore: "N/A",
    //   imdbRating: "1.0",
    //   imdbVotes: "23",
    //   imdbID: "tt7926130",
    //   Type: "movie",
    //   DVD: "N/A",
    //   BoxOffice: "N/A",
    //   Production: "N/A",
    //   Website: "N/A",
    //   Response: "True"
    // },
    // {
    //   Title: "Inception: 4Movie Premiere Special",
    //   Year: "2010",
    //   Rated: "N/A",
    //   Released: "16 Jul 2010",
    //   Runtime: "N/A",
    //   Genre: "Documentary",
    //   Director: "Steve Kemsley",
    //   Writer: "Steven Vinacour",
    //   Actors: "Rick Edwards",
    //   Plot: "N/A",
    //   Language: "English",
    //   Country: "United Kingdom",
    //   Awards: "N/A",
    //   Poster: "N/A",
    //   Ratings: [
    //     {
    //       Source: "Internet Movie Database",
    //       Value: "7.9/10"
    //     }
    //   ],
    //   Metascore: "N/A",
    //   imdbRating: "7.9",
    //   imdbVotes: "40",
    //   imdbID: "tt1686778",
    //   Type: "movie",
    //   DVD: "N/A",
    //   BoxOffice: "N/A",
    //   Production: "N/A",
    //   Website: "N/A",
    //   Response: "True"
    // },
    // {
    //   Title: "Bikini Inception",
    //   Year: "2015",
    //   Rated: "N/A",
    //   Released: "01 Jan 2017",
    //   Runtime: "106 min",
    //   Genre: "Comedy",
    //   Director: "John Sjogren",
    //   Writer: "John Sjogren",
    //   Actors: "Paizley Bishop, Byamba, Taylor Conzelman",
    //   Plot: "Two Arctic Lab janitors perform unauthorized experiments transporting them to Malibu California with beautiful girls and a Brazilian PhD Student.",
    //   Language: "English",
    //   Country: "United States",
    //   Awards: "N/A",
    //   Poster: "https://m.media-amazon.com/images/M/MV5BNDk3NTNmNGEtOWJkYi00NGEyLThkZDQtOTBlZmRhN2IwYTk0XkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_SX300.jpg",
    //   Ratings: [
    //     {
    //       Source: "Internet Movie Database",
    //       Value: "5.6/10"
    //     }
    //   ],
    //   Metascore: "N/A",
    //   imdbRating: "5.6",
    //   imdbVotes: "19",
    //   imdbID: "tt8269586",
    //   Type: "movie",
    //   DVD: "N/A",
    //   BoxOffice: "N/A",
    //   Production: "N/A",
    //   Website: "N/A",
    //   Response: "True"
    // },
    // {
    //   Title: "WWA: The Inception",
    //   Year: "2001",
    //   Rated: "N/A",
    //   Released: "26 Oct 2001",
    //   Runtime: "N/A",
    //   Genre: "Action, Sport",
    //   Director: "N/A",
    //   Writer: "Jeremy Borash",
    //   Actors: "Bret Hart, Jeff Jarrett, Brian James, David Heath",
    //   Plot: "N/A",
    //   Language: "English",
    //   Country: "Australia",
    //   Awards: "N/A",
    //   Poster: "https://m.media-amazon.com/images/M/MV5BNTEyNGJjMTMtZjZhZC00ODFkLWIyYzktN2JjMTcwMmY5MDJlXkEyXkFqcGdeQXVyNDkwMzY5NjQ@._V1_SX300.jpg",
    //   Ratings: [
    //     {
    //       Source: "Internet Movie Database",
    //       Value: "5.9/10"
    //     }
    //   ],
    //   Metascore: "N/A",
    //   imdbRating: "5.9",
    //   imdbVotes: "24",
    //   imdbID: "tt0311992",
    //   Type: "movie",
    //   DVD: "N/A",
    //   BoxOffice: "N/A",
    //   Production: "N/A",
    //   Website: "N/A",
    //   Response: "True"
    // },
    // {
    //   Title: "Inception: In 60 Seconds",
    //   Year: "2013",
    //   Rated: "N/A",
    //   Released: "22 Mar 2013",
    //   Runtime: "N/A",
    //   Genre: "Short, Comedy",
    //   Director: "Nadav Elovic, Ben Oringer",
    //   Writer: "Nadav Elovic, Ben Oringer",
    //   Actors: "Nadav Elovic, Omer Goldberg, Ben Oringer",
    //   Plot: "N/A",
    //   Language: "English",
    //   Country: "Israel",
    //   Awards: "N/A",
    //   Poster: "N/A",
    //   Ratings: [
    //     {
    //       Source: "Internet Movie Database",
    //       Value: "5.8/10"
    //     }
    //   ],
    //   Metascore: "N/A",
    //   imdbRating: "5.8",
    //   imdbVotes: "19",
    //   imdbID: "tt3262402",
    //   Type: "movie",
    //   DVD: "N/A",
    //   BoxOffice: "N/A",
    //   Production: "N/A",
    //   Website: "N/A",
    //   Response: "True"
    // },
    // {
    //   Title: "Inception",
    //   Year: "2014",
    //   Rated: "N/A",
    //   Released: "12 Feb 2014",
    //   Runtime: "11 min",
    //   Genre: "Short, Drama, Mystery",
    //   Director: "Danial Hajibarat",
    //   Writer: "Danial Hajibarat",
    //   Actors: "Erfan Refahatnia, Danial Hajibarat, Shahrzad Nouri",
    //   Plot: "Young man (Erfan) wants to do something important,It has a lot of risk for him But he must make a decision,Though everyone around them opposes doing so,The boy decides that.",
    //   Language: "Persian",
    //   Country: "Iran",
    //   Awards: "N/A",
    //   Poster: "https://m.media-amazon.com/images/M/MV5BYWJmYWJmNWMtZTBmNy00M2MzLTg5ZWEtOGU5ZWRiYTE0ZjVmXkEyXkFqcGdeQXVyNzkyOTM2MjE@._V1_SX300.jpg",
    //   Ratings: [
    //     {
    //       Source: "Internet Movie Database",
    //       Value: "8.9/10"
    //     }
    //   ],
    //   Metascore: "N/A",
    //   imdbRating: "8.9",
    //   imdbVotes: "157",
    //   imdbID: "tt7321322",
    //   Type: "movie",
    //   DVD: "N/A",
    //   BoxOffice: "N/A",
    //   Production: "N/A",
    //   Website: "N/A",
    //   Response: "True"
    // }
  ];
  total: number = 0;
  itemsPerPage: number = 10;
  loading: boolean = false;

  years: any[] = [
    {
      text: 'All',
      val: -1,
    }
  ];


  ngOnInit(): void {
    let today = new Date();
    let year = today.getFullYear();

    while (year != today.getFullYear() - 100) {
      this.years.push({ text: year.toString(), val: year });
      year--;
    }
  }

  getData(){
    if(this.title.length < 2)
      return;

    this.movies = [];
    this.total = 0;
    this.noMovies = false;
    this.loading = true;
    this.error = undefined;

    this.service.searchMoviesByTitle(this.title, this.year).pipe(
      catchError(err=>{
        this.loading = false;
        this.error = err.error.Error;
        return of();
      })
    ).subscribe(
      (data) => {
        if (data.total > 0) {
          this.total = data.total;
          this.page = 1;
          this.getMoviesDetailedList(this.page);
        }
        else {
          this.loading = false;
          this.noMovies = true;
        }
      }
    );
  }

  keyEnterPress(event: any) {
    if (event.keyCode == 13) {
      this.getData();
    }
  }

  getMoviesDetailedList(p: number) {
    this.movies = [];
    this.loading = true;
    this.service.getMoviesDetailsList(this.title.toLowerCase().trim(), this.year, p).subscribe(movies => {
      this.movies = movies;
      this.loading = false;
    });
  }

  togglePage(forward: boolean){
    this.page = this.page + (forward ? 1 : -1);
    this.getMoviesDetailedList(this.page);
  }

}
