import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErgebnisseeintragenComponent } from './ergebnisseeintragen.component';

describe('ErgebnisseeintragenComponent', () => {
  let component: ErgebnisseeintragenComponent;
  let fixture: ComponentFixture<ErgebnisseeintragenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErgebnisseeintragenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErgebnisseeintragenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
