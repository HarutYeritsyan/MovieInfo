import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import moment from 'moment';

import { Movie } from '../../models/movie';
import { Person } from '../../models/person';

import { LanguageNameParserProvider } from '../language-name-parser/language-name-parser';

/*
  Generated class for the TransformOutputProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransformOutputProvider {
	emptyDate:string = "...";

  constructor(public http: Http, private languageNameParserProvider: LanguageNameParserProvider) {
  }

  transformMovie(movie: Movie):Movie {
  	let transformedMovie = {
		id: movie.id,
		original_title: movie.original_title,
		release_date: movie.release_date ? moment(movie.release_date).format("DD MMM YYYY") : this.emptyDate,
		original_language: this.languageNameParserProvider.parseLanguageName(movie.original_language),
		overview: movie.overview,
		poster_path: movie.poster_path
	};
  	return transformedMovie;
  }

  transformPerson(person: Person):Person {
  	let transformedPerson = {
		id: person.id,
		name: person.name,
		birthday: person.birthday ? moment(person.birthday).format("DD MMM YYYY") : this.emptyDate,
		deathday: person.deathday ? moment(person.deathday).format("DD MMM YYYY") : this.emptyDate,
		biography: person.biography,
		profile_path: person.profile_path
	};
  	return transformedPerson;
  }
}
