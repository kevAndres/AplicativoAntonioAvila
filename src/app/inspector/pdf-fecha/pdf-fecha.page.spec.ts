import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfFechaPage } from './pdf-fecha.page';

describe('PdfFechaPage', () => {
  let component: PdfFechaPage;
  let fixture: ComponentFixture<PdfFechaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PdfFechaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
