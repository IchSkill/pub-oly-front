import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/service/api.service';

@Component({
  selector: 'app-ergebnisseeintragen',
  templateUrl: './ergebnisseeintragen.component.html',
  styleUrls: ['./ergebnisseeintragen.component.css']
})
export class ErgebnisseeintragenComponent implements OnInit {
  sportarten: any[] = [];
  athleten: any[] = [];
  selectedAthlet: any;
  selectedSportart: string;
  ergebnis: string;
  platzierung: number;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getAllAthleten();
    this.getSportarten();
  }

  getAllAthleten() {
    this.api.getAllAthletsRaw().subscribe((data: any) => {
      this.athleten = data;
    });
  }

  getSportarten() {
    this.api.getSportarten().subscribe((data: any) => {
      this.sportarten = data;
    });
  }

  postErgebnisse() {
    const requestBody = {
      sport: this.selectedSportart,
      result: [
        {
          name: this.selectedAthlet.a_name,
          platzierung: this.platzierung,
          wert: parseInt(this.ergebnis)
        }
      ]
    };

    this.api.postErgebnis(requestBody).subscribe((response: any) => {
      console.log(response);
      alert('Ergebnis erfolgreich eingetragen');
    }, (error) => {
      console.error(error);
      alert('Fehler beim Eintragen des Ergebnisses');
    });
  }
}
