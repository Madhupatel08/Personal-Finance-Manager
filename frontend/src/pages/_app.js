import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
// import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
// import { AuthProvider } from 'src/contexts/auth-store';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';

import { Provider } from 'react-redux';
import store from 'src/store';
import { AuthGuard } from 'src/guards/auth-guard';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        {/* Existing code */}
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>

        <Provider store={store}>
          
            <ThemeProvider theme={theme}>
            <AuthGuard>
                <CssBaseline />
                {getLayout(<Component {...pageProps} />)}
                </AuthGuard>
            </ThemeProvider>
            
        </Provider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;

