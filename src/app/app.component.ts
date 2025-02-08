import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Clientes',
      url: '/clientes',
      icon: 'people'
    },
    {
      title: 'Ficha Contable',
      url: '/ficha-contable',
      icon: 'document'
    },
    {
      title: 'Facturas Proforma',
      url: '/facturas-proforma',
      icon: 'receipt'
    },
    {
      title: 'Facturas Definitivas',
      url: '/facturas-definitivas',
      icon: 'receipt'
    },
    {
      title: 'Balance de Gastos',
      url: '/balance-gastos',
      icon: 'cash'
    },
    {
      title: 'Posición de Cliente',
      url: '/posicion-cliente',
      icon: 'stats-chart'
    },
    {
      title: 'Minutas Proforma',
      url: '/minutas-proforma',
      icon: 'document-text'
    },
    {
      title: 'Minutas Definitivas',
      url: '/minutas-definitivas',
      icon: 'document-text'
    }
  ];
  diaSemana: string = '';
  horaActual: string = '';
  constructor() {}

  ngOnInit() {
    this.obtenerDiaSemana();
    this.obtenerHora();
  }


  obtenerDiaSemana() {
    const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const hoy = new Date().getDay();
    this.diaSemana = dias[hoy];
  }

  obtenerHora(){
    const horas = ['Buenos días', 'Buenas tardes', 'Buenas noches']
    const ahora = new Date().getHours()
    if(ahora >= 7 && ahora < 12){
      this.horaActual = horas[0]
    }else if(ahora >= 12 && ahora < 20){
      this.horaActual = horas[1]
    }else {
      this.horaActual = horas[2]
    }
    
  }
}
