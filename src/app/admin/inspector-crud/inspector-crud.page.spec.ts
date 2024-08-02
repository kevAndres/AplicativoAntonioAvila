import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InspectorCrudPage } from './inspector-crud.page';

describe('InspectorCrudPage', () => {
  let component: InspectorCrudPage;
  let fixture: ComponentFixture<InspectorCrudPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InspectorCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
