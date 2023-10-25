import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  public onGoingTraining: boolean = false;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService.exerciseChanged.subscribe((exercise) => {
      if (exercise) {
        this.onGoingTraining = true;
      } else {
        this.onGoingTraining = false;
      }
    });
  }

  ngOnDestroy(): void {}
}
