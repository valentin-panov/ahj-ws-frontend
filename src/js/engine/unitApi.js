/* eslint-disable class-methods-use-this */
import createReq from './createReq';

export default class UnitAPI {
  signup(data) {
    const options = {
      method: 'POST',
      query: '/signup',
      data,
    };
    return createReq(options);
  }
}
