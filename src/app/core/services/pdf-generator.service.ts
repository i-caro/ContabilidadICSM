import { Injectable } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Cliente } from '../models/cliente.model';
import { Transaccion } from '../models/ficha-contable.model';
import { FichaContableService } from './ficha-contable.service';
import { firstValueFrom } from 'rxjs';
import { Buffer } from 'buffer';
const { ipcRenderer } = (window as any).require('electron');

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  
  constructor(private fichaService: FichaContableService) {}

  async generateClientePdf(clientData: Cliente) {
    try {
      const pdfDoc = await PDFDocument.create();
      let page = pdfDoc.addPage([600, 700]); // 📌 Ajuste de altura para más contenido
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 14;

      let yPosition = height - 50; // 📌 Control de posición vertical

      // 🔹 ENCABEZADO
      page.drawText('Informe de Cliente', {
        x: 50,
        y: yPosition,
        size: 18,
        font,
        color: rgb(0, 0.2, 0.8)
      });

      yPosition -= 30;
      page.drawLine({ start: { x: 50, y: yPosition }, end: { x: width - 50, y: yPosition }, thickness: 1, color: rgb(0, 0, 0) });
      yPosition -= 20;

      // 🔹 INFORMACIÓN DEL CLIENTE
      const clientInfo = [
        `Nombre: ${clientData.nombre}`,
        `Apellidos: ${clientData.apellido}`,
        `Correo: ${clientData.correo}`,
        `Teléfono: ${clientData.telefono}`,
        `DNI: ${clientData.nif_nie}`,
        `Observaciones: ${clientData.observaciones || "Ninguna"}`
      ];

      clientInfo.forEach(info => {
        page.drawText(info, { x: 50, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
        yPosition -= 20;
      });

      yPosition -= 10;
      page.drawLine({ start: { x: 50, y: yPosition }, end: { x: width - 50, y: yPosition }, thickness: 1, color: rgb(0, 0, 0) });
      yPosition -= 30;

      // 🔹 OBTENER Y MOSTRAR TRANSACCIONES
      const transacciones: Transaccion[] = await firstValueFrom(this.fichaService.getTransacciones());
      const transaccionesCliente = transacciones.filter(t => t.clienteId === clientData.id);

      if (transaccionesCliente.length > 0) {
        page.drawText('Transacciones:', { x: 50, y: yPosition, size: 16, font, color: rgb(0.8, 0.2, 0) });
        yPosition -= 30;

        transaccionesCliente.forEach((trans, index) => {
          const transInfo = `[${index + 1}] Monto: ${trans.monto} € | Descripción: ${trans.descripcion}`;
          page.drawText(transInfo, { x: 50, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
          yPosition -= 20;

          if (yPosition < 50) {
            page.drawText('(Continúa en la siguiente página...)', { x: 50, y: yPosition, size: fontSize, font, color: rgb(1, 0, 0) });
            page = pdfDoc.addPage([600, 700]);
            yPosition = height - 50;
          }
        });
      } else {
        page.drawText('No hay transacciones registradas para este cliente.', { x: 50, y: yPosition, size: fontSize, font, color: rgb(1, 0, 0) });
      }

      // 🔹 GUARDAR PDF
      const pdfBytes = await pdfDoc.save();
      const base64Pdf = Buffer.from(pdfBytes).toString('base64');

      const response = await ipcRenderer.invoke('save-pdf', {
        fileName: `${clientData.nombre}_informe`,
        pdfData: base64Pdf
      });

      if (response.success) {
        console.log('✅ PDF guardado correctamente en:', response.path);
      } else {
        console.error('❌ Error al guardar el PDF:', response.error);
      }

    } catch (error) {
      console.error('❌ Error al generar el PDF:', error);
    }
  }
}
