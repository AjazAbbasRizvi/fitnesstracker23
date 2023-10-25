import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  templateUrl: './stop-training.component.html',
  styleUrls: ['./stop-training.component.css'],
})
export class StopTrainingComponent implements OnInit, OnDestroy {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData : any) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
