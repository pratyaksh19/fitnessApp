import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  //@Output() trainingStart= new EventEmitter<void>();
  excercises: Excercise[] = [];
  newTrainingForm = this.fb.group({
    selectedExcercise: ['',Validators.required]
  });

  constructor(private fb: FormBuilder,private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.excercises = this.trainingService.getAvailableExcercises();
  }

  onStartTraining() {
    console.log(this.newTrainingForm);
    this.trainingService.startExcercise(this.newTrainingForm.value.selectedExcercise);
  }

}
