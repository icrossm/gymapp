import React, { useMemo } from 'react';
import ContextMenu, { Position } from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import { useAuth } from '../../contexts/auth';
import './user-panel.scss';
import { withRouter } from "react-router-dom";
import { withFirebase } from "react-redux-firebase";
import { connect } from "react-redux";

 const UserPanel =({ menuMode,firebase })=> {

  const { user, signOut } = useAuth();
  
  const handleSignOut = () => {
    firebase.logout();
  };

  const menuItems = useMemo(() => ([
    // {
    //   text: 'Profile',
    //   icon: 'user'
    // },
    {
      text: 'Çıkış',
      icon: 'runner',
      onClick: handleSignOut
    }
  ]), [signOut]);
  
  return (
    <div className={'user-panel'}>
      <div className={'user-info'}>
         <div className={'image-container'}>
          <div
            style={{
              background: `no-repeat #fff`,
              backgroundSize: 'cover'
            }}
            className={'user-image'} />
        </div> 
        <div className={'user-name'}>İşlemler</div> 
      </div>

      {menuMode === 'context' && (
        <ContextMenu
          items={menuItems}
          target={'.user-button'}
          showEvent={'dxclick'}
          width={210}
          cssClass={'user-menu'}
        >
          <Position my={'top center'} at={'bottom center'} />
        </ContextMenu>
      )}
      {menuMode === 'list' && (
        <List className={'dx-toolbar-menu-action'} items={menuItems} />
      )}
    </div>
  );
}
const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default withFirebase(connect(mapState, null)(UserPanel))