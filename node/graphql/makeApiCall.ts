import axios from 'axios'

type httpMethods = 'post' | 'put' | 'delete' | 'get' | 'patch'

const makeApiCall = async (
  url: string,
  ctx: any,
  method: httpMethods,
  payload?: any,
  adicionalHeaders: { [name: string]: string } = {}
) => {
  const account = ctx.vtex.route.params.account
  const baseUrl = 'https://api.gocommerce.com/'
  const requestParams = {
    baseURL: `${baseUrl}${account}`,
    url: url,
    method: method,
    data: payload,
    withCredentials: true,
    headers: {
      'Proxy-Authorization': ctx.vtex.authToken,
      Cookie: ctx.request.header.cookie,
      ...adicionalHeaders
    }
  }
  return await axios(requestParams)
    .then(response => {
      return response
    })
    .catch(e => {
      return { error: e.response }
    })
}

export default makeApiCall
