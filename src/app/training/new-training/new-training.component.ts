import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public Exercises: Excercise[];
  public isLoading: boolean = false;

  constructor(
    public trainingService: TrainingService,
    public UIService: UiService
  ) {}

  ngOnInit(): void {
    this.UIService.loadingStateChange.subscribe((data) => {
      this.isLoading = data;
    });
    this.trainingService.fetchAvailableExercise().subscribe((data) => {
      this.Exercises = data;
    }),
      (error) => {
        this.UIService.ShowSnackBar(
          'Failed to fetch exercise, please try again later',
          null,
          4000
        );
        alert('Session Expired, Login Again With Valid Credentials');
      };
  }

  ngOnDestroy(): void {}

  startnewtraining(f: NgForm) {
    this.trainingService.startExcercise(f.value.exercise, this.Exercises);
  }
}
