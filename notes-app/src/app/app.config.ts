import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LocalStorageNotesService } from './services/local-storage-notes.service';
import { NotesApiService } from './services/notes-api.service';
import { NotesSourceService } from './services/notes-source.service';
import { NOTES_SERVICE } from './tokens/notes-service.token';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: NOTES_SERVICE,
      useFactory: () => {
        const notesSourceService = inject(NotesSourceService);
        const source = notesSourceService.getSource();

        if (source === 'localStorage') {
          return inject(LocalStorageNotesService);
        }

        return inject(NotesApiService);
      },
    }
  ]
};
