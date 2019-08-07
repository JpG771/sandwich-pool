import { Component, OnInit } from '@angular/core';
import { FirebaseAuthenticateService } from '../../services/firebase-authenticate.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firebase-avatar',
  templateUrl: './firebase-avatar.component.html',
  styleUrls: ['./firebase-avatar.component.scss']
})
export class FirebaseAvatarComponent implements OnInit {

  loggedIn: Observable<boolean>;

  constructor(private authService: FirebaseAuthenticateService, private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
  }

  onSignOut(): void {
    this.router.navigateByUrl('/');
  }
}
