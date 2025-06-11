import {Component, inject} from '@angular/core';
import {GifsList} from '../../components/gifs-list/gifs-list';
import {GifService} from '../../services/gif.service';

@Component({
  selector: 'app-trending',
  imports: [
    GifsList
  ],
  templateUrl: './trending.html',
  standalone: true,
  styleUrl: './trending.css'
})
export default class Trending {

  gifsService:GifService = inject(GifService);




}

