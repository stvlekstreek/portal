import React from 'react';

import {HashRouter, Redirect, Route} from 'react-router-dom'

import AppLayout from './AppLayout'

import MemberFeature from '@flock-eco/feature-member/src/main/react/member/MemberFeature'
import {UserFeature} from '@flock-eco/feature-user/src/main/react/user/UserFeature'

import AppSettings from './AppSettings'
import AppSpinner from './AppSpinner'

import AuthorityUtil from '../utils/AuthorityUtil'

import {createMuiTheme} from '@material-ui/core/styles';

import purple from '@material-ui/core/colors/purple';

class App extends React.Component {

  state = {
    spinner: true
  };

  get theme() {
    return createMuiTheme({
      palette: {
        primary: purple,
        secondary: {
          main: '#f44336',
        },
      },
      typography: {
        useNextVariants: true,
      },
    })
  }

  componentDidMount() {
    fetch('/login/status')
      .then(res => res.json())
      .then(json => {
        if (!json.loggedIn) {
          window.location.replace("/login");
        } else {
          AuthorityUtil.setAuthorities(json.authorities)
          this.setState({
            spinner: false,
            applicationName: json.applicationName
          })
        }

      })
  }

  render() {

    if (this.state.spinner)
      return (<AppSpinner/>)

    return (
      <HashRouter>
        <AppLayout theme={this.theme} title={this.state.applicationName}>

          <Route path='/' exact render={(props) => (
            <Redirect to="/dashboard"/>
          )}/>

          <Route path='/members' exact render={(props) => (
            <MemberFeature/>
          )}/>

          <Route path='/users' exact render={(props) => (
            <UserFeature/>
          )}/>

          <Route path='/settings' render={(props) => (
            <AppSettings/>
          )}/>

        </AppLayout>
      </HashRouter>
    )
  }

}

export default App
