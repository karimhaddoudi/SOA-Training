import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from '../models/module.model';

@Injectable({ providedIn: 'root' })
export class ModuleService {
  private apiUrl = 'http://localhost:8081/Gestion_UE_VF_war_exploded/api/Module'; // Change port if needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/list`);
  }

  getByMatricule(matricule: string): Observable<Module> {
    return this.http.get<Module>(`${this.apiUrl}/list/${matricule}`);
  }

  add(module: Module): Observable<string> {
    return this.http.post(`${this.apiUrl}/add`, module, { responseType: 'text' });
  }

  update(matricule: string, module: Module): Observable<string> {
    return this.http.put(`${this.apiUrl}/update/${matricule}`, module, { responseType: 'text' });
  }

  delete(matricule: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/list/${matricule}`, { responseType: 'text' });
  }

  getByUE(ue: any): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/listByUE`, { body: ue });
  }
}
