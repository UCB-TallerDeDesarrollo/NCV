import React from 'react';
import LoginForm from './components/LoginForm';

function App(props){
    const { children, ...rest } = props;

    return ( 
        <>
            <LoginForm />
        </>
     );
}

export default App;