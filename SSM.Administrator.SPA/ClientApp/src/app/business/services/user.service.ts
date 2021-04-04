import { Injectable } from '@angular/core';
import { HttpClient } from '@angular//common/http';

import { ApiRouteHelper } from '@app/core/helpers';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  investorProfile: any;

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  public setPreference(form: any) {
    //local change
    let userPreference = this.getUserPreference(form.key);

    if (userPreference) userPreference.value = form.value;
    else this.auth.user.preferences.push(form);

    //server change
    this.http
      .post<any>(ApiRouteHelper.secureRoute('user/set-preference'), form)
      .subscribe();
  }

  public getUserPreference(key: string): any {
    return this.auth.user.preferences.find((e) => e.key == key);
  }

  // deleteUserById(id:number){
  //   return this.http.delete(`${this.baseUrl}/DeleteUser/${id}`, this.httpOptions);
  // }

  // getUsers(): Observable<UserModel[]> {
  //   return this.http.get<UserModel[]>(`${this.baseUrl}/GetUsers`, this.httpOptions)
  // }
}
