import { Injectable } from '@angular/core';

import { NotesSource } from '../types/notes-source.types';

@Injectable({
  providedIn: 'root',
})
export class NotesSourceService {
  private readonly storageKey = 'notes-source';

  getSource(): NotesSource {
    const source = localStorage.getItem(this.storageKey);
    return (source as NotesSource) || 'api';
  }

  setSource(source: NotesSource): void {
    localStorage.setItem(this.storageKey, source);
  }
}
