import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Module as ModuleModel, TypeModule } from '../models/module';
import { UniteEnseignement } from '../models/unite-enseignement';
import { ModuleService } from '../services/module.service';
import { UEService } from '../services/ue.service';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.css']
})
export class ModuleEditComponent implements OnInit {
  module: ModuleModel = {
    matricule: '',
    nom: '',
    coefficient: 1,
    volumeHoraire: 1,
    type: TypeModule.TRANSVERSAL,
    uniteEnseignement: undefined
  };
  types = Object.values(TypeModule);
  ues: UniteEnseignement[] = [];
  isLoading = false;
  isSubmitting = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleService,
    private ueService: UEService
  ) {}

  ngOnInit(): void {
    this.loadUes();
    const matricule = this.route.snapshot.paramMap.get('matricule');
    if (matricule) {
      this.loadModule(matricule);
    } else {
      this.error = 'Matricule invalide.';
    }
  }

  loadUes(): void {
    this.ueService.getAll().subscribe({
      next: (data) => this.ues = data,
      error: () => this.ues = []
    });
  }

  loadModule(matricule: string): void {
    this.isLoading = true;
    this.moduleService.getByMatricule(matricule).subscribe({
      next: (data) => {
        this.module = data;
        this.error = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Impossible de charger le module : ' + (err?.message || 'serveur indisponible');
        this.isLoading = false;
      }
    });
  }

  updateModule(): void {
    this.error = '';
    this.isSubmitting = true;
    this.moduleService.update(this.module.matricule, this.module).subscribe({
      next: () => {
        alert('Module mis à jour avec succès.');
        this.isSubmitting = false;
        this.router.navigate(['/module/list']);
      },
      error: (err) => {
        this.error = 'Erreur lors de la mise à jour : ' + (err?.message || 'serveur indisponible');
        this.isSubmitting = false;
      }
    });
  }
}
