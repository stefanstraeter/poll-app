import { Routes } from '@angular/router';
import { Home } from '@features/home/components/home/home';
import { CreatePoll } from '@features/polls/components/create-poll/create-poll';
import { PollDetail } from '@features/polls/components/poll-detail/poll-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'poll/:id', component: PollDetail },
  { path: 'create', component: CreatePoll },
];
