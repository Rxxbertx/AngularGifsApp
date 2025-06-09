import {Component} from '@angular/core';
import {GifsList} from '../../components/gifs-list/gifs-list';
import {GifItemType} from '../../interfaces/gif-item-interface';

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

  protected readonly gifs = gifs;
}

const gifs: GifItemType[] = [

  {
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    title: 'undefined'
  }, {
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    title: 'undefined'
  }, {
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    title: 'undefined'
  }, {
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    title: 'undefined'
  }, {
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    title: 'undefined'
  }, {
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
    title: 'undefined'
  }, {
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
    title: 'undefined'
  }, {
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
    title: 'undefined'
  }, {
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
    title: 'undefined'
  }, {
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
    title: 'undefined'
  }, {
    image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
    title: 'undefined'
  },
];
