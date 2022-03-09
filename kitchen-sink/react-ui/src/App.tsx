import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import clsx from 'clsx';
import * as rxjs from 'rxjs';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Debug, MaterialUi } from '@pitaman71/omniglot-live-react';
import { Dependencies, Modules } from '@pitaman71/omniglot-live-data';

import * as Database from './Database';
import * as Decorators from './Decorators';
import config from './config';

const __moduleName__ = 'omniglot-live-react.App';

Dependencies.makeSubject = (() => new rxjs.Subject()) as any;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingLeft: 0,
  }
}));

function App() {
  const classes = useStyles();
    
  const browsers: JSX.Element[] = [];
  const root = Database.Root.Descriptor.bind({ database: { objectId: '__database__' }});
  return (
    <Debug.Boundary name={`${__moduleName__}`}>
      <MaterialUi.Themes.Provide theme={
        {
            palette: {
              type: 'dark'
            },
            typography: {    
            }
        }
      }>
        <CssBaseline/>
        <Database.Provide>
          <BrowserRouter>
            <MaterialUi.ViewDiscussion.Provide root={root}>
              <MaterialUi.ViewIdentity.Provide config={config}>
                <MaterialUi.ViewIdentity.Modal config={config}/>
                <MaterialUi.ViewIdentity.Protect reason={() => <span>Login to Demo App</span>}>
                  <div className="App">
                    <aside className="top-nav">
                      <MaterialUi.ViewDiscussion.AsBreadcrumbs
                        makeAnnotations={Decorators.makeAnnotations}
                        makeInspectors={Decorators.makeInspectors}
                      />
                    </aside>
                    <main
                      className={clsx(classes.content)}
                    >
                      <MaterialUi.ViewDiscussion.AsTopPanel
                        makeAnnotations={Decorators.makeAnnotations}
                        makeInspectors={Decorators.makeInspectors}
                      />
                    </main>
                    <aside className="bottom-nav">
                      <MaterialUi.ViewRoutes.AsBottomNav
                        root={root}
                        makeAnnotations={Decorators.makeAnnotations}
                        makeInspectors={Decorators.makeInspectors}
                      />
                    </aside>
                  </div>
                </MaterialUi.ViewIdentity.Protect>
              </MaterialUi.ViewIdentity.Provide>
            </MaterialUi.ViewDiscussion.Provide>
          </BrowserRouter>
        </Database.Provide>
      </MaterialUi.Themes.Provide>
    </Debug.Boundary>
  );
}

export default App;
