import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JornadaPage } from './jornada.page';

describe('JornadaPage', () => {
  let component: JornadaPage;
  let fixture: ComponentFixture<JornadaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JornadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
