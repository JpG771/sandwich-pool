import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthenticateService } from '../../services/firebase-authenticate.service';

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
