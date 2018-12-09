import { Component, OnInit } from '@angular/core';

import { Partner } from './partner.model'

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  partners: Partner[] = [
    new Partner("Atlante M", "../../assets/img/partners/atlantem.png"),
    new Partner("K Line", "../../assets/img/partners/kline.png"),
    new Partner("Amor Bois", "../../assets/img/partners/armorbois.png"),
    new Partner("Bretagne Matériaux", "../../assets/img/partners/bretagnemateriaux.png"),
    new Partner("Vendome", "../../assets/img/partners/vendome.png"),
    new Partner("Miroiterie Glaverouest", "../../assets/img/partners/glaverouest.png"),
    new Partner("MC France", "../../assets/img/partners/mcfrance.png"),
    new Partner("Partedis", "../../assets/img/partners/partedis.png"),
  ];

  constructor() { }

  ngOnInit() {
  }

}
