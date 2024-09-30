import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiffinConfirmationDialogComponent } from './tiffin-confirmation-dialog.component';

describe('TiffinConfirmationDialogComponent', () => {
  let component: TiffinConfirmationDialogComponent;
  let fixture: ComponentFixture<TiffinConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TiffinConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiffinConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
