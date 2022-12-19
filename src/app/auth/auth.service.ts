import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _logged  = false
  constructor() { }


  get logged() {
    return this._logged
  }

  login(){
    this._logged = true
  }

  logout(){
    this._logged = false
  }
}