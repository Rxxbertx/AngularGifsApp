import {Component, computed, ElementRef, inject, input, Input, InputSignal, viewChild,} from '@angular/core';
import {GifsListItem} from './gifs-list-item/gifs-list-item';
import {GiphyResponeMin} from '../../interfaces/GiphyRespone';
import {GifService} from '../../services/gif.service';

@Component({
  selector: 'app-gifs-list',
  imports: [
    GifsListItem
  ],
  templateUrl: './gifs-list.html',
  styleUrl: './gifs-list.css'
})
export class GifsList {

  gifService = inject(GifService);


  scrollDivRef = viewChild<ElementRef>('gifsDiv');

  gifsList: InputSignal<GiphyResponeMin[]> = input.required();

  gifsSection: InputSignal<string> = input.required();

  gifsListMasonry = computed(() => {

    const groups = [];

    for (let i = 0; i < this.gifsList().length; i += 3) {
      groups.push(this.gifsList().slice(i, i + 3));
    }
    return groups;

  });

  onScroll() {

    const scrollDiv = this.scrollDivRef()?.nativeElement;
    const scrollTop = scrollDiv.scrollTop; //scroll que tenemos realizado del elemento hacia arriba
    const clientHeight = scrollDiv.clientHeight; //tamano del view que ve el user
    const scrollHeight = scrollDiv.scrollHeight; //tamano total del div
    const hasToLoadNewGifs = scrollTop+clientHeight >= scrollHeight - 300;

    if (hasToLoadNewGifs) {
      this.gifService.loadNewGifs(this.gifsSection());
    }



  }

}
