import { Routes } from '@angular/router';
import { ComponentsComponent } from '../../components/components.component'
import { AuthGuard } from 'src/app/authentication/guards/Auth.guard';

export const CommonLayout_ROUTES: Routes = [

    //Dashboard
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [ AuthGuard ],
        canMatch: [ AuthGuard ],
    },


    // Eventos
    {
      path: 'eventos',
      children: [
          {
              path: '',
              redirectTo: '/eventos/evento',
              pathMatch: 'full'
          },
          {
              path: '',
              loadChildren: () => import('../../evento/evento.module').then(m => m.EventoModule),
              canActivate: [ AuthGuard ],
              canMatch: [ AuthGuard ],
            },
        ]
    },

     // Proyectos
     {
      path: 'proyectos',
      children: [
          {
              path: '',
              redirectTo: '/proyectos/proyecto',
              pathMatch: 'full'
          },
          {
              path: '',
              loadChildren: () => import('../../proyectos/proyectos.module').then(m => m.ProyectosModule),
              canActivate: [ AuthGuard ],
              canMatch: [ AuthGuard ],
            },
        ]
    },



    // Charts
    {
      path: 'changelog',
      children: [
          {
              path: '',
              redirectTo: '/changelog/changelog',
              pathMatch: 'full'
          },
          {
              path: '',
              loadChildren: () => import('../../changelog/changelog.module').then(m => m.ChangelogModule),
              canActivate: [ AuthGuard ],
              canMatch: [ AuthGuard ],
            },
        ]
    },

    //Apps
    {
        path: 'apps',
        data: {
            title: 'Apps'
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../apps/apps.module').then(m => m.AppsModule)
            },
        ]
    },

    //Component
    {
        path: 'demo',
        component: ComponentsComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule)
            }
        ],
        data: {
            title: 'Components '
        }
    },

    // Charts
    {
      path: 'features',
      data: {
          title: 'features'
      },
      children: [
          {
              path: '',
              redirectTo: '/dashboard',
              pathMatch: 'full'
          },
          {
              path: '',
              loadChildren: () => import('../../features/features.module').then(m => m.FeaturesModule)
            },
        ]
    },

    //Pages
    {
        path: 'pages',
        data: {
            title: 'Pages '
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren: () => import('../../pages/pages.module').then(m => m.PagesModule)
            },
        ]
    }
];
