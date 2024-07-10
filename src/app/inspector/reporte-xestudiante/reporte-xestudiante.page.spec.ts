import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteXestudiantePage } from './reporte-xestudiante.page';

describe('ReporteXestudiantePage', () => {
  let component: ReporteXestudiantePage;
  let fixture: ComponentFixture<ReporteXestudiantePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReporteXestudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
