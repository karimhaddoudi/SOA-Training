import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UEService } from '../services/ue.service';
import { UniteEnseignement } from '../models/unite-enseignement';

@Component({
  selector: 'app-ue-edit',
  templateUrl: './ue-edit.component.html',
  styleUrls: ['./ue-edit.component.css']
})
export class UeEditComponent implements OnInit {
  ue: UniteEnseignement = {
    code: 0,
    domaine: '',
    responsable: '',
    credits: 0,
    semestre: 1
  };
  error = '';
  isLoading = false;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ueService: UEService
  ) {}

  ngOnInit(): void {
    const code = Number(this.route.snapshot.paramMap.get('code'));
    if (isNaN(code) || code <= 0) {
      this.error = 'Code UE invalide.';
      return;
    }

    this.loadUE(code);
  }

  loadUE(code: number): void {
    this.isLoading = true;
    this.ueService.getByCode(code).subscribe({
      next: (data) => {
        this.ue = data;
        this.error = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Impossible de charger l\'UE : ' + (err?.message || 'serveur indisponible');
        this.isLoading = false;
      }
    });
  }

  updateUE(): void {
    this.error = '';
    this.isSubmitting = true;
    this.ueService.update(this.ue.code, this.ue).subscribe({
      next: () => {
        alert('UE mise à jour avec succès.');
        this.isSubmitting = false;
        this.router.navigate(['/ue/list']);
      },
      error: (err) => {
        this.error = 'Erreur lors de la mise à jour : ' + (err?.message || 'serveur indisponible');
        this.isSubmitting = false;
      }
    });
  }
}
