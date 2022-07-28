import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './Hero';

/**
 * *Esta clase es un servicio, asume la funcion de mock-heroes.ts
 */

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes};
  }

  /**
   * *Sobreescribe el metodo genId para asegurar que un heroe siempre tenga un id
   * si el array de heroes esta vacio el metodo retorna el numero inicial (11)
   * si el array de heroes no esta vacio, el metodo retorna el mayor de los id + 1
   * @param heroes 
   * @returns 
   */
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
