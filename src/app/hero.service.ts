import { Injectable } from '@angular/core';
//a traves del servicio traeremos heroes simulados.
//interfaz Hero, y constante de heroes HEROES
import { Hero } from './Hero';
import { HEROES } from './mock-heroes';
//usaremos Observable y of() de RxJS
import { Observable, of } from 'rxjs';
//usaremos el servicio de mensajes
import { MessageService } from './message.service';


/**
 * *Esto es un servicio
 * ?por que un servicio?
 * *Los componentes no deberian buscar ni guardar datos directamente y, desde luego, 
 * no deberian presentar a sabiendas datos simulados. 
 * Deben centrarse en presentar datos y delegar el acceso a los datos a un servicio.
 * 
 * Todas las clases de aplicacion (componentes) pueden usar el servicio. Usarmos
 * la inyeccion de dependencias de Angular para inyectar el servicio en el contructor
 * del componente que lo requiera.
 * Los servicios son una excelente forma de compartir informacion entre clases
 * que no se conocen entre si.
 * 
 * Injectable() marca a la clase HeroService como participante en el sistema de inyeccion
 * de dependencias (vemos que importa Injctable al principio).
 * La clase HeroService proporcionara servicios inyectables y puede tener dependencias.
 * *Este proveedor de servicio esta disponible en el sistema de inyeccion de dependencias
 * *de forma global en el inyector raiz (provideIn: 'root'), Angular crea UNA instancia compartida
 * *del servicio que estara disponible para inyectarse en cualquier otra clase. 
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  /**
   * *Constructor.
   * Cuando se crea el HeroService, Angular inyectara el singleton MessageService
   * en la propiedad messageService.
   * * NOTA: Este es un escenario típico de "servicio en servicio": 
   * *inyecta el MessageService en el HeroService que se inyecta en el HeroesComponent.
   * @param messageService 
   */
  constructor(private messageService: MessageService) { };

  //retornar heroes
  /* getHeroes(): Hero[] {
    //* NOTA: Puedo retornar directamente lo importado
    return HEROES;
  }; */

  /**
   * *Metodo para retornar un Observable.
   * of (HEROES) devuelve un Observable <Hero[]> que emite un valor unico,
   * el conjunto de heroes simulados.
   * @returns Observable <Hero[]>
   */
  getHeroes(): Observable<Hero[]> {
    //*TODO: enviar un mensaje _despues_ de recuperar los heroes
    this.messageService.add("Servicio de Heroes: Obteniendo heroes.");
    return of(HEROES);
  }
}
