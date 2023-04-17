import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { AuthService } from './auth.service';
import { Experience} from "src/app/data/experience";
import { AthletResult } from "../../data/athletresult";
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
        })
    };

    constructor(private http: HttpClient,
        private authService: AuthService) { }


    public getMedailienspiegel() {

        return this.http.get(`${environment.apiUrl}` + '/medallienspiegel');
    }
    public getErgebnisseBySportart(name: string) {
        const params = new HttpParams().set('name', name);
        return this.http.get(`${environment.apiUrl}/ergebnisse/`, { params });
      }
    public addAthlete(name:string,birthday:string,nation:string,sport:string)
      {
        const token = this.authService.accessToken;
        const body = { name, birthday,nation,sport,token };
        console.log(body)
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authService.accessToken}`,
        });
      
        return this.http.post(`${environment.apiUrl}/create_athlete`, body, { headers });

      }
      public postErgebnis(requestBody: any) {
        return this.http.post(`${environment.apiUrl}/create_record`, requestBody);
      }
      public addAdmin(username: string, password: string) {
       const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log(password)
        const body = { username, password };
        console.log(body)

      
        return this.http.post(`${environment.apiUrl}/create_user`, body, {headers});
      }
    public getAthletResult(sportart: string): Observable<AthletResult[]> {
        const sportartUrl = `${environment.apiUrl}/ergebnisse/${sportart}`;
        return this.http.get<AthletResult[]>(sportartUrl);
      }
    public getAthletenbyCountry(nation: string): Observable<AthletResult[]> {
        const nationUrl = `${environment.apiUrl}/athleten/nation/${nation}`;
        return this.http.get<AthletResult[]>(nationUrl);
      }
    // public getAthletOfNation(sportart: string): Observable<AthletResult[]> {
    //     const athleteUrl = `${environment.apiUrl}/athlethen/nation${nation}`;
    //     return this.http.get<AthletResult[]>(athleteUrl);
    //   }
    public getSportarten() {

        return this.http.get(`${environment.apiUrl}` + '/sportarten');
    }
    getAllAthlets() {
        return this.http.get(`${environment.apiUrl}` + '/athleten');
    }
    // Get Also the Athlets which dont have a Value 
    getAllAthletsRaw() {
      return this.http.get(`${environment.apiUrl}` + '/athleten_name');
  }


    public deleteExperience(id: number) {
        // We need Authorized User and Submission data
        const params = new HttpParams().append('id', id);
        return this.http.get(`${environment.apiUrl}` + '/Dashboard/DeleteExperience',{params: params})
    }

    public editExperience(experience: Experience)  {
        return this.http.put(`${environment.apiUrl}` + '/Experience/EditExperience', experience, this.httpOptions);
    }
}
