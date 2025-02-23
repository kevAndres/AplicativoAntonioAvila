import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditNivelesAcademicosComponent } from './edit-niveles-academicos.component';

describe('EditNivelesAcademicosComponent', () => {
  let component: EditNivelesAcademicosComponent;
  let fixture: ComponentFixture<EditNivelesAcademicosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNivelesAcademicosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditNivelesAcademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
