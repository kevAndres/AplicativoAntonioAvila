import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursoCRUDPage } from './curso-crud.page';

describe('CursoCRUDPage', () => {
  let component: CursoCRUDPage;
  let fixture: ComponentFixture<CursoCRUDPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CursoCRUDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
