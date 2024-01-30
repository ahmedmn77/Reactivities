import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/Home/HomePage';

//note: App is the first component loaded when you open the appication then when user open 
//the route each compones on the route will render itself replacing the outlet
function App() {
    const location =useLocation();

    return (
        <>
            {location.pathname === '/' ? <HomePage /> : (
            <>
                <NavBar />
                <Container style={{ marginTop: '7em' }}>
                    <Outlet/>
                </Container>
            </>) }
        </>
    )
}
export default observer(App); 
