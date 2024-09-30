import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminPreferencesService {
  private preferenceKey = 'tiffinPreference';

  setTiffinPreference(preference: 'veg' | 'non-veg'): void {
    localStorage.setItem(this.preferenceKey, preference);
  }

  getTiffinPreference(): 'veg' | 'non-veg' | null {
    return localStorage.getItem(this.preferenceKey) as 'veg' | 'non-veg' | null;
  }
}
