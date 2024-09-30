import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiffinHistoryComponent } from './tiffin-history.component';

describe('TiffinHistoryComponent', () => {
  let component: TiffinHistoryComponent;
  let fixture: ComponentFixture<TiffinHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TiffinHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiffinHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
