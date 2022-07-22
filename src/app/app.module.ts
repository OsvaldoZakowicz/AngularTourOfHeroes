import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//para usar el enlace bidireccional ngModel, poner tambien en el array imports: []
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
