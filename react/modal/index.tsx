import * as React from 'react'
import { Query } from 'react-apollo'
import query from './queries/getAccountInfo.gql'
import { BooleanValue } from 'react-values'
import ColapseModal from './components/colapseModal'
import Modal from './components/modal'

interface devHelperProps {}

class devHelper extends React.Component<devHelperProps, {}> {
  render() {
    const permitedRole = 'system-admin'
    return (
      <Query query={query}>
        {({ data }) => {
          const getAccountInfo = data && data.getAccountInfo
          return (
            (getAccountInfo &&
              getAccountInfo.userRol === permitedRole && (
                <div className="absolute z-max g-pt3 g-pl3">
                  <BooleanValue>
                    {({ value: isModalOpen, toggle }) => (
                      <>
                        {isModalOpen ? (
                          <Modal toggle={toggle} accountInfo={getAccountInfo} />
                        ) : (
                          <ColapseModal toggle={toggle} />
                        )}
                      </>
                    )}
                  </BooleanValue>
                </div>
              )) || <div />
          )
        }}
      </Query>
    )
  }
}

export default devHelper
