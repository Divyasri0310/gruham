import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllapartmentsComponent } from './allapartments.component';

describe('AllapartmentsComponent', () => {
  let component: AllapartmentsComponent;
  let fixture: ComponentFixture<AllapartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllapartmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllapartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
