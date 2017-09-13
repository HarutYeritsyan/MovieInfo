import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NcmMoviesProvider } from '../../providers/ncm-movies/ncm-movies';

import { Person } from '../../models/person';

/**
 * Generated class for the BiographyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-biography',
  templateUrl: 'biography.html',
})
export class BiographyPage {
	person_id: number;
	person: Person;
	person_profile_url: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, ncmMoviesProvider: NcmMoviesProvider) {
  	ncmMoviesProvider.getPersonId().subscribe(person_id => {
  		this.person_id = person_id;

  		ncmMoviesProvider.getPerson(this.person_id).subscribe(person => {
  			this.person = person;
  			
  			ncmMoviesProvider.getImageUrlComponents().subscribe(imageUrlComponents => {
  				let sizeIdx = Math.floor(imageUrlComponents.poster_sizes.length / 2) - 1; //get an average size
  				if(sizeIdx >= 0 && this.person.profile_path != null) {
  					let size = imageUrlComponents.poster_sizes[sizeIdx];
  					this.person_profile_url = '' + imageUrlComponents.base_url + size + this.person.profile_path;
  				}
  			});
  		});
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BiographyPage');
  }

}
