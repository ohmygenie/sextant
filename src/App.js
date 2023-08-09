import React from 'react';
import './App.css';
import AddressRequest from './components/AddressRequest'; // Ensure you've imported this
import Banner from './components/Banner';
import Exhibit from './components/Exhibit';

function App() {
  return (
    <div className="App">
      <Banner />

      <header className="App-header">
        <Exhibit title="React Exhibit">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </Exhibit>

        <Exhibit title="IPv4 Address">
          <AddressRequest ipVersion="ipv4" />
        </Exhibit>
        
        <Exhibit title="IPv6 Address">
          <AddressRequest ipVersion="ipv6" />
        </Exhibit>
      </header>
    </div>
  );
}

export default App;
