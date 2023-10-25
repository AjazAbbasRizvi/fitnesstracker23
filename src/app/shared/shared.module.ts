import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [FormsModule, MaterialModule, CommonModule, FlexLayoutModule],
  exports: [FormsModule, MaterialModule, CommonModule, FlexLayoutModule],
})
export class SharedModule {}
