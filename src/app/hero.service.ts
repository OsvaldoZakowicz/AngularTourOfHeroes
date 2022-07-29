import { Injectable } from '@angular/core';
//a traves del servicio traeremos heroes simulados.
//interfaz Hero, y constante de heroes HEROES
import { Hero } from './Hero';
import { HEROES } from './mock-heroes';
//usaremos Observable y of() de RxJS
import { Observable, of } from 'rxjs';
//usaremos el servicio de mensajes
import { MessageService } from './message.service';
//HttpClient y HttpHeaders
import { HttpClient, HttpHeaders } from '@angular/common/http';
//para manejo de errores al hacer solicitudes http
import { catchError, map, tap } from 'rxjs/operators';


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

  //*propiedades
  private heroesUrl: string = 'api/heroes';
  //encabezado especial con las solicitudes de guardado Http
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * *Constructor.
   * Cuando se crea el HeroService, Angular inyectara el singleton MessageService
   * en la propiedad messageService.
   * * NOTA: Este es un escenario típico de "servicio en servicio": 
   * *inyecta el MessageService en el HeroService que se inyecta en el HeroesComponent.
   * *inyecta HttpClient
   * @param messageService 
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {};

  /**
   * *Metodo privado para usar MesaggeService de forma mas comoda
   */
  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  };

  /**
   * *Metodo para obtener heroes del servidor simulado
   * hago una solicitud con HttpClient normal, pero sera interceptada
   * por in-memory-data-service.
   * 
   * Cada metodos HttpClient devuelven un RxJS Observable de algo.
   * HTTP es un protocolo de solicitud/respuesta. Realiza una solicitud, 
   * devuelve una sola respuesta.
   * 
   * En general, un observable puede devolver multiples valores a lo largo del tiempo.
   * Un observable de HttpClient siempre emite un unico valor y luego se completa, 
   * para nunca volver a emitir.
   * 
   * Esta llamada particular a HttpClient.get() devuelve un Observable<Hero[]>; 
   * es decir, "un observable de un arreglo de heroes". En la práctica, 
   * solo devolvera un unico conjunto de héroes.
   * 
   * HttpClient.get() devuelve el cuerpo de la respuesta como un objeto JSON sin tipo
   * de forma predeterminada. Al aplicar el especificador de tipo opcional, <Hero[]>,
   * se agregan capacidades de TypeScript, que reducen los errores durante el tiempo de
   * compilación.
   * 
   * La API de datos del servidor determina la forma de los datos JSON. 
   * La API de datos Tour of Heroes devuelve los datos del heroe como una matriz.
   * 
   * @returns Observable<Hero[]> - retorna un Observable de arreglo Heroe
   */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        //mensaje
        tap(_=> this.log("obteniendo heroes.")),
        //manejo de errores
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /**
   * *Metodo para obtener un heroe individual
   * @param id - id del Heroe buscado
   * @returns Observable<Hero> - retorna un Observable de objeto Heroe
   */
  getHero(id: number): Observable<Hero> {
    const url: string = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_=> this.log(`obteniendo heroe: id= ${id}`)),
        catchError(this.handleError<Hero>(`getHero: id= ${id}`))
      );
  };

  /**
   * *Metodo para actualizar un heroe individual
   * put() toma 3 parametros:
   * - La url, datos a actualizar (en este caso el heroe nuevo), opciones
   * La url no cambia, la API sabe que heroe cambiar al ver su id.
   * La API web de heroes espera un encabezado especial en las solicitudes de guardado HTTP,
   * Ese encabezado esta en la constante httpOptions 
   * @param hero - heroe a actualizar
   * @returns Observable<any>
   */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_=> this.log(`actualizando heroe: id= ${hero.id}`)),
        catchError(this.handleError<any>(`updateHero: id= ${hero.id}`))
      );
  };

  /**
   * *Metodo para crear heroe
   * @param hero - heroe parcial al que agregar un id y crear en la BD
   * @returns Observable<Hero>
   */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`agregado heroe: w/ id= ${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  };

  /**
   * *Metodo para eliminar heroe
   * En este caso, necesito la url + id para encontrar el heroe a eliminar
   * Uso las opciones http como encabezado
   * @param hero o number - un heroe o un id de heroe
   * @returns Observable<Hero>
   */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`eliminado heroe id= ${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  /**
   * *Maneja operaciones Http que fallan.
   * *Deja a la app continuar la ejecucion.
   * @param operation - nombre de la operacion que fallo
   * @param result - valor opcional a retornar como el resultado observable
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log hacia la consola

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      //* deja a la app mantenerse en ejecucion retornando un resultado vacio.
      return of(result as T);
    };
  }
}
