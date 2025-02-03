import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceGastosPage } from './balance-gastos.page';

describe('BalanceGastosPage', () => {
  let component: BalanceGastosPage;
  let fixture: ComponentFixture<BalanceGastosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceGastosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
