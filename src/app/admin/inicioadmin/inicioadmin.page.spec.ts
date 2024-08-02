import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioadminPage } from './inicioadmin.page';

describe('InicioadminPage', () => {
  let component: InicioadminPage;
  let fixture: ComponentFixture<InicioadminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InicioadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
