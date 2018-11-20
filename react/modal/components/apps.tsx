import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import query from './../queries/getInstalledApp.gql'
import UnlinkApp from './../queries/unlinkApp.gql'
import unlinkAllApps from './../queries/unlinkAllApps.gql'
import publishAppDH from './../queries/publishAppDH.gql'
import { appsMap } from '../types'
import { Input, Button, IconSpinner } from 'gocommerce.styleguide'

export interface AppsProps {
  loadingQuery: boolean
  getInstalledApps: appsMap[]
  unLinkApp: ({ variables: object }) => {}
  unlinkAllApps: () => {}
  publishAppDH: ({ variables: object }) => {}
}

export interface AppsState {}

class Apps extends React.Component<AppsProps, AppsState> {
  getLinkedApps = (installedApps: appsMap[]) => installedApps && installedApps.filter(next => !!next.link)
  handleUnlink = async appName => {
    const {
      data: { unlinkApp }
    } = await this.props.unLinkApp({ variables: { appName: appName } })
    if (!unlinkApp.error) location.reload()
  }
  handleUnlinkAll = async () => {
    const {
      data: { unlinkAllApps }
    } = await this.props.unlinkAllApps()
    if (!unlinkAllApps.error) location.reload()
  }
  handleHandlePublish = async appName => {
    const {
      data: { unlinkAllApps }
    } = await this.props.publishAppDH({ variables: { appName: appName } })
  }

  public render() {
    const { loadingQuery } = this.props
    const LinkedApps = this.getLinkedApps(this.props.getInstalledApps) || []

    return (
      <div>
        <div className="g-ph2 g-mt6">
          <div className="flex justify-between">
            <span className=" fw7 c-on-base-2">Linked Apps </span>
            {!(LinkedApps.length === 0) && <Button onClick={() => this.handleUnlinkAll()}>Unlink All</Button>}
          </div>
          <div>
            {LinkedApps.length === 0 ? (
              <div className="w-50 dib g-ph2 g-pv4">{loadingQuery ? <IconSpinner /> : 'None'}</div>
            ) : (
              LinkedApps.map(element => (
                <div className="w-50 dib g-ph2 ">
                  <label className="db c-on-base-2 g-mb1 g-f2 lh-copy">{element.name}</label>
                  <div className="flex">
                    <Input className="w-70 dib" disabled value={element.version.split('+')[0]} />
                    <Button
                      className="dib"
                      onClick={() =>
                        this.handleUnlink(`${element.vendor}.${element.name}@${element.version.split('+')[0]}`)
                      }
                    >
                      Unlink
                    </Button>
                    <Button
                      className="dib"
                      onClick={() =>
                        this.handleHandlePublish(`${element.vendor}.${element.name}@${element.version.split('+')[0]}`)
                      }
                    >
                      Pubish
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default props => (
  <Mutation mutation={publishAppDH}>
    {(publishAppDH, { loading: PAloading, called: PACalled, error: PAerror }) => (
      <Mutation mutation={unlinkAllApps}>
        {(unlinkAllApps, { loading: allLoadin, called: allCalled, error: allerror }) => (
          <Mutation mutation={UnlinkApp}>
            {(unLinkApp, { loading, called, error }) => (
              <>
                {(allLoadin || allCalled) && !allerror && <span className="c-primary">We are publishing your app</span>}
                {(allLoadin || allCalled) && !allerror && <span className="c-primary">We are reloading the page</span>}
                {(loading || called) && !error && <span className="c-primary">We are reloading the page</span>}
                <Query query={query} variables={{ category: 'wooow' }}>
                  {({ data, loading }) => (
                    <Apps
                      {...props}
                      {...data}
                      unLinkApp={unLinkApp}
                      loadingQuery={loading}
                      unlinkAllApps={unlinkAllApps}
                      publishAppDH={publishAppDH}
                    />
                  )}
                </Query>
              </>
            )}
          </Mutation>
        )}
      </Mutation>
    )}
  </Mutation>
)
