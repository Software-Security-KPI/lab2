import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const Content = () => {
	const { loginWithRedirect, logout, isAuthenticated, 
        getAccessTokenSilently, user } = useAuth0();

	useEffect(() => {
		if (isAuthenticated) {
			const getAccessToken = async () => {
				const accessToken = await getAccessTokenSilently();
				console.log(accessToken);
				sessionStorage.setItem('token', accessToken);
			};
			getAccessToken();
		}
	}, [isAuthenticated]);

	const signOut = () => {
		logout();
		sessionStorage.removeItem('token');
	};

	return (
		<>
			<button onClick={() => isAuthenticated ? signOut() : loginWithRedirect()}>
				{isAuthenticated ? 'Logout' : 'Login'}
			</button>
			{isAuthenticated && (
				<ul className='user-info'>
					{user &&
						Object.keys(user).map((objKey, index) =>
							index < 8 ? (
								<li key={index}>
									{objKey}: {user[objKey]}
								</li>
							) : null
						)}
				</ul>
			)}
		</>
	);
};

export default Content;
