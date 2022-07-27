import { Component, OnInit } from '@angular/core';
//usaremos el servicio de mensajes
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  /**
   * *Constructor
   * messageService debe ser publico, por que se enlazara a la plantilla.
   * Angular inyectará el unico MessageService en esa propiedad cuando crea el MessagesComponent.
   * *NOTA: Angular solo une a la plantilla las propiedades publicas del componente.
   * @param messageService 
   */
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
