import { Component } from "@angular/core";
import { Router } from "@angular/router";


import { MatDialog, MatDialogConfig, DialogPosition  } from '@angular/material/dialog';
import { LoginComponent } from "../login/login.component";
import { AuthService } from "../../core/service/auth.service";
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
  

  
    constructor(private router: Router,
                public dialog: MatDialog,
                private authService: AuthService) { }


    
    navigateToHome() {
        this.router.navigate(['']);
    }

    navigateToImpressum() {
        this.router.navigate(['/impressum']);
    }

    navigateToLogin() {
        this.router.navigate(['/login'], { queryParams: { returnUrl: '' } });
    }
    showLogin() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '600px';
        dialogConfig.height = '400px';
        dialogConfig.panelClass = 'popup-container';
        this.dialog.open(LoginComponent, dialogConfig);
    }
    

    navigateToIntroduction() {
        this.router.navigate(['/overview']);
    }
    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
      }
}