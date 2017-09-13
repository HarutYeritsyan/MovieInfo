import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NcmMoviesProvider } from '../../providers/ncm-movies/ncm-movies';

import { MovieDetailsPage } from '../movie-details/movie-details'

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
	person_id: number;
	movies: Movie[];
	originalMovies: Movie[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private ncmMoviesProvider: NcmMoviesProvider) {
  	ncmMoviesProvider.getPersonId().subscribe(person_id => {
  		this.person_id = person_id;
  		ncmMoviesProvider.getMoviesOfPerson(this.person_id).subscribe(movies => {
  			this.movies = movies;
  			this.originalMovies = movies;
  		});
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviesPage');
  }

  goToDetails(movie_id: number) {
  	this.navCtrl.push(MovieDetailsPage, { movie_id: movie_id });
  }

  search(searchEvent) {
  	let term = searchEvent.target.value;
  	//if search term has 1 or more character, call the API
  	//else, show the original list of Movies
  	if(term.trim() != '' && term.trim().length > 0){
  		this.ncmMoviesProvider.searchMoviesOfPerson(this.person_id, term).subscribe(movies => {
  			this.movies = movies;
  		});
  	} else {
  		this.movies = this.originalMovies;
  	}
  }
}
