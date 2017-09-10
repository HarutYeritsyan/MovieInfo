import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Person } from '../../models/person';

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
}
