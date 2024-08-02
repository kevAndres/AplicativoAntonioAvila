import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaAtrasosRepresentantePage } from './vista-atrasos-representante.page';

describe('VistaAtrasosRepresentantePage', () => {
  let component: VistaAtrasosRepresentantePage;
  let fixture: ComponentFixture<VistaAtrasosRepresentantePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VistaAtrasosRepresentantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
