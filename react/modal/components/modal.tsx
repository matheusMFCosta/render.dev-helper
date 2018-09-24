import * as React from 'react'
import { Tab, IconCloseAlt } from 'gocommerce.styleguide'
import { modalSections, modalTabs } from '../types'
import Workspace from './workspace'

const Contet = (props: { currentTab: modalSections }) =>
  (props.currentTab === 'home' && (
    <div className="g-ph2 g-pv4">
      <div className="g-pa4">
        Welcome to Dev-Helper this plugIn will help you to develop apps at the GoCommerce enviroment
      </div>
    </div>
  )) ||
  (props.currentTab === 'workspace' && <Workspace />)

export interface ModalProps {
  toggle: Function
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
    const { toggle } = this.props
    const { currentTab } = this.state
    const list: modalTabs[] = [
      {
        id: 'home',
        label: 'Home'
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
        <Contet currentTab={currentTab} />
      </div>
    )
  }
}
