import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegsitroNivelAcademicoComponent } from './regsitro-nivel-academico.component';

describe('RegsitroNivelAcademicoComponent', () => {
  let component: RegsitroNivelAcademicoComponent;
  let fixture: ComponentFixture<RegsitroNivelAcademicoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegsitroNivelAcademicoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegsitroNivelAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
