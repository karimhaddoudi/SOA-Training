import { Component, OnInit } from '@angular/core';
import { UEService } from '../services/ue.service';
import { UniteEnseignement } from '../models/unite-enseignement';

@Component({
  selector: 'app-ue-list',
  templateUrl: './ue-list.component.html',
  styleUrls: ['./ue-list.component.css']
})
export class UeListComponent implements OnInit {
  ues: UniteEnseignement[] = [];
  allUes: UniteEnseignement[] = [];
  error = '';
  isLoading = false;
  searchCode: number | null = null;
  searchDomaine = '';
  searchSemestre: number | null = null;

  constructor(private ueService: UEService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.isLoading = true;
    this.ueService.getAll().subscribe({
      next: (data) => {
        this.allUes = data;
        this.ues = data;
        this.error = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur de chargement : ' + (err?.message || 'serveur indisponible');
        this.isLoading = false;
      }
    });
  }

  searchUes(): void {
    this.error = '';

    if (this.searchCode && this.searchCode > 0) {
      this.isLoading = true;
      this.ueService.getByCode(this.searchCode).subscribe({
        next: (data) => {
          this.ues = [data];
          this.isLoading = false;
        },
        error: (err) => {
          this.ues = [];
          this.error = 'Aucune UE trouvée pour le code ' + this.searchCode;
          this.isLoading = false;
        }
      });
      return;
    }

    const domaine = this.searchDomaine.trim().toLowerCase();
    const semestre = this.searchSemestre;

    if (!domaine && !semestre) {
      this.loadAll();
      return;
    }

    this.ues = this.allUes.filter((ue) => {
      let matches = true;
      if (domaine) {
        matches = ue.domaine.toLowerCase().includes(domaine);
      }
      if (semestre) {
        matches = matches && ue.semestre === semestre;
      }
      return matches;
    });

    if (this.ues.length === 0) {
      this.error = 'Aucune UE ne correspond aux critères.';
    }
  }

  resetFilters(): void {
    this.searchCode = null;
    this.searchDomaine = '';
    this.searchSemestre = null;
    this.error = '';
    this.loadAll();
  }

  deleteUE(code: number): void {
    const confirmed = confirm('Voulez-vous vraiment supprimer cette unité d\'enseignement ?');
    if (!confirmed) {
      return;
    }

    this.isLoading = true;
    this.ueService.delete(code).subscribe({
      next: () => {
        alert('UE supprimée avec succès.');
        this.error = '';
        this.loadAll();
      },
      error: (err) => {
        this.error = 'Erreur lors de la suppression : ' + (err?.message || 'serveur indisponible');
        this.isLoading = false;
      }
    });
  }

}
