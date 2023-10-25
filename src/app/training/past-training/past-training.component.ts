import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns = [
    'name',
    'date',
    'duration',
    'calories',
    'state',
    'deldetails',
  ];
  dataSource = new MatTableDataSource<Excercise>();
  public userinput: string;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService.finishedExerciseChanged.subscribe((data) => {
      this.dataSource.data = data;
    });
    this.trainingService.getCompletedandCancelledExercise();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  keyin(userinput: string) {
    this.dataSource.filter = userinput.trim().toLowerCase();
  }

  delRecord(documentId: string) {
    this.trainingService.deleteExercise(documentId);
  }

  ngOnDestroy(): void {}
}
