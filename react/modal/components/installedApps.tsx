import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import query from './../getInstalledApp.gql'
import { appsMap } from '../types'
import { StringValue } from 'react-values'
import uninstallApp from './../uninstallAppDH.gql'
import { Input, SearchSelect, Button } from 'gocommerce.styleguide'

export interface InstalledAppsProps {
  loadingQuery: boolean
  getInstalledApps: appsMap[]
  uninstallApp: (
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

  public render() {
    const serachSelectObject = this.buildSearchSelect(this.props.getInstalledApps) || []
    const installedApps = this.getInstalledApps(this.props.getInstalledApps)

    return (
      <div>
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
  <Mutation mutation={uninstallApp}>
    {(uninstallApp, { loading: UnInloading, called: UnInalled, error: UnInerror }) => (
      <Query query={query} variables={{ category: 'wooow' }}>
        {({ data, loading }) => (
          <>
            <InstalledApps {...props} {...data} loadingQuery={loading} uninstallApp={uninstallApp} />
            {(UnInloading || UnInalled) && !UnInerror && <span className="c-primary">We are reloading the page</span>}
          </>
        )}
      </Query>
    )}
  </Mutation>
)
