import * as React from 'react'
import { Tab, IconCloseAlt } from 'gocommerce.styleguide'
import { modalSections, modalTabs, accountInfo } from '../types'
import Workspace from './workspace'
import Home from './home'
import Accounts from './account'
import InstalledApps from './installedApps'
import Apps from './apps'

const Contet = (props: { currentTab: modalSections; accountInfo: accountInfo }) =>
  (props.currentTab === 'home' && <Home accountInfo={props.accountInfo} />) ||
  (props.currentTab === 'workspace' && <Workspace />) ||
  (props.currentTab === 'account' && <Accounts />) ||
  (props.currentTab === 'apps' && <Apps />) ||
  (props.currentTab === 'installedApps' && <InstalledApps />)

export interface ModalProps {
  accountInfo: accountInfo
  toggle: () => {}
}

export interface ModalState {
  currentTab: modalSections
}

export default class Modal extends React.Component<ModalProps, ModalState> {
  state: ModalState = {
    currentTab: 'home'
  }

  handleTabChange = (newTab: modalSections) => this.setState({ currentTab: newTab })

  public render() {
    const { toggle, accountInfo } = this.props
    const { currentTab } = this.state
    const list: modalTabs[] = [
      {
        id: 'home',
        label: 'Home'
      },
      {
        id: 'account',
        label: 'Account'
      },
      {
        id: 'apps',
        label: 'Apps'
      },
      {
        id: 'installedApps',
        label: 'installedApps'
      },
      {
        id: 'workspace',
        label: 'Workspace'
      },

      {
        id: 'TODO',
        label: 'TODO'
      }
    ]
    return (
      <div style={{ width: '600px' }} className="bg-base ba b--base-4 g-pb4">
        <div className="bg-base-2 g-pt4 g-ph2 flex justify-between">
          <Tab list={list} initialTab="home" onClick={this.handleTabChange} />
          <div onClick={toggle}>
            <IconCloseAlt class="c-primary" />
          </div>
        </div>{' '}
        <Contet currentTab={currentTab} accountInfo={accountInfo} />
      </div>
    )
  }
}
