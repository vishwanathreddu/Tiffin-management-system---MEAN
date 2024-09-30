import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTiffinPaymentComponent } from './admin-tiffin-payment.component';

describe('AdminTiffinPaymentComponent', () => {
  let component: AdminTiffinPaymentComponent;
  let fixture: ComponentFixture<AdminTiffinPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTiffinPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTiffinPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
