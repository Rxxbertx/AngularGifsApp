import {Component, computed, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {GifService} from '../../services/gif.service';
import {GifsList} from '../../components/gifs-list/gifs-list';

@Component({
  selector: 'app-history',
  imports: [
    GifsList
  ],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export default class History {

  gifService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(
        (params) => params['query']
      )
    )
  )

  gifsHistory = computed(
    () =>
      this.gifService.getHistoryGifs(this.query())
  )


}
