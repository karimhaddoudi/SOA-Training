import { Component, OnInit } from '@angular/core';
import { EnseignementService, UniteEnseignement } from '../../services/enseignement.service';

@Component({
  selector: 'app-enseignement-list',
  templateUrl: './enseignement-list.component.html',
  styleUrls: ['./enseignement-list.component.css']
})
export class EnseignementListComponent implements OnInit {
  unites: UniteEnseignement[] = [];
  loading = true;
  error = '';

  constructor(private enseignementService: EnseignementService) { }

  ngOnInit(): void {
    this.enseignementService.getUnitesEnseignement().subscribe({
      next: (data) => {
        this.unites = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des unités d\'enseignement';
        this.loading = false;
      }
    });
  }
}
