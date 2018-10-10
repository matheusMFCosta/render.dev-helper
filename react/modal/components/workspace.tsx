import * as React from 'react'
import { Mutation, Query } from 'react-apollo'
import { StringValue } from 'react-values'
import { Input, Button } from 'gocommerce.styleguide'
import workspaceResetDH from './../queries/workspaceResetDH.gql'
import getAccountByHost from './../queries/getAccountByHost.gql'
console.log(`workspaceResetDH`, workspaceResetDH)
console.log(`getAccountByHost`, getAccountByHost)
import Cookies from 'js-cookie'

export interface WorkspaceProps {
  accountData
  workspaceResetDH: (
    {
      variables: { accountName, workspaceName }
    }
  ) => {}
}

export interface WorkspaceState {
  currentWorkspace: string
  showReloadMessage: boolean
}

class Workspace extends React.Component<WorkspaceProps, WorkspaceState> {
  state = { currentWorkspace: '', showReloadMessage: false }

  componentDidMount() {
    const cookies = Cookies.get()
    const currentWorkspace = cookies['VtexCustomWorkspace'] || cookies['VtexWorkspace']
    this.setState({ currentWorkspace })
  }

  saveNewWorkspace = cookieValue => {
    if (cookieValue) {
      this.setState({ showReloadMessage: true })
      location.reload()
      Cookies.remove('VtexWorkspace')
      Cookies.set('VtexCustomWorkspace', cookieValue.trim())
    }
  }

  handleWorkspaceReset = async () => {
    const { id } = this.props.accountData.getAccountByHost
    const { currentWorkspace } = this.state
    const {
      data: { workspaceResetDH }
    } = await this.props.workspaceResetDH({ variables: { accountName: id, workspaceName: currentWorkspace } })

    if (!workspaceResetDH.error) location.reload()
  }

  public render() {
    const { currentWorkspace, showReloadMessage } = this.state
    return (
      <div className="g-pa4">
        <div className="g-mb2 ">
          <Input label="Current workspace" disabled value={currentWorkspace} />
          <Button style="danger" className="g-ml2" onClick={this.handleWorkspaceReset}>
            Reset Workspace
          </Button>
        </div>
        <div className="g-mb2 ">
          <StringValue defaultValue="">
            {({ value, set }) => (
              <>
                <Input label="Change Workspace" value={value} onChange={e => set(e.target.value)} />
                <Button onClick={() => this.saveNewWorkspace(value)} className="g-ml4">
                  Save
                </Button>
              </>
            )}
          </StringValue>
        </div>
        {showReloadMessage && <span className="c-primary">We are reloading the page</span>}
      </div>
    )
  }
}

export default props => (
  <Mutation mutation={workspaceResetDH}>
    {(workspaceResetDH, { loading, called, error }) => (
      <>
        {(loading || called) && !error && <span className="c-primary">We are reloading the page</span>}
        <Query query={getAccountByHost}>
          {({ data }) => <Workspace {...props} workspaceResetDH={workspaceResetDH} accountData={data} />}
        </Query>
      </>
    )}
  </Mutation>
)
