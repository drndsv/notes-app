import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Note } from '../interfaces/note.interface';
import { NotesServiceInterface } from '../interfaces/notes-service.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageNotesService implements NotesServiceInterface {
  private readonly storageKey = 'notes';

  getNotes(): Observable<Note[]> {
    const notes = localStorage.getItem(this.storageKey);

    if (!notes) {
      return of([]);
    }

    return of(JSON.parse(notes) as Note[]);
  }

  addNote(note: Omit<Note, 'id'>): Observable<Note> {
    const notes = this.getNotesFromStorage();

    const newNote: Note = {
      id: this.generateId(notes),
      ...note,
    };

    const updatedNotes = [...notes, newNote];
    localStorage.setItem(this.storageKey, JSON.stringify(updatedNotes));

    return of(newNote);
  }

  private getNotesFromStorage(): Note[] {
    const notes = localStorage.getItem(this.storageKey);
    return notes ? (JSON.parse(notes) as Note[]) : [];
  }

  private generateId(notes: Note[]): number {
    if (notes.length === 0) {
      return 1;
    }

    return Math.max(...notes.map((item) => Number(item.id)));
  }
}
