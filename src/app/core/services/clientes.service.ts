import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private collectionName = 'clientes';

  constructor(private firestore: AngularFirestore) {}

  // Obtener todos los clientes
  getClientes(): Observable<Client[]> {
    return this.firestore.collection<Client>(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Obtener un cliente por ID
  getClienteById(id: string): Observable<Client | undefined> {
    return this.firestore.collection<Client>(this.collectionName).doc(id).valueChanges();
  }

  // Crear un cliente
  addCliente(cliente: Client): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection<Client>(this.collectionName).doc(id).set({ ...cliente, id });
  }

  // Actualizar un cliente
  updateCliente(id: string, cliente: Partial<Client>): Promise<void> {
    return this.firestore.collection<Client>(this.collectionName).doc(id).update(cliente);
  }

  // Eliminar un cliente
  deleteCliente(id: string): Promise<void> {
    return this.firestore.collection<Client>(this.collectionName).doc(id).delete();
  }
}