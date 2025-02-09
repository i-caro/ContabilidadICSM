import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Cliente } from '../models/cliente.model';
import { FichaContable } from '../models/ficha-contable.model';
import { FichaContableService } from './ficha-contable.service';



@Injectable({
  providedIn: 'root'
})


export class ClienteService {
  private clientesCollection = this.firestore.collection<Cliente>('clientes');

  constructor(private firestore: AngularFirestore, private fichaService: FichaContableService) {
  }

  getClientes(): Observable<Cliente[]> {
    return this.clientesCollection
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Cliente;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  async getCliente(clienteId: string): Promise<Cliente | null> {
    try {
      const clienteRef = doc(this.firestore.firestore, 'clientes', clienteId);
      const clienteSnap = await getDoc(clienteRef);

      if (clienteSnap.exists()) {
        return clienteSnap.data() as Cliente;
      } else {
        console.warn(`⚠ Cliente con ID "${clienteId}" no encontrado.`);
        return null;
      }
    } catch (error) {
      console.error('❌ Error al obtener el cliente:', error);
      return null;
    }
  }
  

  async agregarCliente(cliente: Cliente): Promise<void> {
    try {
      const docRef = await this.clientesCollection.add(cliente);

      const ficha: FichaContable = {
        clienteId: docRef.id,
        clienteNombre: cliente.nombre,
        saldo: 0,
    };

    await this.fichaService.agregarFicha(ficha);

      return console.log("Cliente agregado con ID:", docRef.id);
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      throw error;
    }
  }
  
  

  async editarCliente(cliente: Cliente): Promise<void> {
    console.log("Intentando actualizar cliente con ID:", cliente.id);

    try {
      const clienteRef = doc(this.firestore.firestore, 'clientes', cliente.id!);
      await updateDoc(clienteRef, {
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        direccion: cliente.direccion,
        nif_nie: cliente.nif_nie,
        correo: cliente.correo,
        telefono: cliente.telefono,
        observaciones: cliente.observaciones,
        isDebtor: cliente.isDebtor
      });

      console.log("Cliente actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      throw error;
    }
  }
  

  async eliminarCliente(clienteId: string): Promise<void> {
    console.log("Intentando eliminar cliente con ID:", clienteId);

    try {
      const clienteRef = doc(this.firestore.firestore, 'clientes', clienteId);
      await deleteDoc(clienteRef);
      this.fichaService.eliminarFichaYTransaccionesPorClienteId(clienteId);
      console.log("Cliente eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      throw error;
    }
  }
}
