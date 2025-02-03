import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FichaContablePage } from './ficha-contable.page';

describe('FichaContablePage', () => {
  let component: FichaContablePage;
  let fixture: ComponentFixture<FichaContablePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaContablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
