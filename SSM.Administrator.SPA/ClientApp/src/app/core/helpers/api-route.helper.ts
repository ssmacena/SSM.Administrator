import { appConfig } from '@app/app-config';

export class ApiRouteHelper {
  static route(url: string): string {
    return `${appConfig.API_URL}${url}`;
  }
  static secureRoute(url: string): string {
    return `${appConfig.API_SECURE_URL}${url}`;
  }
}
