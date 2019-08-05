import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsearchComponent } from './dmsearch.component';

describe('DmsearchComponent', () => {
  let component: DmsearchComponent;
  let fixture: ComponentFixture<DmsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
