import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspecialidadPage } from './especialidad.page';

describe('EspecialidadPage', () => {
  let component: EspecialidadPage;
  let fixture: ComponentFixture<EspecialidadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EspecialidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
