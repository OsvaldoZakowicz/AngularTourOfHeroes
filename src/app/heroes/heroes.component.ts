import { Component, OnInit } from '@angular/core';
//interfaz Heroe
import { Hero } from '../Hero';

/**
 * *Siempre se importa el decorador Component desde el core de angular, luego el decorador
 * '@Component()' se establece encima de la clase, para indicar que esta es un componente,
 * contiene los metadatos basicos de inicio: selector, templateUrl y styleUrls.
 * 
 * *El lifecycle hook 'ngOnInit()' siempre es llamado inmediatamente despues de crear el componente
 * es adecuado para lógica de inicializacion.
 * 
 * *La clase componente siempre se exporta
 * por lo que siempre se puede importar desde otro lugar como un AppModule
 * 
 */

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  //propiedades
  hero: Hero = {
    id: 1,
    name: "mateman"
  };

  constructor() { }

  ngOnInit(): void {
  }

}
