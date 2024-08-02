import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstudianteCrudPage } from './estudiante-crud.page';

describe('EstudianteCrudPage', () => {
  let component: EstudianteCrudPage;
  let fixture: ComponentFixture<EstudianteCrudPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EstudianteCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
