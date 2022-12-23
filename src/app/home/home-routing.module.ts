import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
        {
            path: 'dashboard',
            loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
        }, 
        {
            path: 'notes',
            loadChildren: () => import('./notes/notes.module').then( m => m.NotesPageModule)
        },
        {
            path: '',
            redirectTo: '/app/notes',
            pathMatch: 'full'
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
