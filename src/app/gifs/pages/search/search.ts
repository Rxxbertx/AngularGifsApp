import {Component, computed, inject, signal, WritableSignal} from '@angular/core';
import {GifsList} from "../../components/gifs-list/gifs-list";
import {GifService} from '../../services/gif.service';
import {GiphyResponeMin} from '../../interfaces/GiphyRespone';

@Component({
  selector: 'app-search',
  imports: [
    GifsList
  ],
  templateUrl: './search.html',
  standalone: true,
  styleUrl: './search.css'
})
export default class Search {

  gifsService: GifService = inject(GifService);

  searchedGifs = computed(()=> this.gifsService.searchedGifs());


  onSearch(query: string): void {

    this.gifsService.searchGifs(query);

  }


}
