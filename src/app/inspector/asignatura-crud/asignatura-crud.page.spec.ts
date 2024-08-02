import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignaturaCrudPage } from './asignatura-crud.page';

describe('AsignaturaCrudPage', () => {
  let component: AsignaturaCrudPage;
  let fixture: ComponentFixture<AsignaturaCrudPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsignaturaCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
