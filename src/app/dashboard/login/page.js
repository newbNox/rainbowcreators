'use client'
import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    // Fetch the Discord authorization URL from your API route
    fetch('../api/login')
      .then((response) => response.json())
      .then((data) => {
        // Redirect the user to the Discord authorization URL
        window.location.href = data.url;
      })
      .catch((error) => {
        console.error('Failed to fetch Discord authorization URL:', error);
        // Handle error (e.g., display an error message to the user)
      });
  }, []);

  return <div>Redirecting to Discord...</div>;
};

export default LoginPage;
