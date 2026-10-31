import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PokemonListResponse, PokemonDetail, PokemonListItem } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 25, offset: number = 0): Observable<PokemonListItem[]> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      map(response => {
        return response.results.map(pokemon => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          const pokemonId = id ? parseInt(id, 10) : 0;
          return {
            ...pokemon,
            id: pokemonId,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
          };
        });
      })
    );
  }

  getPokemonDetail(idOrName: string | number): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.baseUrl}/pokemon/${idOrName}`);
  }
}