import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMatchComponent } from './select-match.component';

describe('SelectMatchComponent', () => {
  let component: SelectMatchComponent;
  let fixture: ComponentFixture<SelectMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
