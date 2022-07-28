import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//para usar el enlace bidireccional ngModel, poner tambien en el array imports: []
import { FormsModule } from '@angular/forms';
//habilitar servicios http con HttpClient
import { HttpClientModule } from '@angular/common/http';
//usar in-memory-web-api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    /**
     * *El HttpClientInMemoryWebApiModule module intercepta solicitudes HTTP
     * *y retorna respuestas de servidor simuladas
     * *debe eliminarse cuando un servidor real esta listo para recibir solicitudes
     */
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
