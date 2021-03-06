import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( public navCtrl: NavController ) { }

  ngOnInit() {
  }


  listUsers() {
    this.navCtrl.navigateForward('usuarios/todos');
  }


  createUsers() {
    this.navCtrl.navigateForward('usuarios/criar');
  }


  devStatus() {
    this.navCtrl.navigateForward('dev/status');
  }


  devCamera() {
    this.navCtrl.navigateForward('dev/camera');
  }


  geolocation() {
    this.navCtrl.navigateForward('dev/gps');
  }
}
