import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SessionService {
  private userId$: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor() {}

  public updateUserId(userId: number): void {
    this.userId$.next(userId);
  }

  public getUserId$(): Observable<number> {
    return this.userId$.asObservable();
  }

  public getUserIdValue(): number {
    return this.userId$.value;
  }
}
