import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PosicionClientePage } from './posicion-cliente.page';

describe('PosicionClientePage', () => {
  let component: PosicionClientePage;
  let fixture: ComponentFixture<PosicionClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PosicionClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
