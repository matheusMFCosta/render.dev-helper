import cookie from 'cookie'
import * as JWT from 'jwt-js'

export const resolvers = {
  Query: {
    getAccountInfo: async (_, param, ctx, info) => {
      const { production, workspace, userAgent } = ctx.vtex
      const cookies = cookie.parse(ctx.request.header.cookie)
      const decodedJwt = JWT.decodeToken(cookies._ssid)
      const { sub, rol, acc, iss } = decodedJwt.payload

      return {
        version: userAgent,
        isProduction: production,
        userEmail: sub,
        userRol: rol,
        accountCode: acc,
        register: iss
      }
    }
  },
  Mutation: {}
}
