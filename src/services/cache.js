import redis from 'redis';
import { promisify } from 'util';
import { cacheUrl } from '../config';

export default class Cache {
  constructor() {
    this.client = redis.createClient(cacheUrl);
    this.asyncGet = promisify(this.client.get).bind(this.client);
    this.asyncSet = promisify(this.client.set).bind(this.client);
  }

  static encodeData(data) {
    return JSON.stringify(data);
  }

  static decodeData(data) {
    return JSON.parse(data);
  }

  async get(key) {
    const data = await this.asyncGet(`shortlink_${key}`);
    if (data) {
      return Cache.decodeData(data);
    }
    return null;
  }

  async set(key, data) {
    await this.asyncSet(`shortlink_${key}`, Cache.encodeData(data));
    return true;
  }
}
