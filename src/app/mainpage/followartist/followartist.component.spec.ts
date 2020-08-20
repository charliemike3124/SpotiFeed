import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowartistComponent } from './followartist.component';

describe('FollowartistComponent', () => {
  let component: FollowartistComponent;
  let fixture: ComponentFixture<FollowartistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowartistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowartistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
