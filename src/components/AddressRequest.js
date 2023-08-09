// components/AddressRequest.js

import React, { useEffect, useState } from 'react';

function AddressRequest({ ipVersion = 'ipv4' }) {
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    // determine the API endpoint based on prop
    const apiUrl = ipVersion === 'ipv6' 
      ? 'https://api6.ipify.org?format=json'  // Change api64 to api6
      : 'https://api.ipify.org?format=json';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setIpAddress(data.ip))
      .catch(error => console.error('Error fetching IP:', error));
  }, [ipVersion]);  // useEffect dependency ensures that the effect runs whenever ipVersion prop changes

  return (
    <div>
      Your public {ipVersion.toUpperCase()} address is: {ipAddress}
    </div>
  );
}

export default AddressRequest;
