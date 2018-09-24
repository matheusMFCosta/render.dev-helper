import * as React from 'react'
import { StringValue } from 'react-values'
import { Input, Button } from 'gocommerce.styleguide'
import Cookies from 'js-cookie'

export interface WorkspaceProps {}

export interface WorkspaceState {
  currentWorkspace: string
}

export default class Workspace extends React.Component<WorkspaceProps, WorkspaceState> {
  state = { currentWorkspace: '' }

  componentDidMount() {
    const cookies = Cookies.get()
    const currentWorkspace = cookies['VtexCustomWorkspace'] || cookies['VtexWorkspace']
    this.setState({ currentWorkspace })
  }

  saveNewWorkspace = cookieValue => {
    if (cookieValue) {
      Cookies.remove('VtexWorkspace')
      Cookies.set('VtexCustomWorkspace', cookieValue.trim())
    }
  }

  public render() {
    const { currentWorkspace } = this.state
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
      </div>
    )
  }
}
