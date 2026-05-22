import { Component, OnInit } from '@angular/core';
import { UniteEnseignementService } from '../../services/unite-enseignement.service';
import { UniteEnseignement } from '../../models/unite-enseignement.model';

@Component({
  selector: 'app-ue-list',
  templateUrl: './ue-list.component.html',
  styleUrls: ['./ue-list.component.css']
})
export class UeListComponent implements OnInit {
  ues: UniteEnseignement[] = [];
  loading = true;
  error = '';

  constructor(private ueService: UniteEnseignementService) {}

  ngOnInit(): void {
    this.ueService.getAll().subscribe({
      next: (data) => {
        this.ues = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des unités d\'enseignement';
        this.loading = false;
      }
    });
  }
}
