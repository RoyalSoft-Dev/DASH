// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

// routes
import Router from 'src/routes/sections';
// theme
import ThemeProvider from 'src/theme';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// auth
import { AuthProvider, AuthConsumer } from 'src/auth/context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { store, persistor } from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { reRegisterSnapshot } from './store/actions/authAction';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'

// ----------------------------------------------------------------------

function App() {
  // useScrollToTop();

  const dispatch: any = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid)
      } else {
        dispatch({
          type: 'LOGOUT'
        })
        navigate('/auth/login')
      }
    });
  }, [])


  return (
    <SettingsProvider
      defaultSettings={{
        themeMode: 'light', // 'light' | 'dark'
        themeDirection: 'ltr', //  'rtl' | 'ltr'
        themeContrast: 'default', // 'default' | 'bold'
        themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
        themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
        themeStretch: false,
      }
      }
    >
      <ThemeProvider>
        <MotionLazy>
          <SettingsDrawer />
          <ProgressBar />
          <AuthConsumer>
            <Router />
          </AuthConsumer>
        </MotionLazy>
      </ThemeProvider>
    </SettingsProvider >
  );
}

export default App