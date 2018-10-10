import * as React from 'react'
import { Query } from 'react-apollo'
import { Input } from 'gocommerce.styleguide'
import getAccountByHost from './../queries/getAccountByHost.gql'

export interface AccountProps {}

export interface AccountState {}

export default class Account extends React.Component<AccountProps, AccountState> {
  public render() {
    return (
      <Query query={getAccountByHost}>
        {data => {
          const getAccountByHost = data.data && data.data.getAccountByHost
          const { contract, country, defaultHost, defaultLocale, host, id, isActive, name, ownerEmail, title } =
            getAccountByHost || ({} as object)
          return (
            <div>
              <div className=" flex g-pv4">
                <div className="w-50 g-pl2">
                  <Input className="w-100" label="Account Id" disabled value={id} />
                </div>
                <div className="w-50 g-ph2">
                  <Input className="w-100" label="Owner Email" disabled value={ownerEmail} />
                </div>
              </div>
              <div className="flex g-pv4">
                <div className="w-50 g-pl2">
                  <Input className="w-100" label="Account Name" disabled value={name} />
                </div>
                <div className="w-50 g-ph2">
                  <Input className="w-100" label="Account Title" disabled value={title} />
                </div>
              </div>
              <div className=" flex g-pv4">
                <div className="w-50 g-pl2">
                  <Input className="w-100" label="Is Active" disabled value={isActive} />
                </div>
                <div className="w-50 g-ph2">
                  <Input className="w-100" label="Contract" disabled value={contract} />
                </div>
              </div>
              <div className=" flex g-pv4">
                <div className="w-50 g-pl2">
                  <Input className="w-100" label="Host" disabled value={host} />
                </div>
                <div className="w-50 g-ph2">
                  <Input className="w-100" label="default Host" disabled value={defaultHost} />
                </div>
              </div>
              <div className=" flex g-pv4">
                <div className="w-50 g-pl2">
                  <Input className="w-100" label="Country" disabled value={country} />
                </div>
                <div className="w-50 g-ph2">
                  <Input className="w-100" label="defaultLocale" disabled value={defaultLocale} />
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}
