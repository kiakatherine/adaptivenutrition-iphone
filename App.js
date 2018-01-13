import React from 'react';

import { router } from './router';

import AuthService from './services/AuthService';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { authenticated: false };
  }

  componentWillMount() {
    return AuthService.isSignedIn()
      .then(res => this.setState({ authenticated: res }));
  }

  render () {
    const Layout = router(this.state.authenticated);
    return <Layout />;
  }
}
