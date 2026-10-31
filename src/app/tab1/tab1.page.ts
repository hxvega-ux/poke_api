import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItem, IonThumbnail, IonLabel, IonSpinner 
} from '@ionic/angular';
import { PokemonService } from '../services/pokemon.service';
import { PokemonListItem } from '../models/pokemon.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonThumbnail, IonLabel, IonSpinner
  ],
})
export class Tab1Page implements OnInit {
  pokemons: PokemonListItem[] = [];
  loading = true;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private cdr: ChangeDetectorRef // 1. Inyectamos ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.pokemonService.getPokemonList(25).subscribe({
      next: (data) => {
        this.pokemons = data;
        this.loading = false;
        this.cdr.detectChanges(); // 2. Forzamos el refresco inmediato de la pantalla
      },
      error: (err) => {
        console.error('Error al cargar Pokémon:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToDetail(id?: number) {
    if (id) {
      this.router.navigate(['/detail', id]);
    }
  }
}