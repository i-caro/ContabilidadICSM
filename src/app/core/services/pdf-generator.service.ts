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

  async generateFacturaProforma(clientData: Cliente, transacciones: Transaccion[]) {
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 12;
  
      // 📌 Cargar imagen de logo (Asegúrate de tener la imagen en formato base64 o cargarla desde un archivo)
      const logoUrl = 'C:\\Users\\icarrom063\\Desktop\\ContabilidadICSM\\src\\assets\\imagenes\\calculo.png'; // ⚠️ Sustituir por la ruta del logo
      const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
      const logoImage = await pdfDoc.embedPng(logoBytes);
  
      let page = pdfDoc.addPage([600, 750]);
      const { width, height } = page.getSize();
  
      let yPosition = height - 50; // 📌 Control de posición vertical
  
      // 🔹 CABECERA: LOGO Y DATOS DEL DESPACHO
      const logoDims = logoImage.scale(0.2);
      page.drawImage(logoImage, {
        x: 50,
        y: height - logoDims.height - 20,
        width: logoDims.width,
        height: logoDims.height
      });
  
      // 🔹 DATOS DEL DESPACHO
      const despachoInfo = [
        'DESPACHO LEGAL & ASOCIADOS',
        'NIF: XXXXXXXXX',
        'Dirección: Calle Ejemplo, 123',
        'Teléfono: +34 600 123 456',
        'Email: contacto@despacho.com'
      ];
  
      despachoInfo.forEach((info, index) => {
        page.drawText(info, { x: 200, y: height - 40 - index * 15, size: 12, font, color: rgb(0, 0, 0) });
      });
  
      yPosition -= logoDims.height + 50;
  
      // 🔹 TÍTULO DE FACTURA
      page.drawText('FACTURA PROFORMA', {
        x: 50,
        y: yPosition,
        size: 18,
        font,
        color: rgb(0, 0, 0.8)
      });
  
      yPosition -= 20;
      page.drawLine({ start: { x: 50, y: yPosition }, end: { x: width - 50, y: yPosition }, thickness: 1, color: rgb(0, 0, 0) });
      yPosition -= 30;
  
      // 🔹 DATOS DEL CLIENTE (Sustituir por los datos reales)
      const clienteInfo = [
        `Nombre: ${clientData.nombre}`,
        `Apellidos: ${clientData.apellido}`,
        `Correo: ${clientData.correo}`,
        `Teléfono: ${clientData.telefono}`,
        `DNI: ${clientData.nif_nie}`,
        `Observaciones: ${clientData.observaciones || "Ninguna"}`
      ];
  
      clienteInfo.forEach(info => {
        page.drawText(info, { x: 50, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
        yPosition -= 20;
      });
  
      yPosition -= 20;
      page.drawLine({ start: { x: 50, y: yPosition }, end: { x: width - 50, y: yPosition }, thickness: 1, color: rgb(0, 0, 0) });
      yPosition -= 30;
  
      // 🔹 DETALLES DE LA FACTURA (Tabla de servicios)
      page.drawText('Descripción de Transacciones', { x: 50, y: yPosition, size: 14, font, color: rgb(0.8, 0.2, 0) });
      yPosition -= 30;
  
      const transaccionesRecibidas = transacciones.map(t => ({
        descripcion: t.descripcion,
        cantidad: t.monto,
    }));
  
      page.drawText('Cant.', { x: 50, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
      page.drawText('Descripción', { x: 100, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
      page.drawText('Precio Unit.', { x: 350, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
      page.drawText('Total', { x: 450, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
  
      yPosition -= 20;
      page.drawLine({ start: { x: 50, y: yPosition }, end: { x: width - 50, y: yPosition }, thickness: 1, color: rgb(0, 0, 0) });
      yPosition -= 20;
  
      let subtotal = 0;
      transacciones.forEach(transaccion => {
        const total = transaccion.cantidad * transaccion.monto;
        subtotal += total;
  
        page.drawText(transaccion.cantidad.toString(), { x: 50, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
        page.drawText(transaccion.descripcion, { x: 100, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
        page.drawText(`${transaccion.monto.toFixed(2)} €`, { x: 350, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
        page.drawText(`${total.toFixed(2)} €`, { x: 450, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
  
        yPosition -= 20;
      });
  
      // 📌 Cálculo de IVA y Total
      const iva = subtotal * 0.21; // 21% IVA
      const totalFactura = subtotal + iva;
  
      yPosition -= 20;
      page.drawLine({ start: { x: 50, y: yPosition }, end: { x: width - 50, y: yPosition }, thickness: 1, color: rgb(0, 0, 0) });
  
      yPosition -= 30;
      page.drawText(`Subtotal: ${subtotal.toFixed(2)} €`, { x: 400, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
      yPosition -= 20;
      page.drawText(`IVA (21%): ${iva.toFixed(2)} €`, { x: 400, y: yPosition, size: fontSize, font, color: rgb(0, 0, 0) });
      yPosition -= 20;
      page.drawText(`TOTAL: ${totalFactura.toFixed(2)} €`, { x: 400, y: yPosition, size: fontSize, font, color: rgb(0.8, 0, 0) });
  
      yPosition -= 40;
  
      // 🔹 NOTA Y TÉRMINOS
      page.drawText('Esta factura proforma no tiene valor fiscal y se emite solo con fines informativos.', {
        x: 50,
        y: yPosition,
        size: 10,
        font,
        color: rgb(0.5, 0.5, 0.5)
      });
  
      // 🔹 GUARDAR PDF
      const pdfBytes = await pdfDoc.save();
      const base64Pdf = Buffer.from(pdfBytes).toString('base64');
  
      const response = await ipcRenderer.invoke('save-pdf', {
        fileName: `${clientData.nombre}${clientData.apellido}_FacturaProforma`,
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
