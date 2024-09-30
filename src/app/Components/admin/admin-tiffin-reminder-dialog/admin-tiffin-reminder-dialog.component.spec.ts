import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTiffinReminderDialogComponent } from './admin-tiffin-reminder-dialog.component';

describe('AdminTiffinReminderDialogComponent', () => {
  let component: AdminTiffinReminderDialogComponent;
  let fixture: ComponentFixture<AdminTiffinReminderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTiffinReminderDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTiffinReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
