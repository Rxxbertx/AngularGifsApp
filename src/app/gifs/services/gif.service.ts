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
        this.trendingPage.update((actual)=>actual+1)


      }
    )
  }

  searchGifs(query: string) {

    if (!query)
      return;

    if (this.actualQuery != query){
      this.searchPage.set(0);
    }

    this.actualQuery = query;

    return this.httpClient
      .get<GiphyRespone>(`${environment.giphyUrl}/gifs/search`,
        {
          params: {
            api_key: environment.giphyApiKey,
            limit: 25,
            q: query,
            offset: 25 * this.searchPage(),
          }
        }
      ).pipe(
        map((resp: GiphyRespone) => {

          return GifMapper.mapGiphyResponseDataItemsToGiphyResponseMinArray(resp.data);

        }),
        tap((resp: GiphyResponeMin[]) => {

          this.searchPage.update((actual)=>actual+1)

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


  loadNewGifs(s: string) {

    switch (s) {

      case 'trending':
        this.loadTrendingGifs();
        break;
      case 'search':
        this.searchGifs(this.actualQuery);
        break;
      default:
        break;
    }


  }
}

function loadHistoryGifsByLocalStorage(): Record<string, GiphyResponeMin[]> {

  const gifs = localStorage.getItem('gifs')

  if (gifs) {
    return JSON.parse(gifs);
  }
  return {}

}


