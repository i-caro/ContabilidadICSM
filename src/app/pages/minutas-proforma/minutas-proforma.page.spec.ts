import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinutasProformaPage } from './minutas-proforma.page';

describe('MinutasProformaPage', () => {
  let component: MinutasProformaPage;
  let fixture: ComponentFixture<MinutasProformaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutasProformaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
