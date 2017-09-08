import { Component, OnInit } from '@angular/core';

import { Service } from './service.model'

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [
    new Service("Portes & Fenêtres", "Description", "../../assets/img/services/fenetre.svg"),
    new Service("Parquet", "Description", "../../assets/img/services/parquet.svg"),
    new Service("Aménagement intérieur", "Description", "../../assets/img/services/amenagement_interieur.svg"),
    new Service("Volets", "Description", "../../assets/img/services/volet.svg"),
    new Service("Charpente", "Description", "../../assets/img/services/charpente.svg"),
    new Service("Pose d'escalier", "Description", "../../assets/img/services/escalier.svg"),
    new Service("Isolation intérieure & extérieure", "Description", "../../assets/img/services/isolation.svg"),
    new Service("Terrasse", "Description", "../../assets/img/services/terrasse.svg")
  ];

  constructor() { }

  ngOnInit() {
  }

}
