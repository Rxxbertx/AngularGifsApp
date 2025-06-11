import {Component, input, Input, InputSignal,} from '@angular/core';
import {GifsListItem} from './gifs-list-item/gifs-list-item';
import {GiphyResponeMin} from '../../interfaces/GiphyRespone';

@Component({
  selector: 'app-gifs-list',
  imports: [
    GifsListItem
  ],
  templateUrl: './gifs-list.html',
  styleUrl: './gifs-list.css'
})
export class GifsList {

  gifsList: InputSignal<GiphyResponeMin[]> = input.required();

}
