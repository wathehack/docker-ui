import { Injectable } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Container } from './container';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContainerService {
  private address = 'http://localhost:5000';
  private getAll = '/containers/json?all=1';
  private getRunning = '/containers/json?all=0';
  private getStopped = '/containers/json?filters={"status":["exited"]}';
  private toRemove = '/containers/{id}?v=1?force=1';
  private toStop = '/containers/{id}/stop?t=5';
  private toRestart = '/containers/{id}/restart?t=5';

  constructor(private http: Http) { }

  getRunningContainers(): Observable<Container[]> {
    return this.http
      .get(this.address + this.getRunning)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStoppedContainers(): Observable<Container[]> {
    return this.http
      .get(this.address + this.getStopped)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllContainers(): Observable<Container[]> {
    return this.http
      .get(this.address + this.getAll)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removeContainer(id: string) {
    return this.http
      .delete(this.address + this.toRemove.replace("{id}", id));
  }

  stopContainer(id: string) {
    return this.http
      .post(this.address + this.toStop.replace("{id}", id), {});
  }

  restartContainer(id: string) {
    return this.http
      .post(this.address + this.toRestart.replace("{id}", id), {});
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}
