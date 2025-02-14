import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FacturaModalComponent } from 'src/app/core/components/factura-component/factura-modal.component';
import { Factura } from 'src/app/core/models/factura.model';
import { FacturaService } from 'src/app/core/services/facturas.service';

@Component({
  selector: 'app-facturas-definitivas',
  templateUrl: './facturas-definitivas.page.html',
  styleUrls: ['./facturas-definitivas.page.scss'],
  standalone: false
})
export class FacturasDefinitivasPage implements OnInit {
  facturas: Factura[] = [];
  searchText: string = ''; 
  facturasFiltradas: Factura[] = [];


  constructor(private modalController: ModalController, private facturaService: FacturaService) {}

  ngOnInit() {
    this.facturaService.getFacturas().subscribe({
      next: facturas => {
        this.facturas = facturas;
        this.facturasFiltradas = facturas;
      },
      error: err => {
        console.error("Error al obtener clientes:", err);
      }
    });
  }

  async openFacturaModal() {
    const modal = await this.modalController.create({
      component: FacturaModalComponent,
      componentProps:{
        proforma: false
      }
    });
    await modal.present();
  }

  abrirFactura(ruta: string) {
    window.open(`file://${ruta}`, '_blank');
  }

  filtrarClientes() {
    const texto = this.quitarTildes(this.searchText.toLowerCase().trim());

    if (texto === '') {
      this.facturasFiltradas = this.facturas;
    } else {
      this.facturasFiltradas = this.facturas.filter(factura =>
        this.quitarTildes(factura.nombre.toLowerCase()).includes(texto)
      );
    }
  }

  quitarTildes(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
