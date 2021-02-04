import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

import ISearchProvider from '../ISearchProiveder';
import { Ingest, Search,  } from 'sonic-channel';

export class SearchProvider implements ISearchProvider {

  public async search(collection: string, bucket: string, terms: string, options: object): Promise<String[]> {
    const sonicChannelSearch = new Search({
      host: 'localhost',
      port: 1491,
      auth: 'SecretPassword'
    })

    sonicChannelSearch.connect({
      connected: () => {
        console.log('Conected to the Search Sonic')
      }
    })

    return await sonicChannelSearch.query(collection, bucket, terms, options);
  } 

  public async suggest(collection: string, bucket: string, word: string, options: object): Promise<String[]> {
    const sonicChannelSearch = new Search({
      host: 'localhost',
      port: 1491,
      auth: 'SecretPassword'
    })

    sonicChannelSearch.connect({
      connected: () => {
        console.log('Conected to the Search Sonic')
      }
    })

    return await sonicChannelSearch.suggest(collection, bucket, word, options);
  }

  public async push(collection: string, bucket: string, object: string, text: string, options: object): Promise<void> {
    const sonicChannelIngest = new Ingest({
      host: 'localhost',
      port: 1491,
      auth: 'SecretPassword'
    })

    sonicChannelIngest.connect({
      connected: () => {
        console.log('Conected to the Ingest Sonic')
      }
    })

    return await sonicChannelIngest.push(collection, bucket, object, text, options);
  }

  public async pop(collection: string, bucket: string, object: string, text: string): Promise<Number> {
    const sonicChannelIngest = new Ingest({
      host: 'localhost',
      port: 1491,
      auth: 'SecretPassword'
    })

    sonicChannelIngest.connect({
      connected: () => {
        console.log('Conected to the Ingest Sonic')
      }
    })

    return await sonicChannelIngest.pop(collection, bucket, object, text);
  }

}