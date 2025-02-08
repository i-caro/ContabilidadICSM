import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ModalTransaccionComponent } from 'src/app/core/components/transaccion-component/modal-transaccion.component';
import { FichaContable, Transaccion } from 'src/app/core/models/ficha-contable.model';
import { FichaContableService } from 'src/app/core/services/ficha-contable.service';
import { PdfGeneratorService } from 'src/app/core/services/pdf-generator.service';

@Component({
  selector: 'app-fichas-contable',
  templateUrl: './ficha-contable.page.html',
  styleUrls: ['./ficha-contable.page.scss'],
  standalone: false
})
export class FichaContablePage implements OnInit {
  fichas: FichaContable[] = [];
  fichasFiltradas: FichaContable[] = [];
  transacciones: Transaccion[] = [];
  searchText: string = ''; 

  constructor(
    private modalCtrl: ModalController,
    private fichaService: FichaContableService,
    private alertController: AlertController,
    private toastController: ToastController,
    private pdfService: PdfGeneratorService,
  ) {
  }

  ngOnInit() {
    this.fichaService.getFichas().subscribe({
      next: fichas => {
        this.fichas = fichas;
        this.fichasFiltradas = fichas;
        console.log("Clientes obtenidos:", this.fichas);
      },
      error: err => {
        console.error("Error al obtener clientes:", err);
      }
    });
  }

  filtrarFichas() {
    const texto = this.quitarTildes(this.searchText.toLowerCase().trim());

    if (texto === '') {
      this.fichasFiltradas = this.fichas;
    } else {
      this.fichasFiltradas = this.fichas.filter(ficha =>
        this.quitarTildes(ficha.clienteNombre.toLowerCase()).includes(texto)
      );
    }
  }

  quitarTildes(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  async agregarTransaccion(clienteId: string) {
      const modal = await this.modalCtrl.create({
        component: ModalTransaccionComponent,
        componentProps: { clienteId }
      });
  
      await modal.present();
  
      const { data } = await modal.onWillDismiss();
      if (data && data.transaccion) {
        await this.fichaService.crearTransaccion(data.transaccion);
        this.mostrarToast('Transaccion agregada con éxito');
      }
    }

    async mostrarToast(mensaje: string) {
      const toast = await this.toastController.create({
        message: mensaje,
        duration: 2000
      });
      toast.present();
    }

    getTransaccionesFiltradas(clienteId: string): Transaccion[] {
      return this.transacciones.filter(t => t.clienteId === clienteId);
    }
    
    async editarTransaccion(transaccion: Transaccion) {
        const modal = await this.modalCtrl.create({
          component: ModalTransaccionComponent,
          componentProps: { transaccion }
        });
      
        await modal.present();
      
        const { data } = await modal.onWillDismiss();
        if (data && data.transaccion) {
          await this.fichaService.editarTransaccion(data.transaccion);
          this.mostrarToast('Cliente actualizado con éxito');
        }
      }

}

