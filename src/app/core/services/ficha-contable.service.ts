import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, updateDoc, arrayUnion, deleteDoc } from '@angular/fire/firestore';
import { FichaContable, Transaccion } from '../models/ficha-contable.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichaContableService {
    private fichaCollection = this.firestore.collection<FichaContable>('ficha-contable');
    private transCollection = this.firestore.collection<Transaccion>('transaccion')
    
    constructor(private firestore: AngularFirestore){}

    async agregarFicha(ficha: FichaContable): Promise<void> {
        try {
          const docRef = await this.fichaCollection.add(ficha);
          return console.log("Ficha agregada con ID:", docRef.id);
        } catch (error) {
          console.error("Error al agregar ficha:", error);
          throw error;
        }
    }

    async crearTransaccion(transaccion: Transaccion): Promise<void>{
        try{
            const docRef = await this.transCollection.add(transaccion)
            return console.log("Transaccion agregada con ID:", docRef.id)
        }catch(error){
            console.error("Error al agregar la transaccion:", error)
            throw error;
        }
    }

    getFichas(): Observable<FichaContable[]> {
        return this.fichaCollection
          .snapshotChanges()
          .pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as FichaContable;
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          );
      }


      async editarTransaccion(transaccion: Transaccion): Promise<void> {
        console.log("Intentando actualizar transaccion con ID:", transaccion.id);
    
        try {
          const transRef = doc(this.firestore.firestore, 'transaccion', transaccion.id!);
          await updateDoc(transRef, {
            descripcion: transaccion.descripcion,
            monto: transaccion.monto,
            pagado: transaccion.pagado
          });
    
          console.log("Transaccion actualizada con éxito.");
        } catch (error) {
          console.error("Error al actualizar transaccion:", error);
          throw error;
        }
      }

      getTransacciones(): Observable<Transaccion[]> {
        return this.transCollection
          .snapshotChanges()
          .pipe(
            map(actions =>
              actions.map(a => {
                const data = a.payload.doc.data() as Transaccion;
                const id = a.payload.doc.id;
                return { id, ...data };
              })
            )
          );
      }

      async eliminarTransaccion(transaccionId: string): Promise<void> {
        console.log("Intentando eliminar transacción con ID:", transaccionId);
    
        try {
          const transRef = doc(this.firestore.firestore, 'transaccion', transaccionId);
          await deleteDoc(transRef);
          console.log("Transacción eliminada con éxito.");
        } catch (error) {
          console.error("Error al eliminar la transacción:", error);
          throw error;
        }
      }

      async eliminarFichaYTransaccionesPorClienteId(clienteId: string): Promise<void> {
        console.log("Intentando eliminar ficha contable y transacciones del cliente con ID:", clienteId);
      
        try {
          const transaccionesSnapshot = await this.transCollection.ref.where('clienteId', '==', clienteId).get();
          
          if (!transaccionesSnapshot.empty) {
            const batch = this.firestore.firestore.batch();
            transaccionesSnapshot.forEach(doc => {
              batch.delete(doc.ref);
            });
      
            await batch.commit();
            console.log("Todas las transacciones eliminadas para el cliente ID:", clienteId);
          }
      
          const fichaSnapshot = await this.fichaCollection.ref.where('clienteId', '==', clienteId).get();
          
          if (!fichaSnapshot.empty) {
            fichaSnapshot.forEach(async (doc) => {
              await doc.ref.delete();
              console.log("Ficha contable eliminada con éxito para el cliente ID:", clienteId);
            });
          } else {
            console.warn("No se encontró una ficha contable para el cliente con ID:", clienteId);
          }
      
        } catch (error) {
          console.error("Error al eliminar la ficha contable y transacciones:", error);
          throw error;
        }
      }

      getTransaccionesPorCliente(clienteId: string): Observable<Transaccion[]> {
        return this.transCollection.snapshotChanges().pipe(
          map(actions => 
            actions
              .filter(a => a.payload.doc.data().clienteId === clienteId)
              .map(a => {
                const data = a.payload.doc.data() as Transaccion;
                const id = a.payload.doc.id;
                return { id, ...data };
              })
          )
        );
    }
    
}

