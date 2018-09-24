declare namespace ReactApollo {
  function graphql(wow: any, aa?: any)
  function withApollo(wow: any)
  function compose(...arg)
}

declare module 'react-apollo' {
  export = ReactApollo
}
