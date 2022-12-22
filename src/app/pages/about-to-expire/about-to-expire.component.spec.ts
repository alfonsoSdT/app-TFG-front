import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutToExpireComponent } from './about-to-expire.component';

describe('AboutToExpireComponent', () => {
  let component: AboutToExpireComponent;
  let fixture: ComponentFixture<AboutToExpireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutToExpireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutToExpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
