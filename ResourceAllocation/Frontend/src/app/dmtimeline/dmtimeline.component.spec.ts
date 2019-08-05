import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtimelineComponent } from './dmtimeline.component';

describe('DmtimelineComponent', () => {
  let component: DmtimelineComponent;
  let fixture: ComponentFixture<DmtimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmtimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
