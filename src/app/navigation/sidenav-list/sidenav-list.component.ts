import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<boolean>();
  @Input() navState:boolean;
  toggleSidenav:boolean = true;
  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe((authChange)=>{
      this.isAuth = authChange;
    });
  }

  onClose() {
    this.toggleSidenav=!this.toggleSidenav;
    this.closeSidenav.emit(!this.navState); // as we are clossing the side nav
  }

  ngOnDestroy(): void {
      this.authSubscription.unsubscribe();
  }

  onLogout(): void {
    this.onClose();
    this.authService.logout();
  }

}
