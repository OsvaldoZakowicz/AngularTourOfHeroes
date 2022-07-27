import { Injectable } from '@angular/core';
//a traves del servicio traeremos heroes simulados.
//interfaz Hero, y constante de heroes HEROES
import { Hero } from './Hero';
import { HEROES } from './mock-heroes';


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

  constructor() { };

  //retornar heroes
  getHeroes(): Hero[] {
    //* NOTA: Puedo retornar directamente lo importado
    return HEROES;
  };
}
