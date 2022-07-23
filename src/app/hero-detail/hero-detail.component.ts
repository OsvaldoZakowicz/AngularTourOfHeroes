import { Component, OnInit, Input } from '@angular/core';
//interfaz Heroe
import { Hero } from '../Hero';

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

  constructor() { };

  ngOnInit(): void { };

}
