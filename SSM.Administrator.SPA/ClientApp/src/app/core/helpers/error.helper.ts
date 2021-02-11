import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ErrorHelper {
  static raiseDefaultErrorDescription: string =
    'Não foi possível processar a solicitação. Por favor, tente novamente mais tarde.';
  static raiseDefaultErrorTitle: string = 'Aviso';

  static handle(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${error.error}, ` +
          `Error: ${error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
