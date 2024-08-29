import { Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: '', title: 'Inicio', component: MainComponent },
  { path: 'events', title: 'Eventos', component: EventsComponent }
];
