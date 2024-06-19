import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }


    private checkAuthStatus(): boolean | Observable<boolean> {
        return this.authService.checkAuthentication()
            .pipe(
                tap(isAuthenticated => {
                    if (isAuthenticated) {
                        this.router.navigate(['./eventos/evento']);
                    }
                }),
                map( isAuthenticated => !isAuthenticated )
            );
    }


    canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {

        return this.checkAuthStatus();
        //return true;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {


        return this.checkAuthStatus();

    }

}
