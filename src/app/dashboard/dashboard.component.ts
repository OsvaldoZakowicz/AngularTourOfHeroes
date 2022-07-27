import { Component, OnInit } from '@angular/core';
import { Hero } from '../Hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //*propiedades
  heroes: Hero[] = [];

  /**
   * *Constructor
   * Inyecta el servicio de heroes
   * @param heroService 
   */
  constructor(private heroService: HeroService) { };

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
   * en este caso, de forma asincrona y los primeros 4
   */
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1,5));
  };

}
