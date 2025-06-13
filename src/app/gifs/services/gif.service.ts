import {computed, effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {GiphyRespone, GiphyResponeMin} from '../interfaces/GiphyRespone';
import {GifMapper} from '../../mapper/gifs/gif.mapper';
import {map} from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {

  private httpClient: HttpClient = inject(HttpClient);

  trendingGifs: WritableSignal<GiphyResponeMin[]> = signal<GiphyResponeMin[]>([])
  searchedGifs: WritableSignal<GiphyResponeMin[]> = signal<GiphyResponeMin[]>([])
  trendingGifsLoading = signal(false);
  searchedGifsLoading = signal(false);
  private trendingPage = signal(1);
  private searchPage = signal(1);
  searchHistory = signal<Record<string, GiphyResponeMin[]>>(loadHistoryGifsByLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  private saveGifsToLocalStorage = effect(
    () => {
      localStorage.setItem("gifs", JSON.stringify(this.searchHistory()));
    })

  private actualQuery: string = '';

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {

    if (this.trendingGifsLoading())
      return;

    this.trendingGifsLoading.set(true);

    this.httpClient.get<GiphyRespone>(
      `${environment.giphyUrl}/gifs/trending`,
      {
        params: {
          api_key: environment.giphyApiKey,
          limit: 25,
          offset: 25 * this.trendingPage()
        },
      }
    ).subscribe((resp) => {

        const gifs: GiphyResponeMin[] = GifMapper.mapGiphyResponseDataItemsToGiphyResponseMinArray(resp.data);
        this.trendingGifs.update((actualGifs) => [...actualGifs, ...gifs]);
        this.trendingGifsLoading.set(false);
        this.trendingPage.update((actual) => actual + 1)

      }
    )
  }

  searchGifs(query: string) {

    if (!query)
      return;

    this.searchPage.set(0);
    this.searchedGifs.set([]);

    this.actualQuery = query;

    this.apiSearchCall(query);

  }

  apiSearchCall(query: string) {

    if (this.searchedGifsLoading())
      return;

    this.searchedGifsLoading.set(true);


    this.httpClient
      .get<GiphyRespone>(`${environment.giphyUrl}/gifs/search`,
        {
          params: {
            api_key: environment.giphyApiKey,
            limit: 100,
            q: query,
            offset: 100 * this.searchPage()
          }
        }
      ).pipe(
      map((resp: GiphyRespone) => {

          return GifMapper.mapGiphyResponseDataItemsToGiphyResponseMinArray(resp.data);

        }
      )
    ).subscribe((resp: GiphyResponeMin[]) => {

        this.searchedGifs.update((actualGifs) => [...actualGifs, ...resp])
        this.searchPage.update((actual) => actual + 1);

      this.searchHistory.update((items) => {
        const key = query.toLowerCase();
        const { [key]: _, ...rest } = items; // Remove the key if it exists
        return {
          [key]: this.searchedGifs(),
          ...rest
        };
      });

      this.searchedGifsLoading.set(false);

      }
    )

  }


  getHistoryGifs(query: string): GiphyResponeMin[] {
    return this.searchHistory()[query] ?? [];
  }


  loadNewGifs(s: string) {

    switch (s) {

      case 'trending':
        this.loadTrendingGifs();
        break;
      case 'search':
        this.searchNewGifs();
        break;
      default:
        break;
    }

  }

  private searchNewGifs() {
    this.apiSearchCall(this.actualQuery);
  }

  setActualQuery(query: string) {

    this.actualQuery = query;

  }
}

function loadHistoryGifsByLocalStorage(): Record<string, GiphyResponeMin[]> {

  const gifs = localStorage.getItem('gifs')

  if (gifs) {
    return JSON.parse(gifs);
  }
  return {}

}


