import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  public ongoingTraining= false;
  excerciseSubscription: Subscription;

  constructor(private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.excerciseSubscription=this.trainingService.exerciseChanged.subscribe(excercise=>{
      console.log(this.excerciseSubscription);
      console.log(excercise.id);
      if(excercise.id){
        this.ongoingTraining=true;
      }else {
        this.ongoingTraining=false;
      }
    });
  }

}
