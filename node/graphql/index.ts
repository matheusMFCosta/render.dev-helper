import { getAccountInfo, getAccountByHost, getInstalledApps } from './query'
import { unlinkApp, unlinkAllApps, uninstallAppDH, installAppDH, workspaceResetDH, publishAppDH } from './mutation'

export const resolvers = {
  Query: {
    getAccountInfo: async (_, param, ctx, info) => await getAccountInfo(param, ctx),
    getAccountByHost: async (_, param, ctx, info) => await getAccountByHost(param, ctx),
    getInstalledApps: async (_, param, ctx, info) => await getInstalledApps(param, ctx)
  },
  Mutation: {
    unlinkApp: async (_, param, ctx, info) => await unlinkApp(param, ctx),
    unlinkAllApps: async (_, param, ctx, info) => await unlinkAllApps(param, ctx),
    uninstallAppDH: async (_, param, ctx, info) => await uninstallAppDH(param, ctx),
    installAppDH: async (_, param, ctx, info) => await installAppDH(param, ctx),
    workspaceResetDH: async (_, param, ctx, info) => await workspaceResetDH(param, ctx),
    publishAppDH: async (_, param, ctx, info) => await publishAppDH(param, ctx)
  }
}
