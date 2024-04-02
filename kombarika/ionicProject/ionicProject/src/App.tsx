import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import 'bootstrap/dist/css/bootstrap.min.css';
/* Theme variables */
import "./theme/variables.css";

import AClientTeeth from "./pages/AClientTeeth";
import ATeethClient from "./pages/ATeethClient";
import ATeethTraitement from "./pages/ATeethTraitement";
import ATraitementStates from "./pages/ATraitementStates";
import Client from "./pages/Client";
import Service from "./pages/Service";
import States from "./pages/States";
import Step from "./pages/Step";
import Teeth from "./pages/Teeth";
import TeethType from "./pages/TeethType";
import Traitement from "./pages/Traitement";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/aClientTeeth" exact={true}>
            <AClientTeeth />
          </Route>
          <Route path="/aTeethClient" exact={true}>
            <ATeethClient />
          </Route>
          <Route path="/aTeethTraitement" exact={true}>
            <ATeethTraitement />
          </Route>
          <Route path="/aTraitementStates" exact={true}>
            <ATraitementStates />
          </Route>
          <Route path="/client" exact={true}>
            <Client />
          </Route>
          <Route path="/service" exact={true}>
            <Service />
          </Route>
          <Route path="/states" exact={true}>
            <States />
          </Route>
          <Route path="/step" exact={true}>
            <Step />
          </Route>
          <Route path="/teeth" exact={true}>
            <Teeth />
          </Route>
          <Route path="/teethType" exact={true}>
            <TeethType />
          </Route>
          <Route path="/traitement" exact={true}>
            <Traitement />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="aClientTeeth" href="/aClientTeeth">
            <IonLabel> AClientTeeth </IonLabel>
          </IonTabButton>
          <IonTabButton tab="aTeethClient" href="/aTeethClient">
            <IonLabel> ATeethClient </IonLabel>
          </IonTabButton>
          <IonTabButton tab="aTeethTraitement" href="/aTeethTraitement">
            <IonLabel> ATeethTraitement </IonLabel>
          </IonTabButton>
          <IonTabButton tab="aTraitementStates" href="/aTraitementStates">
            <IonLabel> ATraitementStates </IonLabel>
          </IonTabButton>
          <IonTabButton tab="client" href="/client">
            <IonLabel> Client </IonLabel>
          </IonTabButton>
          <IonTabButton tab="service" href="/service">
            <IonLabel> Service </IonLabel>
          </IonTabButton>
          <IonTabButton tab="states" href="/states">
            <IonLabel> States </IonLabel>
          </IonTabButton>
          <IonTabButton tab="step" href="/step">
            <IonLabel> Step </IonLabel>
          </IonTabButton>
          <IonTabButton tab="teeth" href="/teeth">
            <IonLabel> Teeth </IonLabel>
          </IonTabButton>
          <IonTabButton tab="teethType" href="/teethType">
            <IonLabel> TeethType </IonLabel>
          </IonTabButton>
          <IonTabButton tab="traitement" href="/traitement">
            <IonLabel> Traitement </IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
