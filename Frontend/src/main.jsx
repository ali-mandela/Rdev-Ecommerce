import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {UserProvider} from '../context/userContext.jsx'
import {BrowserRouter} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <BrowserRouter>
            <UserProvider>
                <App/>
            </UserProvider>
        </BrowserRouter>
    )
