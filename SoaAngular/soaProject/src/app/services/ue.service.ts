import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UniteEnseignement } from '../models/unite-enseignement';

@Injectable({
  providedIn: 'root',
})
export class UEService {
  private baseUrl = 'http://localhost:8081/Gestion_UE_VF_war_exploded/api/ue';

  constructor(private http: HttpClient) {}

  getAll(): Observable<UniteEnseignement[]> {
    return this.http.get<UniteEnseignement[]>(`${this.baseUrl}/list`);
  }

  getByCode(code: number): Observable<UniteEnseignement> {
    return this.http.get<UniteEnseignement>(`${this.baseUrl}/list/code/${code}`);
  }

  getBySemestre(semestre: number): Observable<UniteEnseignement[]> {
    return this.http.get<UniteEnseignement[]>(`${this.baseUrl}/list/semestre/${semestre}`);
  }

  add(ue: UniteEnseignement): Observable<string> {
    return this.http.post(`${this.baseUrl}/add`, ue, { responseType: 'text' });
  }

  update(code: number, ue: UniteEnseignement): Observable<string> {
    return this.http.put(`${this.baseUrl}/list/update/${code}`, ue, { responseType: 'text' });
  }

  delete(code: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/list/${code}`, { responseType: 'text' });
  }
}
