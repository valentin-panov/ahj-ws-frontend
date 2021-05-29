export default async function createReq(options) {
  const baseURL = `http://localhost:3000`;
  // const baseURL = 'https://vp-ahj-helpdesk.herokuapp.com';
  const requestURL = `${baseURL}${options.query}`;
  const request = await fetch(requestURL, {
    method: options.method,
    // headers: new Headers({ 'content-type': 'application/json' }),
    body: options.data ? JSON.stringify(options.data) : null,
  });
  const response = await request.json();
  return response;
}
