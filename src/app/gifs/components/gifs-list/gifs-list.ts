import {Component, input, InputSignal} from '@angular/core';
import {GifsListItem} from './gifs-list-item/gifs-list-item';
import {GifItemType} from '../../interfaces/gif-item-interface';

@Component({
  selector: 'app-gifs-list',
  imports: [
    GifsListItem
  ],
  templateUrl: './gifs-list.html',
  styleUrl: './gifs-list.css'
})
export class GifsList {

  gifsList : InputSignal<GifItemType[]> = input.required()


}
