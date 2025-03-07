import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  constructor() {}

  async enviarNotificacionCliente(nombreCliente: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Nuevo Cliente Registrado",
          body: `Se ha agregado el cliente: ${nombreCliente}`,
          id: Date.now(),
          schedule: { at: new Date(new Date().getTime() + 1000) },
        }
      ]
    });

    console.log(`Notificación enviada para ${nombreCliente}`);
  }
}
