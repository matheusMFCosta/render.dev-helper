import * as React from 'react'
import { StringValue } from 'react-values'
import { Input, Button } from 'gocommerce.styleguide'
import Cookies from 'js-cookie'

export interface WorkspaceProps {}

export interface WorkspaceState {
  currentWorkspace: string
  showReloadMessage: boolean
}

export default class Workspace extends React.Component<WorkspaceProps, WorkspaceState> {
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

  public render() {
    const { currentWorkspace, showReloadMessage } = this.state
    return (
      <div className="g-pa4">
        <div className="g-mb2">
          <Input label="Current workspace" disabled value={currentWorkspace} />
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
