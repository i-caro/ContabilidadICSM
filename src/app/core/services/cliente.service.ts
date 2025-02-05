import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientesCollection = this.firestore.collection<Cliente>('clientes');

  constructor(private firestore: AngularFirestore) {}

  getClientes(): Observable<Cliente[]> {
    return this.clientesCollection.valueChanges({ idField: 'id' });
  }

  agregarCliente(cliente: Cliente): Promise<void> {
    const id = this.firestore.createId();
    return this.clientesCollection.doc(id).set({ ...cliente, id });
  }

  editarCliente(cliente: Cliente): Promise<void> {
    return this.clientesCollection.doc(cliente.id).update(cliente);
  }

  eliminarCliente(id: string): Promise<void> {
    return this.clientesCollection.doc(id).delete();
  }
}
