import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FacturaModalComponent } from 'src/app/core/components/factura-component/factura-modal.component';

@Component({
  selector: 'app-facturas-proforma',
  templateUrl: './facturas-proforma.page.html',
  styleUrls: ['./facturas-proforma.page.scss'],
  standalone: false
})
export class FacturasProformaPage implements OnInit {
  
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async openFacturaModal() {
    const modal = await this.modalController.create({
      component: FacturaModalComponent
    });
    await modal.present();
  }
}
