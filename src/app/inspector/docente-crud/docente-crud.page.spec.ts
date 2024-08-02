import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocenteCrudPage } from './docente-crud.page';

describe('DocenteCrudPage', () => {
  let component: DocenteCrudPage;
  let fixture: ComponentFixture<DocenteCrudPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DocenteCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
