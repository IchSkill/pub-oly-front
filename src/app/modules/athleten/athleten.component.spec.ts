import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthletenComponent } from './athleten.component';

describe('AthletenComponent', () => {
  let component: AthletenComponent;
  let fixture: ComponentFixture<AthletenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthletenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AthletenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
