import {computed, effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {GiphyRespone, GiphyResponeMin} from '../interfaces/GiphyRespone';
import {GifMapper} from '../../mapper/gifs/gif.mapper';
import {map, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  private httpClient: HttpClient = inject(HttpClient);

  trendingGifs: WritableSignal<GiphyResponeMin[]> = signal<GiphyResponeMin[]>([])
  trendingGifsLoading = signal(false);
  searchHistory = signal<Record<string, GiphyResponeMin[]>>(loadHistoryGifsByLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  private saveGifsToLocalStorage = effect(
    () => {
      localStorage.setItem("gifs", JSON.stringify(this.searchHistory()));
    })

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {

    this.httpClient.get<GiphyRespone>(
      `${environment.giphyUrl}/gifs/trending`,
      {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        },
      }
    ).subscribe((resp) => {

        const gifs: GiphyResponeMin[] = GifMapper.mapGiphyResponseDataItemsToGiphyResponseMinArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);

      }
    )
  }

  searchGifs(query: string) {

    return this.httpClient
      .get<GiphyRespone>(`${environment.giphyUrl}/gifs/search`,
        {
          params: {
            api_key: environment.giphyApiKey,
            limit: 20,
            q: query
          }
        }
      ).pipe(
        map((resp: GiphyRespone) => {

          return GifMapper.mapGiphyResponseDataItemsToGiphyResponseMinArray(resp.data);

        }),
        tap((resp: GiphyResponeMin[]) => {
          this.searchHistory.update((items) => ({
            [query.toLowerCase()]: resp,
            ...items
          }));

        })
      )
  }

  getHistoryGifs(query: string): GiphyResponeMin[] {

    return this.searchHistory()[query] ?? [];

  }


}

function loadHistoryGifsByLocalStorage(): Record<string, GiphyResponeMin[]> {

  const gifs = localStorage.getItem('gifs')

  if (gifs) {
    return JSON.parse(gifs);
  }
  return {}

}


