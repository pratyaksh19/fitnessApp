import { Excercise } from "./excercise.model";
import { Subject } from "rxjs";

export class TrainingService {
    private availableExercises: Excercise[] = [
        {id: 'crunches', name: 'Crunches', duration:30, calories:8},
        {id: 'touch-toes', name: 'Touch Toes', duration:180, calories:12},
        {id: 'side-lunges', name: 'Side Lunges', duration:120, calories:16},
        {id: 'burpees', name: 'Burpees', duration:60, calories:11}
    ]; // make it private & add getter & setter here so that avoid unnecessary modification

    private runningExcercise: any;
    private excercises: Excercise[] = [];
    exerciseChanged = new Subject<Excercise>();

    startExcercise(selectedId: string) {
        const selectedExcercise = this.availableExercises.find(ex => ex.id===selectedId); // to find the object i wanna find
        this.runningExcercise = selectedExcercise;
        console.log(this.runningExcercise);
        console.log("check");
        this.exerciseChanged.next({...this.runningExcercise}); //subscribe this in training component
    }

    getAvailableExcercises() {
        return this.availableExercises.slice();
        // slice will return a new array i.e. copy of the array
    }

    getRunningExcercise() {
        return {...this.runningExcercise}; //to get data of running excercise
    }

    completeExcercise() { // excercise completed
        this.excercises.push({
            ...this.runningExcercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExcercise= null;
        this.exerciseChanged.next({
            id: null,
            name: null

        });
    }

    cancelExcercise(progress:number) { //excercise cancelled
        this.excercises.push({ //as this excercise is the one we will show in past excercises component table
            ...this.runningExcercise,
            duration: this.runningExcercise.duration * (progress/100),
            colories: this.runningExcercise.calories * (progress/100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExcercise= null;
        this.exerciseChanged.next({
            id: null,
            name: null
        });
    }

    getCompletedOrCancelledExcercises() {
        return this.excercises.slice(); //as this excercise is the one we will show in past excercises component table
    }


}