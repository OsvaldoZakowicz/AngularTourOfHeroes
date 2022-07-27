import { Injectable } from '@angular/core';

/**
 * *Servicio de cache de mensajes
 * Como es un servicio inyectado en root, estara disponible en todos los componentes
 */

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  //*propiedades
  messages: string[] = [];

  constructor() { };

  //* agregar mensaje
  add(message: string): void {
    this.messages.push(message);
  };

  //*eliminar todos los mensajes
  clear(): void {
    this.messages = [];
  };
}
