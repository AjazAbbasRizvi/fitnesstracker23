import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  loadingStateChange = new Subject<boolean>();

  constructor(private MatSnackBar: MatSnackBar) {}

  ShowSnackBar(message, action, duration) {
    this.MatSnackBar.open(message, action, {
      duration: duration,
    });
  }
}
