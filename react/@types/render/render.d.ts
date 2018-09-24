/// <reference path="../react/react.d.ts" />

interface LinkProps {
  query?: String
  to?: String
  page?: String
  onClick?: Function
  className?: string
  params?: { [name: string]: any }
}

declare namespace Render {
  function render(...args)
  export class Link extends React.Component<LinkProps, any> {
    render()
  }
}

declare module 'render' {
  export = Render
}

declare module '*.gql' {
  const value: any
  export default value
}
