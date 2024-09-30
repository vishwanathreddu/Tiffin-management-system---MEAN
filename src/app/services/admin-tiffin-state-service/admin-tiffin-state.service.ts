import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminTiffinStateService {
  private tiffinAvailabilitySubject = new BehaviorSubject<string>('none');
  tiffinAvailability$ = this.tiffinAvailabilitySubject.asObservable();

  setTiffinAvailability(option: string): void {
    this.tiffinAvailabilitySubject.next(option);
  }
}
