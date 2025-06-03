import { Component } from '@angular/core';
import {SideMenu} from '../../components/side-menu/side-menu';

@Component({
  selector: 'app-dashboard',
  imports: [
    SideMenu
  ],
  templateUrl: './dashboard.html',
  standalone: true,
  styleUrl: './dashboard.css'
})
export default class Dashboard {



}
