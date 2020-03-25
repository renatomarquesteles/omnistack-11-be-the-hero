import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Incidents from './pages/Incidents';
import Logon from './pages/Logon';
import NewIncident from './pages/NewIncident';
import Register from './pages/Register';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/incidents" exact component={Incidents} />
        <Route path="/incidents/new" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  );
}
