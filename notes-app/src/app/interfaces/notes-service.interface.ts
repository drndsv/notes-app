import { Observable } from 'rxjs';

import { Note } from './note.interface';

export interface NotesServiceInterface{
  getNotes(): Observable<Note[]>;
  addNote(note: Omit<Note, "id">): Observable<Note>;
}
