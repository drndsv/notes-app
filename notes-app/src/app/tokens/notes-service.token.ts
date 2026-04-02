import { InjectionToken } from '@angular/core';

import { NotesServiceInterface } from '../interfaces/notes-service.interface';

export const NOTES_SERVICE = new InjectionToken<NotesServiceInterface>('NOTES_SERVICE');
