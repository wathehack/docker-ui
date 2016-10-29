import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Image } from './image';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ImageService {
  private address = 'http://localhost:5000';
  private getAll = '/images/json?all=0';
  private toRemove = '/images/{id}?force=1';
  private toInspect = '/images/{id}/json';
  private toCreate = '/containers/create';
  private toStart = '/containers/{id}/start';

  constructor(private http: Http) { }

  getAllImages(): Observable<Image[]> {
    return this.http
      .get(this.address + this.getAll)
      .map(this.extractData)
      .catch(this.handleError);
  }

  inspectImage(id: string): Observable<Image> {
    return this.http
      .get(this.address + this.toInspect.replace("{id}", id))
      .map(this.extractData)
      .catch(this.handleError);
  }

  createContainer(name: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = {
      "Tty": true,
      "Image": String(name),
      "Cmd": ["/bin/sh"]
    };
    return this.http
      .post((this.address + this.toCreate), body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  startContainer(id: string) {
    return this.http
      .post((this.address + this.toStart.replace('{id}', id)), {})
      .map(this.extractData)
      .catch(this.handleError);
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
