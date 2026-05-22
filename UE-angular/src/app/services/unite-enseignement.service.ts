
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UniteEnseignement } from '../models/unite-enseignement.model';

@Injectable({ providedIn: 'root' })
export class UniteEnseignementService {
  private apiUrl = 'http://localhost:8081/Gestion_UE_VF_war_exploded/api/ue'; // Change port if needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<UniteEnseignement[]> {
    return this.http.get<UniteEnseignement[]>(`${this.apiUrl}/list`);
  }

  getBySemestre(semestre: number): Observable<UniteEnseignement[]> {
    return this.http.get<UniteEnseignement[]>(`${this.apiUrl}/list/${semestre}`);
  }

  getByCode(code: number): Observable<UniteEnseignement> {
    return this.http.get<UniteEnseignement>(`${this.apiUrl}/list/code/${code}`);
  }

  add(ue: UniteEnseignement): Observable<string> {
    return this.http.post(`${this.apiUrl}/add`, ue, { responseType: 'text' });
  }

  update(id: number, ue: UniteEnseignement): Observable<string> {
    return this.http.put(`${this.apiUrl}/list/update/${id}`, ue, { responseType: 'text' });
  }

  delete(code: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/list/${code}`, { responseType: 'text' });
  }
}
