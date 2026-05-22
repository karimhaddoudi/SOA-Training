import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UEService } from '../services/ue.service';
import { UniteEnseignement } from '../models/unite-enseignement';

@Component({
  selector: 'app-ue-add',
  templateUrl: './ue-add.component.html',
  styleUrls: ['./ue-add.component.css']
})
export class UeAddComponent {
  newUe: UniteEnseignement = {
    code: 0,
    domaine: '',
    responsable: '',
    credits: 0,
    semestre: 1
  };

  isSubmitting = false;
  error = '';

  constructor(private ueService: UEService, private router: Router) {}

  addUE(): void {
    this.error = '';
    this.isSubmitting = true;

    this.ueService.add(this.newUe).subscribe({
      next: () => {
        alert('UE ajoutée avec succès.');
        this.isSubmitting = false;
        this.router.navigate(['/ue/list']);
      },
      error: (err) => {
        this.error = 'Erreur lors de l’ajout : ' + (err?.message || 'serveur indisponible');
        this.isSubmitting = false;
      }
    });
  }

  resetForm(): void {
    this.newUe = {
      code: 0,
      domaine: '',
      responsable: '',
      credits: 0,
      semestre: 1
    };
  }
}
