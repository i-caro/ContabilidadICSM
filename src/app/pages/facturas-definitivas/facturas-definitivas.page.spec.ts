import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturasDefinitivasPage } from './facturas-definitivas.page';

describe('FacturasDefinitivasPage', () => {
  let component: FacturasDefinitivasPage;
  let fixture: ComponentFixture<FacturasDefinitivasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasDefinitivasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
