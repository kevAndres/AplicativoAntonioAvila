import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VistaAtrasosRepresentanteComponent } from './vista-atrasos-representante.component';

describe('VistaAtrasosRepresentanteComponent', () => {
  let component: VistaAtrasosRepresentanteComponent;
  let fixture: ComponentFixture<VistaAtrasosRepresentanteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaAtrasosRepresentanteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VistaAtrasosRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
