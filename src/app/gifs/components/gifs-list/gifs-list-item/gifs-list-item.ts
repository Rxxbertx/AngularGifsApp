import {Component, Input} from '@angular/core';
import {GifItemType} from '../../../interfaces/gif-item-interface';

@Component({
  selector: 'app-gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.html',
  styleUrl: './gifs-list-item.css'
})
export class GifsListItem {

  @Input() data!: GifItemType;

}
