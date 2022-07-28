import { Component, OnInit } from '@angular/core';
//interfaz Heroe
import { Hero } from '../Hero';
//heroes falsos
//import { HEROES } from '../mock-heroes'; 
//en lugar de importar los heroes falsos, usare el servicio
import { HeroService } from '../hero.service';
//usaremos el servicio de mensajes
import { MessageService } from '../message.service';

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

  //*propiedades
  //array para heroes falsos
  heroes!: Hero[];

  /**
   * *Constructor
   * cuando Angular crea un HeroesComponent, el sistema de inyeccion de dependencias
   * establece el parametro heroService en la instancia unica de HeroService.
   * @param heroService inyectando el servicio de heroes
   */
  constructor(private heroService: HeroService, public messageService: MessageService) { };

  /**
   * *lifecycle hook
   * luego de que Angular construya una instancia de HeroesComponent
   * sabra el mejor momento para recuperar los heroes del servicio.
   */
  ngOnInit(): void {
    this.getHeroes();
  };

  /**
   * *Metodo para recuperar los heroes del servicio
   * !Esto no es viable en una aplicacion real donde obtengo datos de un servidor
   * !de forma inherentemente asincrona.
   * HeroesComponent espera a getHeroes (al inicio en ngOnInit()) y retorna de inmediato
   * por que disponemos de una lista local de heroes, pero en la vida real, al llamar a
   * getHeroes() el servicio encargado de ello debe esperar a que el servidor responda!
   * en otras palabras:
   * *HeroService.getHeroes() debe tener alguna firma asincrona.
   */
  /* getHeroes(): void {
    //esto es sincronico, viable por que existe un archivo con heroes simulados
    this.heroes = this.heroService.getHeroes();
  }; */

  /**
   * *Metodo para recuperar los heroes del servicio
   * Anteriormente obtenia los heroes de un array de forma sincrona.
   * Ahora el servicio retorna un observable al cual debo suscribirme.
   * *La nueva versión espera a que el 'Observable' emita una serie de héroes,
   * *(que podría suceder ahora o varios minutos a partir de ahora). 
   * *El método subscribe() pasa el arreglo emitido a la devolución de llamada, 
   * *que establece la propiedad 'heroes' del componente.
   */
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  };
}
