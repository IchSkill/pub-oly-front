import { Component } from '@angular/core';
import { ApiService } from "../../core/service/api.service";
import { AuthService } from '../../core/service/auth.service'; // Import hinzufügen
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig, DialogPosition  } from '@angular/material/dialog';
import { AdminComponent } from '../admin/admin.component';
import {ErgebnisseeintragenComponent } from '../ergebnisseeintragen/ergebnisseeintragen.component'
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  sportarten: any[] = [];
  constructor(
    private api: ApiService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}
  ngOnInit() {
    
    this.getSportarten()

    window.addEventListener("click", () => {
      const dropdownMenus = document.querySelectorAll(".dropdown-menu");
      dropdownMenus.forEach((menu) => (menu as HTMLElement).style.display = "none");
    });
  }

  getSportarten() {
    this.api.getSportarten().subscribe((data: any) => {
      this.sportarten = data.map((sportart: string) => this.removeIconsfromString(sportart));

      console.log(this.sportarten);
    });

    
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  showAdmin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px';
    dialogConfig.height = '600px';
    dialogConfig.panelClass = 'popup-container';
    this.dialog.open(AdminComponent, dialogConfig);
}
showErgbenisseEintragen() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '1050px';
  dialogConfig.height = '78px';
  dialogConfig.panelClass = 'popup-container';
  this.dialog.open(ErgebnisseeintragenComponent, dialogConfig);

}
showLogin() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '600px';
  dialogConfig.height = '400px';
  dialogConfig.panelClass = 'popup-container';
  this.dialog.open(LoginComponent, dialogConfig);
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
toggleDropdown(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();

  const dropdownMenu = (event.target as HTMLElement).nextElementSibling as HTMLElement;
  dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
}
ngOnDestroy() {
  window.removeEventListener("click", this.closeDropdowns);
}

closeDropdowns() {
  const dropdownMenus = document.querySelectorAll(".dropdown-menu");
  dropdownMenus.forEach((menu) => (menu as HTMLElement).style.display = "none");
}

}
