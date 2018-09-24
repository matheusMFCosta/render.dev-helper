import * as React from 'react'
import { Button, IconCaret, IconArc, IconCloseAlt, IconCheck } from 'gocommerce.styleguide'
import { colapseModalStatu } from '../types'

const Icon = (props: { status: colapseModalStatu }) =>
  (props.status === 'success' && <IconCheck />) ||
  (props.status === 'loading' && <IconArc spin />) ||
  (props.status === 'error' && <IconCloseAlt />) || <IconCaret side="right" />

export interface ColapseModalPropsProps {
  toggle: Function
}

export interface ColapseModalPropsState {
  status: colapseModalStatu
}

export default class ColapseModalProps extends React.Component<ColapseModalPropsProps, ColapseModalPropsState> {
  state: ColapseModalPropsState = {
    status: 'none'
  }

  logFn = console.log

  handleStateChange = (newState: colapseModalStatu) => this.setState({ status: newState })

  cslOverwrite = body => {
    const message = body[0]
    if (!message || (message && !message.match)) {
      return
    }
    message.match(/^(\[build\]).*(Build).*(start).*$/gi) && this.handleStateChange('loading')

    message.match(/^(\[render\]).*(Connect).*(success).*$/gi) && this.handleStateChange('success')
    message.match(/\[build\].*success/) && this.handleStateChange('success')

    message.match(/\[build\].*fail/) && this.handleStateChange('error')
    message.match(/^(\[render\]).*(Connect).*(fail).*$/gi) && this.handleStateChange('error')
  }

  componentDidMount() {
    console.log = (...body) => {
      this.logFn(...body)
      this.cslOverwrite(body)
    }
  }

  public render() {
    const { toggle } = this.props
    const { status } = this.state
    return <Button onClick={toggle} className="g-mr2" icon={<Icon status={status} />} />
  }
}
