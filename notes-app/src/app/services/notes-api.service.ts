import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Note } from '../interfaces/note.interface';
import { NotesServiceInterface } from '../interfaces/notes-service.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesApiService implements NotesServiceInterface {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/notes`;

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(this.apiUrl);
  }

  addNote(note: Omit<Note, 'id'>): Observable<Note> {
    return this.httpClient.post<Note>(this.apiUrl, note);
  }
}
