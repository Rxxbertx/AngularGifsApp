import { Component } from '@angular/core';
import {MenuOptions} from '../../../interfaces/side-menu/side-menu'
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-side-menu-options',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu-options.html',
  styleUrl: './side-menu-options.css'
})
export class SideMenuOptions{

  menuOptions: MenuOptions[] = [

    {
      icon:'fa-solid fa-chart-line',
      label:'Trending',
      route:'/dashboard/trending',
      subLabel:'Popular Gifs',
    },
    {
      label:'Search',
      subLabel:'Search Gifs',
      route:'/dashboard/search',
      icon:'fa-solid fa-magnifying-glass'
    },

  ]






}
