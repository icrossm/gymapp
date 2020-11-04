import React, { useState, useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule
} from 'devextreme-react/form';
import LoadIndicator from 'devextreme-react/load-indicator';
import notify from 'devextreme/ui/notify';
import { useAuth } from '../../contexts/auth';

import './login-form.scss';
import { connect } from 'react-redux';
import { login } from "../../actions/authActions";


 const LoginForm = ({login}) =>{
  const history = useHistory();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const formData = useRef({});

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { email, password } = formData.current;
    setLoading(true);

    const result = await login(formData.current);
    if (!result.isOk) {
      setLoading(false);
      notify(result.message, 'error', 2000);
    }
  });

  const onCreateAccountClick = useCallback(() => {
    history.push('/create-account');
  }, [history]);

  return (
    <form className={'login-form'} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={'email'}
          editorType={'dxTextBox'}
          editorOptions={emailEditorOptions}
        > 
          <RequiredRule message="Email Giriniz" />
          <EmailRule message="Geçerli bir email giriniz" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'password'}
          editorType={'dxTextBox'}
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="Şifre giriniz" />
          <Label visible={false} />
        </Item>
        {/* <Item
          dataField={'rememberMe'}
          editorType={'dxCheckBox'}
          editorOptions={rememberMeEditorOptions}
        >
          <Label visible={false} />
        </Item> */}
        <ButtonItem>
          <ButtonOptions
            width={'100%'}
            type={'default'}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {
                loading
                  ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                  : 'Giriş Yap'
              }
            </span>
          </ButtonOptions>
        </ButtonItem>
        {/* <Item>
          <div className={'link'}>
            <Link to={'/reset-password'}>Şifrenizi mi unuttunuz?</Link>
          </div>
        </Item> */}
        {/* <ButtonItem>
          <ButtonOptions
            text={'Hesap oluştur'}
            width={'100%'}
            onClick={onCreateAccountClick}
          />
        </ButtonItem> */}
      </Form>
    </form>
  );
}

const emailEditorOptions = { stylingMode: 'filled', placeholder: 'Email', mode: 'email' };
const passwordEditorOptions = { stylingMode: 'filled', placeholder: 'Şifre', mode: 'password' };
const rememberMeEditorOptions = { text: 'Remember me', elementAttr: { class: 'form-text' } };


const actions = {
  login
}
export default connect(null,actions)(LoginForm)