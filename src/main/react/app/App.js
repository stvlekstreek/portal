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
import {UserProfileFeature} from "@flock-eco/feature-user/src/main/react/user_profile/UserProfileFeature";

class App extends React.Component {

  state = {
    spinner: true
  };

  get theme() {
    return createMuiTheme({
      palette: {

      primary: {
          main: '#1b3380',
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

          <Route path='/profile' render={(props) => (
            <UserProfileFeature/>
          )}/>

        </AppLayout>
      </HashRouter>
    )
  }

}

export default App
