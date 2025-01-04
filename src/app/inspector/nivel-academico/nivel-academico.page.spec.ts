import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NivelAcademicoPage } from './nivel-academico.page';

describe('NivelAcademicoPage', () => {
  let component: NivelAcademicoPage;
  let fixture: ComponentFixture<NivelAcademicoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NivelAcademicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
