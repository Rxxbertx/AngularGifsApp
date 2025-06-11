import {Data, GiphyResponeMin} from '../../gifs/interfaces/GiphyRespone';

export class GifMapper {

  static mapGiphyResponseDataToGiphyResponseMin(item: Data): GiphyResponeMin {

    return {
      id: item.id,
      url: item.images.original.url,
      title: item.title,
    }

  }

  static mapGiphyResponseDataItemsToGiphyResponseMinArray(items: Data[]): GiphyResponeMin[] {

    return items.map((item:Data)=> this.mapGiphyResponseDataToGiphyResponseMin(item))


  }


}
