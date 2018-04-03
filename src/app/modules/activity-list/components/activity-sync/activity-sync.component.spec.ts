import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySyncComponent } from './activity-sync.component';

describe('ActivitySyncComponent', () => {
  let component: ActivitySyncComponent;
  let fixture: ComponentFixture<ActivitySyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitySyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
