import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import query from './../queries/getInstalledApp.gql'
import { appsMap } from '../types'
import { StringValue } from 'react-values'
import installAppDH from './../queries/installAppDH.gql'
import uninstallApp from './../queries/uninstallAppDH.gql'
import { Input, SearchSelect, Button } from 'gocommerce.styleguide'

export interface InstalledAppsProps {
  loadingQuery: boolean
  getInstalledApps: appsMap[]
  uninstallApp: (
    {
      variables: { appName: string }
    }
  ) => {}
  installApp: (
    {
      variables: { appName: string }
    }
  ) => {}
}

export interface InstalledAppsState {}

class InstalledApps extends React.Component<InstalledAppsProps, InstalledAppsState> {
  getInstalledApps = (installedApps: appsMap[]) =>
    installedApps && installedApps.reduce((prev, next) => ({ ...prev, [next.name]: next }), {})
  buildSearchSelect = (installedApps: appsMap[]) =>
    installedApps &&
    installedApps.reduce((prev, next) => [...prev, { label: `${next.name} - ${next.vendor}`, value: next.name }], [])
  handleUninstallApp = async (appName: string) => {
    const {
      data: { uninstallAppDH }
    } = await this.props.uninstallApp({ variables: { appName } })
    if (!uninstallAppDH.error) location.reload()
  }
  handleInstallApp = async (appName: string) => {
    const {
      data: { installAppDH }
    } = await this.props.installApp({ variables: { appName } })
    if (!installAppDH.error) location.reload()
  }

  public render() {
    const serachSelectObject = this.buildSearchSelect(this.props.getInstalledApps) || []
    const installedApps = this.getInstalledApps(this.props.getInstalledApps)

    return (
      <div>
        <div className="g-pa2 g-mt2 w-100">
          <StringValue defaultValue="">
            {({ value, set }) => (
              <>
                <span className="fw7 c-on-base-2">Install an app </span>
                <div className="flex g-mt2">
                  <Input
                    className="w-70"
                    placeholder={'{vendorname}.{AppName}@{version}'}
                    value={value}
                    onChange={e => set(e.target.value)}
                  />
                  <Button onClick={() => this.handleInstallApp(value)}>Install</Button>
                </div>
              </>
            )}
          </StringValue>
        </div>

        <div className="g-pa2 g-mt6">
          <StringValue defaultValue="">
            {({ value, set }) => (
              <>
                <span className="fw7 c-on-base-2">Instaled installedApps </span>
                <SearchSelect
                  className="g-pt2"
                  placeholder="Select an App"
                  list={serachSelectObject}
                  onChange={e => set(e.target.value)}
                />

                {value && (
                  <div className="">
                    <div className="w-50 dib g-ph2">
                      <Input className="w-100" label={'Name'} disabled value={installedApps[value].name} />
                    </div>
                    <div className="w-50 dib g-ph2">
                      <Input className="w-100" label={'Title'} disabled value={installedApps[value].title} />
                    </div>
                    <div className="w-100 dib g-ph2">
                      <Input
                        className="w-100"
                        label={'Description'}
                        disabled
                        value={installedApps[value].description}
                      />
                    </div>
                    <div className="w-50 dib g-ph2">
                      <Input className="w-100" label={'Version'} disabled value={installedApps[value].version} />
                    </div>
                    <div className="w-50 dib g-ph2">
                      <Input
                        className="w-100"
                        label={'ActivationDate'}
                        disabled
                        value={installedApps[value]._activationDate}
                      />
                    </div>
                    <div className="w-50 dib g-ph2">
                      <Input className="w-100" label={'Linked'} disabled value={!!installedApps[value].link} />
                    </div>
                    <div className="w-50 dib g-ph2">
                      <Input className="w-100" label={'Vendor'} disabled value={installedApps[value].vendor} />
                    </div>
                    <div className="flex flex-row-reverse">
                      <Button
                        className="g-mt2 g-mr2"
                        style="danger"
                        onClick={() =>
                          this.handleUninstallApp(`${installedApps[value].vendor}.${installedApps[value].name}`)
                        }
                      >
                        Remove App
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </StringValue>
        </div>
      </div>
    )
  }
}

export default props => (
  <Mutation mutation={installAppDH}>
    {(installAppDH, { loading: InInloading, called: InInalled, error: InInerror }) => (
      <Mutation mutation={uninstallApp}>
        {(uninstallApp, { loading: UnInloading, called: UnInalled, error: UnInerror }) => (
          <Query query={query} variables={{ category: 'wooow' }}>
            {({ data, loading }) => (
              <>
                {(InInloading || InInalled) &&
                  !InInerror && <span className="c-primary">We are reloading the page</span>}
                {InInerror && <span className="c-danger">App does not exist</span>}
                <InstalledApps
                  {...props}
                  {...data}
                  loadingQuery={loading}
                  uninstallApp={uninstallApp}
                  installApp={installAppDH}
                />
                {(UnInloading || UnInalled) &&
                  !UnInerror && <span className="c-primary">We are reloading the page</span>}
              </>
            )}
          </Query>
        )}
      </Mutation>
    )}
  </Mutation>
)
