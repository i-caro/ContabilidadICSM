import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { catchError, finalize, throwError } from 'rxjs';



@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ModalClienteComponent {
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    direccion: '',
    nif_nie: '',
    correo: '',
    telefono: '',
    observaciones: '',
    isDebtor: false,
    imagenUrl: ''
  };

  imagenSeleccionada: File | null = null;
  urlImagen: string = '';

  constructor(private modalCtrl: ModalController, private storage: AngularFireStorage) {}

  subirImagen(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imagenSeleccionada = event.target.files[0] as File; // Aseguramos que es un File válido
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.urlImagen = e.target.result;
      };
      
      if (this.imagenSeleccionada) {
        reader.readAsDataURL(this.imagenSeleccionada);
      } else {
        console.error("No se seleccionó una imagen válida.");
      }
    } else {
      console.error("No se seleccionó ningún archivo.");
    }
  }
  
  guardarCliente() {
    if (!this.cliente.nombre || !this.cliente.correo || !this.cliente.telefono) {
      console.error("Todos los campos son obligatorios");
      return;
    }
  
    if (this.imagenSeleccionada) {
      const filePath = `clientes/${Date.now()}_${this.imagenSeleccionada.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.imagenSeleccionada);
  
      uploadTask.snapshotChanges().pipe(
        catchError((error) => {
          console.error("Error al subir la imagen:", error);
          return throwError(error);
        }),
        finalize(async () => {
          try {
            const url = await fileRef.getDownloadURL().toPromise();
            this.cliente.imagenUrl = url;
            this.enviarDatosCliente();
          } catch (error) {
            console.error("Error al obtener la URL de descarga:", error);
          }
        })
      ).subscribe();
    } else {
      this.enviarDatosCliente();
    }
  }
  
  private enviarDatosCliente() {
    console.log("Cliente guardado:", this.cliente);
    this.modalCtrl.dismiss({ cliente: this.cliente });
  }
  
  cerrar() {
    this.modalCtrl.dismiss();
  }
}