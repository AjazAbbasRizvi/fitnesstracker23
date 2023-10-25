import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  @Output () exitTraining = new EventEmitter<void>();
  public progress: number = 0;
  timer: any;

  constructor(private dailog: MatDialog, private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.startOrResumeTraining()
  }

  ngOnDestroy(): void {}

  startOrResumeTraining()
  {
    const steps = this.trainingService.getRunningExercise().duration /100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, steps);
  }

  onStop() {
    clearInterval(this.timer);
    const dailogref = this.dailog.open(StopTrainingComponent, {
      data: { Progress: this.progress },
    });

    dailogref.afterClosed().subscribe(result=>{
      if (result == false) {
        this.startOrResumeTraining();
      }
      else
      {
        this.trainingService.cancelledExercise(this.progress);
      }
     
    })
  }
}
