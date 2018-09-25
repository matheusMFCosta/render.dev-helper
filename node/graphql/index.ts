import { getAccountInfo, getAccountByHost, getInstalledApps } from './query'

export const resolvers = {
  Query: {
    getAccountInfo: async (_, param, ctx, info) => await getAccountInfo(param, ctx),
    getAccountByHost: async (_, param, ctx, info) => await getAccountByHost(param, ctx),
    getInstalledApps: async (_, param, ctx, info) => await getInstalledApps(param, ctx)
  },
  Mutation: {}
}
