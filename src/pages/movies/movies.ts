import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NcmMoviesProvider } from '../../providers/ncm-movies/ncm-movies';

import { Person } from '../../models/person';
import { Movie } from '../../models/movie';

/**
 * Generated class for the MoviesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movies',
  templateUrl: 'movies.html',
})
export class MoviesPage {
	person: Person;
	person_id = 2963; //hardcoded person_id for Nicolas Cage
	movies: Movie[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private ncmMoviesProvider: NcmMoviesProvider) {
  	ncmMoviesProvider.getPerson(this.person_id).subscribe(person => {
  		this.person = person;
  	});

  	ncmMoviesProvider.getMoviesOfPerson(this.person_id).subscribe(movies => {
  		this.movies = movies;
  	});
  	console.log(this.movies);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviesPage');
  }

}
