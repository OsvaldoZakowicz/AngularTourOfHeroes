import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../Hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {

  //*propiedades
  //heroes$ se declara como observable
  //NOTA: lleva ! por que no esta inicializado
  heroes$!: Observable<Hero[]>;

  /**
   * *searchTerms es una propiedad Subject de RxJS
   * Un Subject es tanto una fuente de valores observables como un Observable en si mismo. 
   * Puede suscribirse a un Subject como lo haria con cualquier Observable.
   * 
   * Tambien puede insertar valores en ese Observable llamando a su metodo next(value) como
   * lo hace el metodo search().
   * 
   * En la plantilla el evento vinculado al evento input del cuadro de texto 
   * llama al metodo search().
   */
  private searchTerms = new Subject<string>();

  //*constructor
  constructor(private heroService: HeroService) {}

  /**
   * *Metodo que empuja un termino de busqueda 
   * dentro del stream observable de searchTerms
   * @param term - termino de busqueda
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  //*Al inicio del componente
  ngOnInit(): void {

    /**
     * *NOTAS:
     * *debounceTime(300) espera hasta que el flujo de nuevos eventos de 
     * cadena se detenga durante 300 milisegundos antes de pasar por la ultima cuerda. 
     * Nunca hará solicitudes con más frecuencia que 300 ms.
     * *distinctUntilChanged() asegura que una solicitud se envíe solo si el texto del filtro cambió.
     * *switchMap() llama al servicio de búsqueda para cada término de búsqueda que pasa por 
     * debounce() y distinctUntilChanged(). Cancela y descarta los observables de búsqueda 
     * anteriores, devolviendo solo el último servicio de búsqueda observable.
     */

    //*devuelve un observable de resultados de busqueda Hero[]
    this.heroes$ = this.searchTerms.pipe(
      //espera 300ms despues de cada pulsacion de tecla antes de considerar el termino
      debounceTime(300),
      //ignora el termino si es el mismo que el anterior
      distinctUntilChanged(),
      //cambia al nuevo observable de busqueda cada vez que el termino cambia
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
