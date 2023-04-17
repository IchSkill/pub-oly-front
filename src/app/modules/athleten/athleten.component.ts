import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../core/service/country.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-athlet',
  templateUrl: './athleten.component.html',
  styleUrls: ['./athleten.component.css'],
})
export class AthletenComponent implements OnInit {
  sportart: string | null;
  countryFlags: {[key: string]: string} = {};
  countries: any[] = [
    { name: 'Deutschland', flag: '' },
    { name: 'Jamaika', flag: '' },
    { name: 'Polen', flag: '' },
    { name: 'Spanien', flag: '' },
    { name: 'Frankreich', flag: '' },
    { name: 'Italien', flag: '' },
  ];
  athletes: any[] = [];
  selectedCountry: any = null;

  constructor(
    private router: Router,
    private countryService: CountryService,
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.selectedCountry = this.route.snapshot.paramMap.get('nation');
    console.log('Ausgewähltes Land:', this.selectedCountry);
  
    this.getAthletsByCountry(this.selectedCountry);
    this.loadCountryFlags();
  }

  loadCountryFlags() {
    this.countries.forEach((country) => {
    this.countryService.getCountryFlag(country.name).subscribe((flag) => {
    country.flag = flag;
    console.log('Landesflagge:', country.name, flag);
    });
    });
    }
    
    getCountries() {
    
    }
    
    selectCountry(country: any) {
    this.selectedCountry = country.name;
    this.getAthletsByCountry(country.name);
    }
    
    getAthletsByCountry(countryName: string) {
    this.api.getAthletenbyCountry(countryName).subscribe((data) => {
    this.athletes = data;
    console.log('Athleten:', this.athletes);
    });
    }
    
    getCountryFlag(countryName: string) {
    return this.countryFlags[countryName];
    }
  }