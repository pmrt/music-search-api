/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PresearchComponent } from './presearch.component';

describe('PresearchComponent', () => {
  let component: PresearchComponent;
  let fixture: ComponentFixture<PresearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
