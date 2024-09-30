import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkTiffinComponent } from './mark-tiffin.component';

describe('MarkTiffinComponent', () => {
  let component: MarkTiffinComponent;
  let fixture: ComponentFixture<MarkTiffinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarkTiffinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarkTiffinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
