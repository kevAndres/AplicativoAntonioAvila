import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentanteCrudPage } from './representante-crud.page';

describe('RepresentanteCrudPage', () => {
  let component: RepresentanteCrudPage;
  let fixture: ComponentFixture<RepresentanteCrudPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RepresentanteCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
