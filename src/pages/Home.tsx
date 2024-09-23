import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';
import { playCircle, radio, library, search, cube, heart } from 'ionicons/icons';
import { ProductPage } from "./Product/ProductPage";
import { DesiredProductPage } from "./DesiredProduct/DesiredProductPage";

const Home: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/home" render={() => <ProductPage />} exact={true} />
          <Route path="/desired" render={() => <DesiredProductPage update={true} />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={cube} />
            <IonLabel>Productos</IonLabel>
          </IonTabButton>

          <IonTabButton tab="desired" href="/desired">
            <IonIcon icon={heart} />
            <IonLabel>Productos Deseados</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default Home;
