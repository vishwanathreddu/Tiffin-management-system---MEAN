import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMonthendTiffinComponent } from './admin-monthend-tiffin.component';

describe('AdminMonthendTiffinComponent', () => {
  let component: AdminMonthendTiffinComponent;
  let fixture: ComponentFixture<AdminMonthendTiffinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMonthendTiffinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMonthendTiffinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
