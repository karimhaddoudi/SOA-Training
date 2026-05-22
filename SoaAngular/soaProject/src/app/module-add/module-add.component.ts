import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module as ModuleModel, TypeModule } from '../models/module';
import { UniteEnseignement } from '../models/unite-enseignement';
import { ModuleService } from '../services/module.service';
import { UEService } from '../services/ue.service';

@Component({
  selector: 'app-module-add',
  templateUrl: './module-add.component.html',
  styleUrls: ['./module-add.component.css']
})
export class ModuleAddComponent implements OnInit {
  newModule: ModuleModel = {
    matricule: '',
    nom: '',
    coefficient: 1,
    volumeHoraire: 1,
    type: TypeModule.TRANSVERSAL,
    uniteEnseignement: undefined
  };

  types = Object.values(TypeModule);
  ues: UniteEnseignement[] = [];
  isSubmitting = false;
  error = '';

  constructor(
    private moduleService: ModuleService,
    private ueService: UEService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ueService.getAll().subscribe({
      next: (data) => this.ues = data,
      error: () => this.ues = []
    });
  }

  addModule(): void {
    this.error = '';
    this.isSubmitting = true;
    this.moduleService.add(this.newModule).subscribe({
      next: () => {
        alert('Module ajouté avec succès.');
        this.isSubmitting = false;
        this.router.navigate(['/module/list']);
      },
      error: (err) => {
        this.error = 'Erreur lors de l’ajout : ' + (err?.message || 'serveur indisponible');
        this.isSubmitting = false;
      }
    });
  }
}
