import * as React from 'react'
import { Button, IconCaret, IconArc, IconCloseAlt, IconCheck } from 'gocommerce.styleguide'
import Cookies from 'js-cookie'
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
  currentWorkspace: string
}

export default class ColapseModalProps extends React.Component<ColapseModalPropsProps, ColapseModalPropsState> {
  state: ColapseModalPropsState = {
    currentWorkspace: '',
    status: 'none'
  }

  handleStateChange = (newState: colapseModalStatu) => setTimeout(this.setState({ status: newState }), 1500)

  eventListener(eventBuffer) {
    const wow = String.fromCharCode.apply(null, new Uint8Array(eventBuffer))
    try {
      const ppp = wow.slice(6)
      const json = JSON.parse(ppp)
      switch (json.body.code) {
        case 'start':
          this.handleStateChange('loading')
          break
        case 'success':
          this.handleStateChange('success')
          break
        case 'fail':
          this.handleStateChange('error')
          break
      }
    } catch {
      //console.log(``)
    }
  }

  componentDidMount() {
    const cookies = Cookies.get()
    const currentWorkspace = cookies['VtexCustomWorkspace'] || cookies['VtexWorkspace']

    const eventListener = event => this.eventListener(event)
    const host = window && window.location && window.location.host
    fetch(`https://${host}/_v/sse/vtex.builder-hub:*:react2,pages0,build.status?workspace=${currentWorkspace}`).then(
      response => {
        var reader = response.body.getReader()
        var bytesReceived = 0
        return reader.read().then(function processResult(result) {
          if (result.done) {
            return
          }
          eventListener(result.value.buffer)
          bytesReceived += result.value.length
          return reader.read().then(processResult)
        })
      }
    )
  }

  public render() {
    const { toggle } = this.props
    const { status } = this.state
    return <Button onClick={toggle} className="g-mr2" icon={<Icon status={status} />} />
  }
}
