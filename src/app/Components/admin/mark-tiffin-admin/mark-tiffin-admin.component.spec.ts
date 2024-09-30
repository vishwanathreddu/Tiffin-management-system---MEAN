import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkTiffinAdminComponent } from './mark-tiffin-admin.component';

describe('MarkTiffinAdminComponent', () => {
  let component: MarkTiffinAdminComponent;
  let fixture: ComponentFixture<MarkTiffinAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkTiffinAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarkTiffinAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
