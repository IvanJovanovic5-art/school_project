import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAdComponent } from './change-ad.component';

describe('ChangeAdComponent', () => {
  let component: ChangeAdComponent;
  let fixture: ComponentFixture<ChangeAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
