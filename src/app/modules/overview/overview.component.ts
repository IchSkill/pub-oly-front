import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ApiService } from "../../core/service/api.service";
import { Medaillenspiegel } from "../../data/medallienspiegel";
import { getSafePropertyAccessString } from "@angular/compiler";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  sportarten: any[] = [];
  athleten: any[] = [];

  medaillenspiegel: Medaillenspiegel[];
  //medalienspiegel: any;
  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.getMedallienspiegel()
    this.getSportarten()
    this.getAllAthleten()
  }
  getAllAthleten() {
    this.api.getAllAthlets().subscribe((data: any) => {
      this.athleten = data;
      console.log("GetAllAthlets()")
      console.log(this.athleten);
    });
  }

  getSportarten() {
    this.api.getSportarten().subscribe((data: any) => {
      this.sportarten = data;
      console.log(this.sportarten);
    });
  }
  getMedallienspiegel(){
    this.api.getMedailienspiegel().subscribe((data: any) => {
      this.medaillenspiegel = data;
      console.log(this.medaillenspiegel)
    });


  }
  goToSportDetails(name: string) {
    const cleanURL = this.removeIconsfromString(name)
    this.router.navigate(['/ergebnisse/', cleanURL]);
  }
  goToAthletsOfNation(nation: string) {
    this.router.navigate(['/athleten/nation/', nation])
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
}
