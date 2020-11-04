import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import React, { Fragment, useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import "./dx-styles.scss";
import LoadPanel from "devextreme-react/load-panel";
import { NavigationProvider } from "./contexts/navigation";
import { AuthProvider, useAuth } from "./contexts/auth";
import { useScreenSizeClass } from "./utils/media-query";
import Content from "./Content";
import NotAuthenticatedContent from "./NotAuthenticatedContent";

import { connect } from "react-redux";
import ModalManager from "./modals/ModalManager";
import trMessages from "devextreme/localization/messages/tr.json";
import { locale, loadMessages } from "devextreme/localization";

const App = ({ auth }) => {
  useEffect(() => {
    loadMessages(trMessages);
    console.log("navigator", navigator.language);
    locale(navigator.language);
  }, []);
  const authenticated = auth.isLoaded && !auth.isEmpty;

  const screenSizeClass = useScreenSizeClass();

  if (!auth.isLoaded) {
    return <LoadPanel visible={true} />;
  }

  if (authenticated) {
    return (
      <Router>
        <AuthProvider>
          <NavigationProvider>
            <div className={`app ${screenSizeClass}`}>
              <Fragment>
                <ModalManager />
                <Content />
              </Fragment>
            </div>
          </NavigationProvider>
        </AuthProvider>
      </Router>
    );
  }

  return <NotAuthenticatedContent />;
};

const mapState = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapState, null)(App);
