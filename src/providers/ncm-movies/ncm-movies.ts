import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Person } from '../../models/person';
import { Movie } from '../../models/movie';
import { ImageUrlComponents } from '../../models/image-url-components';

import { TransformOutputProvider } from '../transform-output/transform-output';

/*
  Generated class for the NcmMoviesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NcmMoviesProvider {
	tmbdApiKey = 'b9a4a0ab56e0e06716f2e91e9a0ed8a3';
	tmdbApiUrl = 'https://api.themoviedb.org/3';
	imdb_id = "nm0000115"; //hardcoded external id from IMDB
	language = "en-US";
	external_source = "imdb_id";

  constructor(public http: Http, private transformOutputProvider: TransformOutputProvider) {
    console.log('Hello NcmMoviesProvider Provider');
  }

  getPersonId():Observable<number> {
  	return this.http.get(`${this.tmdbApiUrl}/find/${this.imdb_id}?api_key=${this.tmbdApiKey}&language=${this.language}&external_source=${this.external_source}`)
  		.map(res => (<Person[]>res.json().person_results)[0].id);
  }

  getPerson(person_id: number):Observable<Person> {
  	return this.http.get(`${this.tmdbApiUrl}/person/${person_id}?api_key=${this.tmbdApiKey}&language=${this.language}`)
  		.map(res => this.transformOutputProvider.transformPerson(<Person>res.json()) );
  }

  getMoviesOfPerson(person_id: number):Observable<Movie[]> {
  	return this.http.get(`${this.tmdbApiUrl}/person/${person_id}/movie_credits?api_key=${this.tmbdApiKey}&language=${this.language}`)
  		.map(res => (<Movie[]>(res.json().cast))
  				.map(movie => this.transformOutputProvider.transformMovie(movie)) 
  		);
  }

  //getPersonId + getMoviesOfPerson
  getMoviesOfPersonChained():Observable<Movie[]> {
    //getPersonId from external_id
    return this.http.get(`${this.tmdbApiUrl}/find/${this.imdb_id}?api_key=${this.tmbdApiKey}&language=${this.language}&external_source=${this.external_source}`)
      .map(res => (<Person[]>res.json().person_results)[0].id)
        //getMoviesOfPerson
        .flatMap(person_id => {
          return this.http.get(`${this.tmdbApiUrl}/person/${person_id}/movie_credits?api_key=${this.tmbdApiKey}&language=${this.language}`)
            //return Observable for the list of Movies of the actor
            .map(res => (<Movie[]>(res.json().cast))
              .map(movie => this.transformOutputProvider.transformMovie(movie)) 
            );
        })
  } 

  getMovieDetails(movie_id: number):Observable<Movie> {
  	return this.http.get(`${this.tmdbApiUrl}/movie/${movie_id}?api_key=${this.tmbdApiKey}&language=${this.language}`)
  		.map(res => this.transformOutputProvider.transformMovie(<Movie>res.json()));
  }

  getImageUrlComponents():Observable<ImageUrlComponents> {
  	return this.http.get(`${this.tmdbApiUrl}/configuration?api_key=${this.tmbdApiKey}`)
  		.map(res => <ImageUrlComponents>(res.json().images));
  }

  searchMoviesOfPerson(person_id: number, term: string):Observable<Movie[]> {
  	//filter the results of moviesOfPerson
  	return this.http.get(`${this.tmdbApiUrl}/person/${person_id}/movie_credits?api_key=${this.tmbdApiKey}&language=${this.language}`)
  		.map(res => (<Movie[]>(res.json().cast)).filter(item => {
  			return item.original_title.toLowerCase().search(term.toLowerCase()) != -1;
  		}));
  }
}
