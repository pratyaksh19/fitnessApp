import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  public progress = 0;
  timer: number;

  constructor(private dialog: MatDialog, private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExcercise().duration / 100 *1000;
    console.log(step);
    this.timer = setInterval(()=>{
      this.progress = this.progress+5;
      if(this.progress>=100){
        this.trainingService.completeExcercise();
        clearInterval(this.timer);
      }
    },step)
  }

  onStop() {
    clearInterval(this.timer);
    // dialog open returns reference to open dialogue
    const dialogRef = this.dialog.open(StopTrainingComponent, {data:{
      progress: this.progress
    }});

  dialogRef.afterClosed().subscribe( result =>{
    //console.log(result); // the value that we bound in button like [mat-dialog-close]="true",we are gettig its value in result
    if(result){
      this.trainingService.cancelExcercise(this.progress);
    }else{
      this.startOrResumeTimer();
    }
  });
}

}
