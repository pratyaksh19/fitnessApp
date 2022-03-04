import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Router } from "@angular/router";

//Subject is a event emitter which emits the event & subscribe in other parts of the app
@Injectable()
export class AuthService { // fake user login
    authChange= new Subject<boolean>(); // think it like an event emitter
    private user: User;

    constructor(private router: Router) { // after adding Injectable we can add constructor here
    }

    registerUser(authData: AuthData){ // called when user signs up
        this.user = {
            email:  authData.email,
            userId: Math.round(Math.random()* 10000).toString() // faking random ID
        };
        // after register navigating to training
        this.authSuccessfully();
    }

    login(authData: AuthData){
        this.user = {
            email:  authData.email,
            userId: Math.round(Math.random()* 10000).toString()
        };
        this.authChange.next(true);
        this.authSuccessfully();
    }

    logout() {
        this.user = {};
        this.authChange.next(false); // after logout we emit false as we are no longer logged in
        this.router.navigate(['/login']);
    }

    getUser() {  //as this.user is an object & main obj can be changed by call by reference
        return {...this.user}; // so that new object that has same property as user is formed & existing object is not disturbed
    }

    isAuth() {
        console.log(this.user);
        return this.user != null;
    }

    private authSuccessfully() { // this part of code is common between login & registeruser so made a new function with common code
        //whenever we register a user i want to emit an event
        this.authChange.next(true);
        //log out to login then u are emittig true now
        this.router.navigate(['/training']);
    }
}