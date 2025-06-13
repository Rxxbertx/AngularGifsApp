import {AfterViewInit, Component, computed, ElementRef, inject, input, InputSignal, viewChild,} from '@angular/core';
import {GifsListItem} from './gifs-list-item/gifs-list-item';
import {GiphyResponeMin} from '../../interfaces/GiphyRespone';
import {GifService} from '../../services/gif.service';
import {ScrollStateService} from '../../../shared/services/scroll-state.service';

@Component({
  selector: 'app-gifs-list',
  imports: [
    GifsListItem
  ],
  templateUrl: './gifs-list.html',
  styleUrl: './gifs-list.css'
})
export class GifsList implements AfterViewInit {

  gifService = inject(GifService);
  scrollState = inject(ScrollStateService);

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
    const hasToLoadNewGifs = scrollTop + clientHeight >= scrollHeight - 300;

    this.updateScrollStateBasedOnSection(this.gifsSection(), scrollTop);

    if (hasToLoadNewGifs) {
      this.gifService.loadNewGifs(this.gifsSection());
    }

  }

  updateScrollStateBasedOnSection(section: string, scrollTop: number) {

    switch (section) {

      case 'trending':
        this.scrollState.trendingScrollState.set(scrollTop)
        break;
      default:
        break;
    }

  }

  applyScrollStateBasedOnSection(section: string) {

    switch (section) {

      case 'trending':
        const scrollDiv = this.scrollDivRef()?.nativeElement;
        scrollDiv.scrollTop = this.scrollState.trendingScrollState()
        break;
      default:
        break;
    }


  }

  ngAfterViewInit(): void {
    this.applyScrollStateBasedOnSection(this.gifsSection())
  }

}
