import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {
    this.validate$.subscribe(() => {
      this.updateState();
    });
  }

  state$ = new BehaviorSubject(null);

  private validate$ = new Subject();

  validate() {
    this.validate$.next();
  }

  private updateState() {
    this.http
      .get('/api/profile')
      .pipe(catchError(() => of(null)))
      .subscribe(value => {
        this.state$.next(value);
      });
  }
}
