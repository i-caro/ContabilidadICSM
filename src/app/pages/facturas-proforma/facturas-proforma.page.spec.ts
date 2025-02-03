import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturasProformaPage } from './facturas-proforma.page';

describe('FacturasProformaPage', () => {
  let component: FacturasProformaPage;
  let fixture: ComponentFixture<FacturasProformaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasProformaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
