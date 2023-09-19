import React from 'react';

const copyrightStyle = {
    textAlign: 'center',
    padding: '10px',
  };

function Footer() {
    return (
        <footer style={copyrightStyle} className="footer">
            &copy; {new Date().getFullYear()} VibeLog
        </footer>
    )
}

export default Footer;