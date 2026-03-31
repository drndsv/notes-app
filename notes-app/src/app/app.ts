import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WA_LOCATION } from '@ng-web-apis/common';
import { TuiButton, TuiGroup, TuiRoot, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiBlock, TuiRadio, TuiTextarea } from '@taiga-ui/kit';
import { TuiCard, TuiHeader } from '@taiga-ui/layout';

import { Note } from './interfaces/note.interface';
import { NotesServiceInterface } from './interfaces/notes-service.interface';
import { NotesSourceService } from './services/notes-source.service';
import { NOTES_SERVICE } from './tokens/notes-service.token';
import { NotesSource } from './types/notes-source.types';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    TuiRoot,
    TuiTextfield,
    TuiGroup,
    TuiBlock,
    TuiRadio,
    TuiButton,
    TuiTextarea,
    TuiCard,
    TuiHeader,
    TuiTitle,
  ],
  templateUrl: './app.html',
  styleUrl: './app.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly notesService = inject<NotesServiceInterface>(NOTES_SERVICE);
  private readonly location = inject(WA_LOCATION);
  private readonly cdr = inject(ChangeDetectorRef);

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
      this.cdr.markForCheck();
    });
  }

  addNote(title: string, content: string): void {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    this.notesService
      .addNote({
        title: trimmedTitle,
        content: trimmedContent,
      })
      .subscribe((newNote) => {
        this.notes = [...this.notes, newNote];
        this.title = '';
        this.content = '';
        this.cdr.markForCheck();
      });
  }

  changeSource(source: NotesSource): void {
    this.notesSourceService.setSource(source);
    this.location.reload();
  }
}
