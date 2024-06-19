import { Routes, RouterModule } from '@angular/router';
import { PublicGuard } from 'src/app/authentication/guards/Public.guard';

export const FullLayout_ROUTES: Routes = [
    {
        path: 'authentication',
        loadChildren: () => import('../../authentication/authentication.module').then(m => m.AuthenticationModule),
        canActivate: [ PublicGuard ],
        canMatch: [ PublicGuard ],
    }
];
