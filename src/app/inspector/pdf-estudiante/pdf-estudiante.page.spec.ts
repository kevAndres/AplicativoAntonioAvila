import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfEstudiantePage } from './pdf-estudiante.page';

describe('PdfEstudiantePage', () => {
  let component: PdfEstudiantePage;
  let fixture: ComponentFixture<PdfEstudiantePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PdfEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
