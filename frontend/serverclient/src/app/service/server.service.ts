import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CustomResponse } from '../interface/custom-response';
import { Server } from '../interface/server';
import { Status } from '../enum/status.enum';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private readonly apiUrl = 'any';

  constructor(private http: HttpClient) {}

  //1. Procedural way of making http request
  // getServers(): Observable<CustomResponse> {
  //   return this.http.get<CustomResponse>(`http://locahost:8080/server/list`)
  // }

  //2. Reactive way of making requests
  //get all servers
  servers$ = <
    Observable<CustomResponse> // casting
  >this.http
    .get<CustomResponse>(`${this.apiUrl}/server/list`) // server$ --> observable
    .pipe(tap(console.log), catchError(this.handleError));

  //create a server
  save$ = (server: Server) => <
      Observable<CustomResponse> // casting
    >this.http
      .post<CustomResponse>(`${this.apiUrl}/server/save`, server) // server$ --> observable
      .pipe(tap(console.log), catchError(this.handleError));

  //ping a server
  ping$ = (ipAddress: string) => <
      Observable<CustomResponse> // casting
    >this.http
      .get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`) // server$ --> observable
      .pipe(tap(console.log), catchError(this.handleError));

  //filter a server
  filter$ = (status: Status, response: CustomResponse) => <
      Observable<CustomResponse> // casting
    >// this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${status}`) // server$ --> observable
    new Observable<CustomResponse>((subscriber) => {
      console.log(response);
      subscriber.next(
        status === Status.ALL
          ? { ...response, message: `Servers filtered by ${status} status` }
          : {
              ...response,
              message:
                response.data.servers.filter(
                  (server) => server.status === status
                ).length > 0
                  ? `Servers filtered by 
            ${status === Status.SERVER_UP ? 'SERVER UP' : 'SERVER DOWN'} status`
                  : `No servers of ${status} found`,
              data: {
                servers: response.data.servers.filter(
                  (server) => server.status === status
                ),
              },
            }
      );
      subscriber.complete();
    }).pipe(tap(console.log), catchError(this.handleError));

  //delete a server
  delete$ = (serverId: number) => <
      Observable<CustomResponse> // casting
    >this.http
      .delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`) // server$ --> observable
      .pipe(tap(console.log), catchError(this.handleError));

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(
      () => new Error(`An error occurred - Error Code: ${error.status}`)
    );
  }
}
