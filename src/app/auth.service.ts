import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, of, switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$!: Observable<firebase.User | null>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) { 
    this.user$ = afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.signOut(); 
    this.router.navigate(['/login']);
  }

  get appUser$() : Observable<any> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid).valueChanges();
        return of(null);
      })
    );
  }
}
