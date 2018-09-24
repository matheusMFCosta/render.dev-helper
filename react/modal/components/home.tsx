import * as React from 'react'
import { accountInfo } from '../types'
import { Input } from 'gocommerce.styleguide'

export interface HomeProps {
  accountInfo: accountInfo
}

export interface HomeState {}
//        Welcome to Dev-Helper this plugIn will help you to develop apps at the GoCommerce enviroment
export default class Home extends React.Component<HomeProps, HomeState> {
  public render() {
    const { accountCode, isProduction, register, userEmail, userRol, version } = this.props.accountInfo
    return (
      <div>
        <div className=" flex g-pv4">
          <div className="w-50 g-pl2">
            <Input className="w-100" label="User Email" disabled value={userEmail} />
          </div>
          <div className="w-50 g-ph2">
            <Input className="w-100" label="User Role" disabled value={userRol} />
          </div>
        </div>
        <div className="flex g-pv4">
          <div className="w-50 g-pl2">
            <Input className="w-100" label="Account Code" disabled value={accountCode} />
          </div>
          <div className="w-50 g-ph2">
            <Input className="w-100" label="Contract" disabled value={register} />
          </div>
        </div>
        <div className=" flex g-pv4">
          <div className="w-50 g-pl2">
            <Input className="w-100" label="Is Production" disabled value={isProduction} />
          </div>
          <div className="w-50 g-ph2">
            <Input className="w-100" label="appVersion" disabled value={version.split('@')[1]} />
          </div>
        </div>
      </div>
    )
  }
}
