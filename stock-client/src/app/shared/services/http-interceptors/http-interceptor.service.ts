import { Injectable } from '@angular/core';
import {AuthenticationService} from '../jwt/authentication.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {Observable} from 'rxjs';

@Injectable()
export class HttpInterceptors implements HttpInterceptor {

  constructor(private jwtService: AuthenticationService,
              private tokenService: TokenStorageService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (token != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
