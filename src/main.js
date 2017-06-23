import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './component.jsx';
import './main.css';

main();

function main() {
    ReactDOM.render(<Hello />, document.getElementById('app'));
}