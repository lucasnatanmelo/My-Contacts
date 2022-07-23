import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';
import { Container } from './styles';

import Header from '../Header';
import Routes from '../../Routes';

import ToastContainer from '../Toast/ToastContainer';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />

        <Container>
          <Header />
          <Routes />
        </Container>

      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

// Browse Router é o componente que irá habilitar as funções de rotas do sistema
// Theme Provider irá enviar os temas padronizados para as camadas mais abaixo(filhos)
// GlobalStyles será os estilos globais como margens, fontes, e cursor nos botões

// O componente Routes é parte dinâmica da aplicação,onde irá mudar em cada rota acessada
