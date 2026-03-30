import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/notes';

  getNotes(): Observable<Note[]> {
    return this.httpClient.get<Note[]>(this.apiUrl);
  }

  addNote(note: Omit<Note, 'id'>): Observable<Note> {
    return this.httpClient.post<Note>(this.apiUrl, note);
  }
}
