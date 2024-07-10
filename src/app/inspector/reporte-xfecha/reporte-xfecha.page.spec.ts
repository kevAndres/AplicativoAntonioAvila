import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteXfechaPage } from './reporte-xfecha.page';

describe('ReporteXfechaPage', () => {
  let component: ReporteXfechaPage;
  let fixture: ComponentFixture<ReporteXfechaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReporteXfechaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
