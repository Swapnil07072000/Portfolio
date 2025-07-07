import React from 'react';

function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center items-center justify-center text-gray-400 text-sm py-4">
      &copy; {currentYear} Swapnil Pawar. All rights reserved.
    </footer>
  );
}

export default Copyright;
