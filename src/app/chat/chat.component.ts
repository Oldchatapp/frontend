import { Component, OnInit } from '@angular/core';
import { Message } from '../model/message';
import { ChatService } from '../service/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  messages : Message[] = [];
  newMessage: string = '';
  username: string = '';
  isUsernameSet : boolean = false;
  usernameTaken : boolean = false;

  constructor(private chatService : ChatService){}

  ngOnInit(): void {
      this.chatService.getMessages().subscribe(messages => {
        this.messages = messages;
        console.log(messages);
      });
  }

  setUsername(): void {
    if (this.username.trim()) {
      this.chatService.getMessages().subscribe( messages =>{
        const isTaken = this.messages.some(message => message.sender === this.username);
        if(isTaken){
          this.usernameTaken = true;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Nombre de usuario ya ha sido utilizado',
            confirmButtonText: 'Cerrar'
          });
        } else {
          this.isUsernameSet = true;
          this.usernameTaken = false;
        }
      })
      
    }
  }

  sendMessage(): void {
    if(this.newMessage.trim()){
      const message : Message = {
        sender : this.username,
        content : this.newMessage,
        timestamp : new Date().toISOString()
      };
      this.chatService.sendMessage(message).subscribe(savedMessage =>{
        this.messages.push(savedMessage);
        this.newMessage = '';
      });
    }
  }

}
