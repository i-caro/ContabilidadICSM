import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { Cliente } from '../models/cliente.model';
import { dialog } from 'electron';
const { ipcRenderer } = (window as any).require('electron');

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  
  constructor() {}

  async generatePdf(clientData: Cliente) {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 400]);
      const { width, height } = page.getSize();
      
      const fontSize = 20;
      page.drawText(`Nombre: ${clientData.nombre}`, { x: 50, y: height - 100, size: fontSize, color: rgb(0, 0, 0) });
      page.drawText(`Apellidos: ${clientData.apellido}`, { x: 50, y: height - 130, size: fontSize, color: rgb(0, 0, 0) });
      page.drawText(`Correo: ${clientData.correo}`, { x: 50, y: height - 160, size: fontSize, color: rgb(0, 0, 0) });
      page.drawText(`Teléfono: ${clientData.telefono}`, { x: 50, y: height - 190, size: fontSize, color: rgb(0, 0, 0) });
      page.drawText(`DNI: ${clientData.nif_nie}`, { x: 50, y: height - 220, size: fontSize, color: rgb(0, 0, 0) });
      page.drawText(`Observaciones: ${clientData.observaciones}`, { x: 50, y: height - 250, size: fontSize, color: rgb(0, 0, 0) });

      const pdfBytes = await pdfDoc.save();
      const base64Pdf = Buffer.from(pdfBytes).toString('base64');

   
      const response = await ipcRenderer.invoke('save-pdf', {
        fileName: `${clientData.nombre}_datos`,
        pdfData: base64Pdf
      });

      if (response.success) {
        console.log('PDF guardado correctamente en:', response.path);
      } else {
        console.error('Error al guardar el PDF:', response.error);
      }

    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  }
}
