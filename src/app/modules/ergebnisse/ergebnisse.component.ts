import { Component } from '@angular/core';
import { Athlet } from '../../data/athlets';
import { ApiService } from '../../core/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { AthletResult } from '../../data/athletresult';
@Component({
  selector: 'app-ergebnisse',
  templateUrl: './ergebnisse.component.html',
  styleUrls: ['./ergebnisse.component.css']
})
export class ErgebnisseComponent {
  athleten: AthletResult[] = [];
  sportart: string | null;

  
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sportart = this.route.snapshot.paramMap.get('sportart');
    if (this.sportart) {
      this.apiService.getAthletResult(this.sportart).subscribe((data) => {
        this.athleten = data;
      });
    }
  }
}