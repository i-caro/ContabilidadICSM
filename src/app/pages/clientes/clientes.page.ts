import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Client } from 'src/app/core/models/cliente.model';
import { ClientesService } from 'src/app/core/services/clientes.service';
import { ModalClienteComponent } from 'src/app/core/components/modal-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false
})
export class ClientesPage implements OnInit {
  clientes$!: Observable<Client[]>;

  constructor(private clientesService: ClientesService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.clientes$ = this.clientesService.getClientes();
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: ModalClienteComponent
    });
    await modal.present();
  }
}

