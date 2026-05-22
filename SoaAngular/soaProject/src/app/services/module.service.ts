import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module as ModuleModel } from '../models/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private baseUrl = 'http://localhost:8081/Gestion_UE_VF_war_exploded/api/Module';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ModuleModel[]> {
    return this.http.get<ModuleModel[]>(`${this.baseUrl}/list`);
  }

  getByMatricule(matricule: string): Observable<ModuleModel> {
    return this.http.get<ModuleModel>(`${this.baseUrl}/list/${matricule}`);
  }

  add(module: ModuleModel): Observable<string> {
    return this.http.post(`${this.baseUrl}/add`, module, { responseType: 'text' });
  }

  update(matricule: string, module: ModuleModel): Observable<string> {
    return this.http.put(`${this.baseUrl}/update/${matricule}`, module, { responseType: 'text' });
  }

  delete(matricule: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/list/${matricule}`, { responseType: 'text' });
  }
}
