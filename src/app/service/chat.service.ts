import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'https://backend-tbkt.onrender.com/api/v1/messages';

  constructor(private http : HttpClient) { }

  getMessages(): Observable<Message[]>{
    return this.http.get<Message[]>('https://backend-tbkt.onrender.com/api/v1/messages');
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }

}
