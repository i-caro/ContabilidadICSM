import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinutasDefinitivasPage } from './minutas-definitivas.page';

describe('MinutasDefinitivasPage', () => {
  let component: MinutasDefinitivasPage;
  let fixture: ComponentFixture<MinutasDefinitivasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutasDefinitivasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
