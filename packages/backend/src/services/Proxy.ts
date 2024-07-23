import {Inject, Injectable, Scope} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import got from 'got';


@Injectable({scope: Scope.REQUEST})
export class ProxyService {
  constructor(
    @Inject(REQUEST) private readonly request: any,
  ) {
  }

  async get() {
    const path = this.request.path.replace(/^\/api\/rest\/proxy/, '')
    const {query} = this.request;
    return got.get(`https://data.songstats.com${path}`, {
      headers: {
        "content-type": "application/json",
        "fe-platform": "web",
        "fe-version": "143",
      },
      searchParams: query,
      responseType: 'json',
      resolveBodyOnly: true
    });
  }
}
