import { getAccountInfo, getAccountByHost, getInstalledApps } from './query'
import { unlinkApp, unlinkAllApps, uninstallAppDH } from './mutation'

export const resolvers = {
  Query: {
    getAccountInfo: async (_, param, ctx, info) => await getAccountInfo(param, ctx),
    getAccountByHost: async (_, param, ctx, info) => await getAccountByHost(param, ctx),
    getInstalledApps: async (_, param, ctx, info) => await getInstalledApps(param, ctx)
  },
  Mutation: {
    unlinkApp: async (_, param, ctx, info) => await unlinkApp(param, ctx),
    unlinkAllApps: async (_, param, ctx, info) => await unlinkAllApps(param, ctx),
    uninstallAppDH: async (_, param, ctx, info) => await uninstallAppDH(param, ctx)
  }
}
