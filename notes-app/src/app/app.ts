import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WA_LOCATION } from '@ng-web-apis/common';

import { Note } from './interfaces/note.interface';
import { NotesServiceInterface } from './interfaces/notes-service.interface';
import { NotesSourceService } from './services/notes-source.service';
import { NOTES_SERVICE } from './tokens/notes-service.token';
import { NotesSource } from './types/notes-source.types';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App implements OnInit {
  private readonly notesService = inject<NotesServiceInterface>(NOTES_SERVICE);
  private readonly location = inject(WA_LOCATION);

  protected readonly notesSourceService = inject(NotesSourceService);

  notes: Note[] = [];
  title = '';
  content = '';
  selectedSource: NotesSource = this.notesSourceService.getSource();

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });
  }

  addNote(): void {
    const trimmedTitle = this.title.trim();
    const trimmedContent = this.content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    this.notesService
      .addNote({
        title: trimmedTitle,
        content: trimmedContent,
      })
      .subscribe(() => {
        this.title = '';
        this.content = '';
        this.loadNotes();
      });
  }

  changeSource(source: NotesSource): void {
    this.notesSourceService.setSource(source);
    this.location.reload();
  }
}
