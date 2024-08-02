import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfDocentePage } from './pdf-docente.page';

describe('PdfDocentePage', () => {
  let component: PdfDocentePage;
  let fixture: ComponentFixture<PdfDocentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PdfDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
