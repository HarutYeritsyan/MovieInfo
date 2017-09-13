import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiographyPage } from './biography';

@NgModule({
  declarations: [
    BiographyPage,
  ],
  imports: [
    IonicPageModule.forChild(BiographyPage),
  ],
})
export class BiographyPageModule {}
