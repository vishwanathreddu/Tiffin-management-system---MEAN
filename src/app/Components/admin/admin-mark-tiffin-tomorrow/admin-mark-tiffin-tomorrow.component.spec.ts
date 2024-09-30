import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMarkTiffinTomorrowComponent } from './admin-mark-tiffin-tomorrow.component';

describe('AdminMarkTiffinTomorrowComponent', () => {
  let component: AdminMarkTiffinTomorrowComponent;
  let fixture: ComponentFixture<AdminMarkTiffinTomorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMarkTiffinTomorrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMarkTiffinTomorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
