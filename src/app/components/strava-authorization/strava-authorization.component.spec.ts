import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StravaAuthorizationComponent } from './strava-authorization.component';

describe('StravaAuthorizationComponent', () => {
  let component: StravaAuthorizationComponent;
  let fixture: ComponentFixture<StravaAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StravaAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StravaAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
