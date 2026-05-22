import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { Module } from '../../models/module.model';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
  modules: Module[] = [];
  loading = true;
  error = '';

  constructor(private moduleService: ModuleService) {}

  ngOnInit(): void {
    this.moduleService.getAll().subscribe({
      next: (data) => {
        this.modules = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des modules';
        this.loading = false;
      }
    });
  }
}
