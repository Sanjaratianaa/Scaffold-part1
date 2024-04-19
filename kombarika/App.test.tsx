import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import Login from './pages/Login';

/* Theme variables */
import './theme/variables.css';
import 'bootstrap';

import Auteur from './pages/Auteur';
import Categories from './pages/Categories';
import Livre from './pages/Livre';

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                <Route path="/">
                    <Redirect to="/login" />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
    	<Route path="/auteur" exact={true}> 
	 <Auteur /> 
	 </Route>
	<Route path="/categories" exact={true}> 
	 <Categories /> 
	 </Route>
	<Route path="/livre" exact={true}> 
	 <Livre /> 
	 </Route>
	
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
    	<IonTabButton tab="auteur" href="/auteur"> 
	 <IonLabel> Auteur </IonLabel> 
	 </IonTabButton>
	<IonTabButton tab="categories" href="/categories"> 
	 <IonLabel> Categories </IonLabel> 
	 </IonTabButton>
	<IonTabButton tab="livre" href="/livre"> 
	 <IonLabel> Livre </IonLabel> 
	 </IonTabButton>
	
                </IonTabBar>

            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
