import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserPaymentsComponent } from './admin-user-payments.component';

describe('AdminUserPaymentsComponent', () => {
  let component: AdminUserPaymentsComponent;
  let fixture: ComponentFixture<AdminUserPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUserPaymentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUserPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
