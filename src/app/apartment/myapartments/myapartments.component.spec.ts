import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyapartmentsComponent } from './myapartments.component';

describe('MyapartmentsComponent', () => {
  let component: MyapartmentsComponent;
  let fixture: ComponentFixture<MyapartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyapartmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyapartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
