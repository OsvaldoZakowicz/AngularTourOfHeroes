import { Component, OnInit, Input } from '@angular/core';
//interfaz Heroe
import { Hero } from '../Hero';
/**
 * *ActivatedRoute: contiene informacion sobre la ruta a esta instancia del 
 * HeroDetailComponent. Este componente esta interesado en los parámetros de la 
 * ruta extraidos de la URL. El parametro "id" es el id del heroe que se mostrara.
 * *Location: Ubicacion es un servicio de Angular para interactuar con el navegador
 * se usara para volver a la vista que navego hasta aqui
 * *HeroService: Servicio de obtencion de heroes
 */
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

/**
 * *Usaremos input en este componente
 * Recibiremos un heroe seleccionado de la lista de heroes
 */

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  //*propiedades
  //heroe seleccionado
  @Input() hero!: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private heroService: HeroService,
    private messageService: MessageService
  ) {};

  ngOnInit(): void {
    this.getHero();
  };

  getHero(): void {
    const id = (this.route.snapshot.paramMap.get('id') as unknown) as number;
    this.messageService.add(`id obtenido de url: ${id}`);
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  };

  /**
   * *Usamos location para volver atras,
   * a la vista que navego hacia aqui
   */
  goBack(): void {
    this.location.back();
  };

}
