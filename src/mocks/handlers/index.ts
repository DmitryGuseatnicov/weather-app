import { userHandlers } from './user';
import { weatherNoteHandlers, weatherTypeHandlers } from './weather';

export const handlers = [...weatherNoteHandlers, ...userHandlers, ...weatherTypeHandlers];
