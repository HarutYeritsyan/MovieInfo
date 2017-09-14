import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MoviesPage } from '../pages/movies/movies';
import { MovieDetailsPage } from '../pages/movie-details/movie-details';
import { BiographyPage } from '../pages/biography/biography';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NcmMoviesProvider } from '../providers/ncm-movies/ncm-movies';
import { TransformOutputProvider } from '../providers/transform-output/transform-output';
import { LanguageNameParserProvider } from '../providers/language-name-parser/language-name-parser';
import { FavoriteMoviesProvider } from '../providers/favorite-movies/favorite-movies';

@NgModule({
  declarations: [
    MyApp,
    MoviesPage,
    MovieDetailsPage,
    BiographyPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MoviesPage,
    MovieDetailsPage,
    BiographyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NcmMoviesProvider,
    TransformOutputProvider,
    LanguageNameParserProvider,
    FavoriteMoviesProvider
  ]
})
export class AppModule {}
