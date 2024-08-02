import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfCursoPage } from './pdf-curso.page';

describe('PdfCursoPage', () => {
  let component: PdfCursoPage;
  let fixture: ComponentFixture<PdfCursoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PdfCursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
