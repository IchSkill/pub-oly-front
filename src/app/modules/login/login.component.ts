import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../core/service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Import hinzufügen
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService
  ) {
    // FormGroup initialisieren
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {}

  closeLightbox() {
    this.dialogRef.close();
  }

  login() {
    // Formularwerte extrahieren
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        console.log('Anmeldung erfolgreich:', response);
        // Führen Sie hier nach der Anmeldung weitere Aktionen aus
        this.router.navigate(['/admin']);
        console.log('Navigated');
        this.closeLightbox();

      },
      (error) => {
        console.error('Anmeldung fehlgeschlagen:', error);
      }
    );
  }
}
