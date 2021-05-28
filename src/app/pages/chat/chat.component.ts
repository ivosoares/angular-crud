import { Component, OnInit } from '@angular/core';
import * as socket from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socketEndpoint = 'localhost:3000';
  socket: any;
  nome: any = '';
  message = ''

  constructor() { }

  ngOnInit(): void {
    this.setupSocketConnection();
    this.nome = prompt('Digite o seu nome');
  }

  setupSocketConnection() {
    this.socket = socket.io(this.socketEndpoint);
    this.socket.on('nova msg', (data: string) => {
      this.renderMessage(data);
    })
  }

  sendMessage() {
    this.socket.emit('enviar msg', `${this.nome}: ${this.message}`);
    this.renderMessage(`${this.nome}: ${this.message}`);
  }

  renderMessage(message: any) {
    const element = document.createElement('li');
    element.innerHTML = message;
    element.classList.add("list-group-item");
    document.getElementById('list-message')?.appendChild(element);
    this.message = '';
  }

}
