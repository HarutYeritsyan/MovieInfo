import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Person } from '../../models/person';
import { Movie } from '../../models/movie';
import { ImageUrlComponents } from '../../models/image-url-components';

/*
  Generated class for the NcmMoviesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NcmMoviesProvider {
	tmbdApiKey = 'b9a4a0ab56e0e06716f2e91e9a0ed8a3';
	tmdbApiUrl = 'https://api.themoviedb.org/3';

  constructor(public http: Http) {
    console.log('Hello NcmMoviesProvider Provider');
  }

  getPerson(person_id: number):Observable<Person> {
  	return this.http.get(`${this.tmdbApiUrl}/person/${person_id}?api_key=${this.tmbdApiKey}&language=en-US`)
  		.map(res => <Person>res.json());
  }

  getMoviesOfPerson(person_id: number):Observable<Movie[]> {
  	return this.http.get(`${this.tmdbApiUrl}/person/${person_id}/movie_credits?api_key=${this.tmbdApiKey}&language=en-US`)
  		.map(res => <Movie[]>(res.json().cast));
  }

  getMovieDetails(movie_id: number):Observable<Movie> {
  	return this.http.get(`${this.tmdbApiUrl}/movie/${movie_id}?api_key=${this.tmbdApiKey}&language=en-US`)
  		.map(res => <Movie>res.json());
  }

  getImageUrlComponents():Observable<ImageUrlComponents> {
  	return this.http.get(`${this.tmdbApiUrl}/configuration?api_key=${this.tmbdApiKey}`)
  		.map(res => <ImageUrlComponents>(res.json().images));
  }

  searchMoviesOfPerson(person_id: number, term: string):Observable<Movie[]> {
  	//filter the results of moviesOfPerson
  	return this.http.get(`${this.tmdbApiUrl}/person/${person_id}/movie_credits?api_key=${this.tmbdApiKey}&language=en-US`)
  		.map(res => (<Movie[]>(res.json().cast)).filter(item => {
  			return item.original_title.toLowerCase().search(term.toLowerCase()) != -1;
  		}));
  }
}
