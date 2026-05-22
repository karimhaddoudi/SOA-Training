import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module as ModuleModel, TypeModule } from '../models/module';
import { ModuleService } from '../services/module.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
  modules: ModuleModel[] = [];
  error = '';
  isLoading = false;

  constructor(private moduleService: ModuleService, private router: Router) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.isLoading = true;
    this.moduleService.getAll().subscribe({
      next: (data) => {
        this.modules = data;
        this.error = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur de chargement : ' + (err?.message || 'serveur indisponible');
        this.isLoading = false;
      }
    });
  }

  editModule(matricule: string): void {
    this.router.navigate(['/module/update', matricule]);
  }

  deleteModule(matricule: string): void {
    if (!confirm('Voulez-vous vraiment supprimer ce module ?')) {
      return;
    }
    this.isLoading = true;
    this.moduleService.delete(matricule).subscribe({
      next: () => {
        alert('Module supprimé avec succès.');
        this.loadAll();
      },
      error: (err) => {
        this.error = 'Erreur lors de la suppression : ' + (err?.message || 'serveur indisponible');
        this.isLoading = false;
      }
    });
  }
}
