import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TrainingComponent } from '../training.component';
import { CurrentTrainingComponent } from '../current-training/current-training.component';
import { NewTrainingComponent } from '../new-training/new-training.component';
import { PastTrainingComponent } from '../past-training/past-training.component';
import { StopTrainingComponent } from '../current-training/stop-training/stop-training.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { TrainingRoutingModule } from '../training.routing.module';
import { trainingReducer } from '../trainingngrx/training.reducer';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer),
  ],
  exports: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
  ],
})
export class TrainingModule {}
