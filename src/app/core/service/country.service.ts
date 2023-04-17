import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
interface Translation {
  common?: string;
  official?: string;
  }
@Injectable({
  providedIn: 'root'
})

export class CountryService {
  
  private apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient,
    private api: ApiService) { }

    getCountryFlag(countryName: string): Observable<string> {
      return this.http.get<any[]>(this.apiUrl).pipe(
      map(countries => {
        const country = countries.find(c => c.name?.common === countryName || c.name?.official === countryName || Object.values<Translation>(c.translations).some(t => t?.common === countryName || t?.official === countryName));
      return country ? country.flags?.svg : null;
      })
      );
      }
}