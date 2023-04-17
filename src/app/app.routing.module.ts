import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiService } from './core/service/api.service';
// import { AthletenComponent } from './modules/athleten/athleten.component';
import { ErgebnisseComponent } from './modules/ergebnisse/ergebnisse.component';

import { HomeComponent } from './modules/home/home.component';
import { OverviewComponent } from './modules/overview/overview.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AuthGuard } from './core/helper/auth.guard';
import { AthletenComponent } from './modules/athleten/athleten.component';
const routes: Routes = [
    {
        path: 'overview',
        component: OverviewComponent
    },
    {
        path: '',
        component: HomeComponent
    },

    // {
    //     path: 'athleten',
    //     component: AthletenComponent
    // },
    {
        path: 'ergebnisse',
        component: OverviewComponent,
    },
    {
        path: 'athleten/nation/:nation',
        component: AthletenComponent,
      },
    {
        path: 'ergebnisse/:sportart',
        component: ErgebnisseComponent,
      },
      
    // {
    //     path: 'athleten/nation/:nation',
    //     component: AthletenComponent,
    //   },
    {
        path: '**',
        redirectTo: ''
    },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
