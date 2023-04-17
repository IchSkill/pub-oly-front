import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../core/service/api.service';
import  {MatSnackBar} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newUserForm: FormGroup;
  newAthleteForm: FormGroup;
  sports: any;
  A_username: string;
  A_password: string;
  A_name: string;
  A_nation: string;
  A_sportart: string;
  A_birthday: string;


  countries: any[] = [];
  selectedCountry = new FormControl('');
  selectedCountryName: string;
  constructor(private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private api: ApiService,
    public dialogRef: MatDialogRef<AdminComponent>,) {
    this.datePipe = new DatePipe('en-US');
    this.newUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
    this.newAthleteForm = this.formBuilder.group({
      name: ['', Validators.required],
      sport: ['', Validators.required],
      birthdate: ['', [Validators.required, this.minAgeValidator(16)]],
    });
    
    

  }

  ngOnInit(): void {
    this.getSportarten();
    this.http
      .get<any[]>('https://restcountries.com/v3.1/all')
      .subscribe((data) => {
        this.countries = data
          .map((country) => ({
            name: country.translations.deu.common || country.name.common,
            code: country.cca2,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
  
        const startingIndex = this.countries.findIndex((country) =>
          country.name.toUpperCase().startsWith('D')
        );
  
        if (startingIndex !== -1) {
          this.countries = [
            ...this.countries.slice(startingIndex),
            ...this.countries.slice(0, startingIndex),
          ];
        }
      });
  
    // Fügen Sie diesen Code hinzu, um den Namen des ausgewählten Landes zu verfolgen:
    this.selectedCountry.valueChanges.subscribe((value) => {
      const selectedCountry = this.countries.find((country) => country.code === value);
      this.selectedCountryName = selectedCountry ? selectedCountry.name : '';
    });
  }
passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const passwordConfirm = g.get('passwordConfirm')?.value;
  
    if (!password || !passwordConfirm) {
      return { required: true };
    }
  
    return password === passwordConfirm ? null : { mismatch: true };
  }
  getSportarten() {
    this.api.getSportarten().subscribe((data: any) => {
      this.sports = data.map((sports: string) => this.removeIconsfromString(sports));

      console.log(this.sports);
    });
  }

  createUser() {
    if (this.newUserForm.valid) {
      const { username, password } = this.newUserForm.value;
  
      this.api.addAdmin(username, password).subscribe(
        (response) => {
          console.log('Benutzer erfolgreich erstellt:', response);
          this.snackBar.open('Benutzer erfolgreich erstellt.', 'Schließen', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        (error) => {
          console.error('Fehler beim Erstellen des Benutzers:', error);
          this.snackBar.open('Fehler beim Erstellen des Benutzers.', 'Schließen', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
    }
  }
  
  createNewAthlete() {
    if (this.newAthleteForm.valid) {
      const { name, sport, birthdate } = this.newAthleteForm.value;
      const formattedBirthdate = this.datePipe.transform(birthdate, 'yyyy-MM-dd') || '';
      const nation = this.selectedCountryName || '';
  
      console.log('name:', name, 'sport:', sport, 'birthdate:', formattedBirthdate, 'nation:', nation);
  
      this.api.addAthlete(name, formattedBirthdate, nation, sport).subscribe(
        (response) => {
          console.log('Benutzer erfolgreich erstellt:', response);
          this.snackBar.open('Benutzer erfolgreich erstellt.', 'Schließen', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        (error) => {
          console.error('Fehler beim Erstellen des Benutzers:', error);
          this.snackBar.open('Fehler beim Erstellen des Benutzers.', 'Schließen', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      );
    }
  }
  
  
  closeLightbox() {
    this.dialogRef.close();
  }
  private removeIconsfromString(str: string): string {
    return str.replace(/[\u{1F600}-\u{1F64F}]/gu, '')
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, '')
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
    .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '')
    .replace(/[\u{2600}-\u{26FF}]/gu, '')
    .replace(/[\u{2700}-\u{27BF}]/gu, '')
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, '')
    .replace(/[\u{E0100}-\u{E01EF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '');
}

minAgeValidator(minAge: number) {
  return (control: FormControl): { [key: string]: any } | null => {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    const minDate = new Date(
      currentDate.getFullYear() - minAge,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    return selectedDate <= minDate ? null : { minAgeError: true };
  };
}

}
