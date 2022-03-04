import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<boolean>();
  @Input() navState: boolean;
  toggleSidenav: boolean = false;
  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {  // subscribing to observable || auth service subscribe will return a new subscription
      this.isAuth=authStatus;
    });
  }

  onToggleSidenav(): void {
    this.toggleSidenav = !this.toggleSidenav;
    this.sidenavToggle.emit(!this.navState); // opening the side nav
  }

  public onLogOut(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.authSubscription.unsubscribe(); // unsubscribe the subscription when not required
  }

}
