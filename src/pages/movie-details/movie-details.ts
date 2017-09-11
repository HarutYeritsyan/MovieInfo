import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NcmMoviesProvider } from '../../providers/ncm-movies/ncm-movies';

import { Movie } from '../../models/movie';
import { ImageUrlComponents } from '../../models/image-url-components';

/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
})
export class MovieDetailsPage {
	movie_id: number;
	movie: Movie;
	movie_poster_url:string = ''; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private ncmMoviesProvider: NcmMoviesProvider) {
  	this.movie_id = navParams.get('movie_id');
  	ncmMoviesProvider.getMovieDetails(this.movie_id).subscribe(movie => {
  		this.movie = movie;

  		ncmMoviesProvider.getPosterUrlComponents().subscribe(imageUrlComponents => {
  			let sizeIdx = Math.floor(imageUrlComponents.poster_sizes.length / 2) - 1; //get an average size
  			if(sizeIdx >= 0 && this.movie.poster_path != null) {
  				let size = imageUrlComponents.poster_sizes[sizeIdx];
  				this.movie_poster_url = '' + imageUrlComponents.base_url + size + this.movie.poster_path;
  			}
  		});

  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovieDetailsPage');
  }
}
