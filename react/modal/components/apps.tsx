import * as React from 'react'
import { Query } from 'react-apollo'
import query from './../getInstalledApp.gql'
import { appsMap } from '../types'
import { StringValue } from 'react-values'
import { Input, SearchSelect } from 'gocommerce.styleguide'

export interface AppsProps {
  getInstalledApps: appsMap[]
}

export interface AppsState {}

class Apps extends React.Component<AppsProps, AppsState> {
  getLinkedApps = (installedApps: appsMap[]) => installedApps && installedApps.filter(next => !!next.link)
  getInstalledApps = (installedApps: appsMap[]) =>
    installedApps && installedApps.reduce((prev, next) => ({ ...prev, [next.name]: next }), {})
  buildSearchSelect = (installedApps: appsMap[]) =>
    installedApps &&
    installedApps.reduce((prev, next) => [...prev, { label: `${next.name} - ${next.vendor}`, value: next.name }], [])

  public render() {
    const LinkedApps = this.getLinkedApps(this.props.getInstalledApps) || []
    const serachSelectObject = this.buildSearchSelect(this.props.getInstalledApps) || []
    const installedApps = this.getInstalledApps(this.props.getInstalledApps)

    return (
      <div>
        <div className="g-ph2 g-mt6">
          <span className=" fw7 c-on-base-2">Linked Apps </span>
          <div>
            {LinkedApps.length === 0 ? (
              <div className="w-50 dib g-ph2 g-pv4">None</div>
            ) : (
              LinkedApps.map(element => (
                <div className="w-50 dib g-ph2">
                  <Input className="w-100" label={element.name} disabled value={element.version.split('+')[0]} />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="g-pa2 g-mt6">
          <StringValue defaultValue="">
            {({ value, set }) => (
              <>
                <span className="fw7 c-on-base-2">Instaled Apps </span>
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
  <Query query={query} variables={{ category: 'wooow' }}>
    {({ data }) => <Apps {...props} {...data} />}
  </Query>
)
