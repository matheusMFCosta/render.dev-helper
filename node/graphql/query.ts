import cookie from 'cookie'
import * as JWT from 'jwt-js'
import makeApiCAll from './makeApiCall'
import { Apps } from '@vtex/api'

export const getAccountInfo = async (param, ctx) => {
  const { production, workspace, userAgent } = ctx.vtex
  const cookies = cookie.parse(ctx.request.header.cookie)
  const decodedJwt = JWT.decodeToken(cookies._ssid)
  const { sub, rol, acc } = decodedJwt.payload

  return {
    version: userAgent,
    isProduction: production,
    userEmail: sub,
    userRol: rol,
    accountCode: acc,
    workspace: workspace
  }
}
export const getAccountByHost = async (param, ctx) => {
  console.log(ctx)
  const host = ctx.request.header['x-forwarded-host']
  const url = `/accounts/search?host=${host}`
  const { data, error } = await makeApiCAll(url, ctx, 'get')
  console.log(`data`, data)
  return data
}

interface apps {
  [name: string]: {
    registery: string
    name: string
    version: string
  }
}

export const getInstalledApps = async (param, ctx) => {
  const client = new Apps(ctx.vtex)

  const { data } = await client.listApps()
  const promisses = data.map(async next => client.getApp(next.id.split('+')[0]))
  return await Promise.all(promisses)
}
