import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/core/models/cliente.model';
import { Transaccion } from 'src/app/core/models/ficha-contable.model';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { FichaContableService } from 'src/app/core/services/ficha-contable.service';

@Component({
  selector: 'app-posicion-cliente',
  templateUrl: './posicion-cliente.page.html',
  styleUrls: ['./posicion-cliente.page.scss'],
  standalone: false
})
export class PosicionClientePage implements OnInit {
  clientes: Cliente[] = [];
  transaccionesPorCliente: { [clienteId: string]: Transaccion[] } = {};
  clientesFiltrados: Cliente[] = [];
  searchText: string = '';

  constructor(private clienteService: ClienteService, private fichaContableService: FichaContableService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.clientesFiltrados = clientes;

      clientes.forEach(cliente => {
        this.fichaContableService.getTransaccionesPorCliente(cliente.id!).subscribe(transacciones => {
          this.transaccionesPorCliente[cliente.id!] = transacciones.filter(t => !t.pagado); // Guarda solo impagas
        });
      });
    });
  }

  getColor(clienteId: string): string {
    return this.transaccionesPorCliente[clienteId].length > 0? 'red' : 'green';
  }

  getTransaccionesImpagas(clienteId: string): Transaccion[] {
    return this.transaccionesPorCliente[clienteId] || [];
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
