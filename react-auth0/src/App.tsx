import { useAuth0 } from '@auth0/auth0-react';

import Content from './components/Content';
import Loader from './components/Loader';

function App() {
    const { isLoading } = useAuth0();
	return (
		<div className='container'>
			<h2>Auth0</h2>
            { isLoading && <Loader /> }
            { !isLoading && <Content /> }
		</div>
	);
}

export default App;
