import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-conds',
  templateUrl: './terms-conds.component.html',
  styleUrls: ['./terms-conds.component.css'],
})
export class TermsCondsComponent {
  constructor(public router: Router) {}

  back() {
    this.router.navigate(['/signup']);
  }
}
