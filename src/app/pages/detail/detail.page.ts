import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, 
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonBadge, 
  IonGrid, IonRow, IonCol, IonProgressBar, IonSpinner, IonLabel 
} from '@ionic/angular';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetail } from '../../models/pokemon.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  standalone: true,
  imports: [
    CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, 
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, 
    IonBadge, IonGrid, IonRow, IonCol, IonProgressBar, IonSpinner, IonLabel
  ]
})
export class DetailPage implements OnInit {
  pokemon?: PokemonDetail;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef // 1. Inyectamos ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemonDetail(id).subscribe({
        next: (data) => {
          this.pokemon = data;
          this.loading = false;
          this.cdr.detectChanges(); // 2. Refrescamos la vista inmediatamente
        },
        error: (err) => {
          console.error('Error al cargar detalle:', err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.loading = false;
    }
  }

  formatId(id?: number): string {
    if (!id) return '';
    return `#${id.toString().padStart(3, '0')}`;
  }

  getMeterHeight(heightDecimeters?: number): string {
    if (!heightDecimeters) return '0 m';
    return `${(heightDecimeters / 10).toFixed(1)} m`;
  }

  getKgWeight(weightHectograms?: number): string {
    if (!weightHectograms) return '0 kg';
    return `${(weightHectograms / 10).toFixed(1)} kg`;
  }
}