import { Component } from '@angular/core';
import {environment} from '@environments/environment.development';

@Component({
  selector: 'app-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.html',
  styleUrl: './side-menu-header.css'
})
export class SideMenuHeader {

  envs = environment

}
