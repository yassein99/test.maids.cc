import { Routes } from '@angular/router';
import { UserDetailsComponent } from '../app/user-details/user-details.component';
import { UserDashboardComponent } from '../app/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    { path: '', component: UserDashboardComponent },
    { path: 'detailUser/:id', component: UserDetailsComponent },
    { path: '**', redirectTo: '' } 
];
