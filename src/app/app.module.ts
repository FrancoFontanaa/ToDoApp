import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TimerPipe } from './pipes/timer.pipe';
import { TasksContainerComponent } from './components/tasks-container/tasks-container.component';
import { TaskComponent } from './components/task/task.component';
import { PriorityIndicatorComponent } from './components/priority-indicator/priority-indicator.component';
import { ClockComponent } from './components/clock/clock.component';

import { HttpClientModule } from '@angular/common/http';
import { ObserversModule } from '@angular/cdk/observers';
import { FilterByPropertyPipe } from './pipes/filter-by-property.pipe';
import { RoundThirthyMinutesPipe } from './pipes/round-thirthy-minutes.pipe';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { GetTotalTimeSpentPipe } from './pipes/get-total-time-spent.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TimerPipe,
    TasksContainerComponent,
    TaskComponent,
    PriorityIndicatorComponent,
    ClockComponent,
    FilterByPropertyPipe,
    RoundThirthyMinutesPipe,
    SearchBarComponent,
    GetTotalTimeSpentPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    ObserversModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
