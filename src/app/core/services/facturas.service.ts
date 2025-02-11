import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Factura } from '../models/factura.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
    private facturasCollection = this.firestore.collection<Factura>('facturas');

    constructor(private firestore: AngularFirestore) {
    }

    getFacturas(): Observable<Factura[]> {
        return this.facturasCollection
            .snapshotChanges()
            .pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Factura;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
            );
    }

    async agregarFactura(factura: Factura): Promise<void> {
        try {
          const docRef = await this.facturasCollection.add(factura);
        } catch (error) {
          console.error("Error al agregar factura:", error);
          throw error;
        }
      }
}