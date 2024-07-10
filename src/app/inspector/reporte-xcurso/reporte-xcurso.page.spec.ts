import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteXcursoPage } from './reporte-xcurso.page';

describe('ReporteXcursoPage', () => {
  let component: ReporteXcursoPage;
  let fixture: ComponentFixture<ReporteXcursoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReporteXcursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
