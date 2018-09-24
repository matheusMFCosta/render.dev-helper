import * as React from 'react'

import { BooleanValue } from 'react-values'
import ColapseModal from './components/colapseModal'
import Modal from './components/modal'

interface devHelperProps {}

class devHelper extends React.Component<devHelperProps, {}> {
  render() {
    return (
      <div className="absolute z-max g-pt3 g-pl3">
        <BooleanValue>
          {({ value: isModalOpen, toggle }) => (
            <div>{isModalOpen ? <Modal toggle={toggle} /> : <ColapseModal toggle={toggle} />}</div>
          )}
        </BooleanValue>
      </div>
    )
  }
}

export default devHelper
