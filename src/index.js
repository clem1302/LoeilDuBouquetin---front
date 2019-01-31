import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './redux'
import Router from './components/Router'

class App extends React.Component{
	render(){
		return <Provider store={store}>
			<Router />
		</Provider>;
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
