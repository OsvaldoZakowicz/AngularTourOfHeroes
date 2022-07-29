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

  /**
   * *Metodo para crear un heroe
   * @param name - nombre del heroe
   * @returns void
   */
   add(name: string): void {
    //nombre sin espacios blancos al inicio y final
    name = name.trim();
    //nombre no vacio
    if (!name) { return; }
    /**
     * llamo al servicio addHero() con un objeto parcial Hero
     * que necesita id, m suscribo al retorno, un Heroe nuevo
     * completo que empujo al array local del componente.
     */
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  };

  /**
   * *Metodo para eliminar un heroe
   * @param hero - heroe a eliminar
   */
  delete(hero: Hero): void {
    //elimino el heroe de la lista local del componente.
    this.heroes = this.heroes.filter(h => h !== hero);
    //uso el servicio para eliminar el heroe.
    //NOTA: No hay nada a que suscribirme, pero es necesario para que el Observable actue
    this.heroService.deleteHero(hero).subscribe();
  }
}
