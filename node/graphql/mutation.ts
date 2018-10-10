import { Apps, Workspaces } from '@vtex/api'

export const unlinkApp = async ({ appName }, ctx) => {
  const client = new Apps(ctx.vtex)
  const response = await client.unlink(appName)
  return response ? { error: { message: 'error', code: '001' } } : {}
}

export const unlinkAllApps = async (param, ctx) => {
  const client = new Apps(ctx.vtex)
  console.log(`client`, client)
  const response = await client.unlinkAll()
  return response ? { error: { message: 'error', code: '002' } } : {}
}

export const uninstallAppDH = async ({ appName }, ctx) => {
  const client = new Apps(ctx.vtex)
  console.log(`client2`, appName)
  const response = await client.uninstallApp(appName)
  return response ? { error: { message: 'error', code: '002' } } : {}
}

export const installAppDH = async ({ appName }, ctx) => {
  const client = new Apps(ctx.vtex)
  console.log(`client2`, appName)
  const response = await client.installApp(appName)
  return response ? { error: { message: 'error', code: '002' } } : {}
}

export const workspaceResetDH = async ({ accountName, workspaceName }, ctx) => {
  const client = new Workspaces(ctx.vtex)
  console.log(`client4`, accountName, workspaceName)
  const response = await client.reset(accountName, workspaceName)
  return response ? { error: { message: 'error', code: '002' } } : {}
}
