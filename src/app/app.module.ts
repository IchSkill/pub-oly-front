import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from './app.component';

import { HomeComponent } from './modules/home/home.component';
import { OverviewComponent } from './modules/overview/overview.component';
import { LoginComponent } from "./modules/login/login.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { AthletenComponent } from './modules/athleten/athleten.component';
import { ErgebnisseComponent } from './modules/ergebnisse/ergebnisse.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { AthletenComponent } from './modules/athleten/athleten.component';
import { NavigationComponent } from './modules/navigation/navigation.component';
import { AuthService } from './core/service/auth.service';
import { AdminComponent } from './modules/admin/admin.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ErgebnisseeintragenComponent } from './modules/ergebnisseeintragen/ergebnisseeintragen.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OverviewComponent,
    LoginComponent,
    AthletenComponent,
    ErgebnisseComponent,
    NavigationComponent,
    AdminComponent,
    ErgebnisseeintragenComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [AuthService,
    { provide: LOCALE_ID, useValue: 'de'},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
