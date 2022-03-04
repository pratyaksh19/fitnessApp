import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  openSidenav: boolean = false;
  title = 'my-fitness-app';

  toggleSideNav(event:any){
    console.log("openSideNav");
    console.log(event);
    this.openSidenav = event;
  }
}
