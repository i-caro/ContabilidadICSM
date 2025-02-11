import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ClienteService } from '../../services/cliente.service';
import { FichaContableService } from '../../services/ficha-contable.service';
import { Cliente } from '../../models/cliente.model';
import { Transaccion } from '../../models/ficha-contable.model';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-factura-modal',
  templateUrl: './factura-modal.component.html',
  styleUrls: ['./factura-modal.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})

export class FacturaModalComponent implements OnInit {
    facturaForm: FormGroup;
    clientes: Cliente[] = [];
    clientesFiltrados: Cliente[] = [];
    transaccionesFiltradas: Transaccion[] = [];
    clienteSeleccionado: Cliente = {
        id: '',
        nombre: '',
        apellido: '',
        direccion: '',
        nif_nie: '',
        correo: '',
        telefono: '',
        observaciones: '',
        isDebtor: false
    };
    searchText: string = '';

    constructor(
      private fb: FormBuilder,
      private modalController: ModalController,
      private clienteService: ClienteService,
      private transactionService: FichaContableService,
      private pdfService: PdfGeneratorService
    ) {
      this.facturaForm = this.fb.group({
        cliente: [null],
        transacciones: [[]]
      });
    }

    ngOnInit() {
      this.cargarClientes();
    }

    cargarClientes() {
      this.clienteService.getClientes().subscribe(clientes => {
        this.clientes = clientes;
        this.clientesFiltrados = clientes;
      });
    }

    onClienteChange(event: any) {
      const clienteId = event.detail.value;
      this.clienteSeleccionado = this.clientes.find(c => c.id === clienteId)!;
      this.facturaForm.patchValue({ cliente: this.clienteSeleccionado });
      if (clienteId) {
        this.transactionService.getTransaccionesPorCliente(clienteId).subscribe(transacciones => {
          this.transaccionesFiltradas = transacciones;
        });
      } else {
        this.transaccionesFiltradas = [];
      }
    }

    cerrarModal() {
      this.modalController.dismiss();
    }

    generarFactura() {
      const cliente = this.facturaForm.value.cliente;
      const transacciones = this.transaccionesFiltradas.filter(t => this.facturaForm.value.transacciones.includes(t.id));
      if (!cliente || transacciones.length === 0) {
        alert('Selecciona un cliente y al menos una transacción');
        return;
      }
      
      // Llamada a la función existente para generar la factura proforma
      this.pdfService.generateFacturaProforma(cliente, transacciones);
      this.cerrarModal();
    }

    filtrarClientes() {
      const texto = this.quitarTildes(this.searchText.toLowerCase().trim());
  
      if (texto === '') {
        this.clientesFiltrados = this.clientes;
      } else {
        this.clientesFiltrados = this.clientes.filter(cliente =>
          this.quitarTildes(cliente.nombre.toLowerCase()).includes(texto) ||
          this.quitarTildes(cliente.correo.toLowerCase()).includes(texto) ||
          this.quitarTildes(cliente.telefono.toLowerCase()).includes(texto) ||
          (cliente.nif_nie && this.quitarTildes(cliente.nif_nie.toLowerCase()).includes(texto))
        );
      }
    }
  
    quitarTildes(texto: string): string {
      return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
}