import React from 'react';

const Contact = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: '100px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '500px',
    gap: '15px',
    marginBottom: '30px',
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const headingStyle = {
    marginBottom: '20px',
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const contactDetailsStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '16px',
    lineHeight: '2',
  };

  const mapContainerStyle = {
    width: '100%',
    maxWidth: '800px',
    height: '400px',
    marginBottom: '30px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  const responsiveStyle = {
    '@media (max-width: 768px)': {
      containerStyle: {
        padding: '10px',
      },
      headingStyle: {
        fontSize: '20px',
      },
      mapContainerStyle: {
        height: '200px',
      },
    },
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Contact Us</h1>

      {/* Contact Details Section */}
      <div style={contactDetailsStyle}>
        <p><strong>Address:</strong> 123 Main Street, Cityville, Country</p>
        <p><strong>Phone:</strong> +1 (123) 456-7890</p>
        <p><strong>Email:</strong> contact@yourwebsite.com</p>
      </div>

      {/* Google Maps Embed */}
      <div style={mapContainerStyle}>
        <iframe
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.4194154846817!3d37.77492977975962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f0e2f3b1%3A0x4c8b8c8b8b8b8b8b!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1616161616161!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Contact Form */}
      {/* <form style={formStyle}>
        <input
          type="text"
          placeholder="Your Name"
          style={inputStyle}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          style={inputStyle}
          required
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          style={{ ...inputStyle, resize: 'none' }}
          required
        ></textarea>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
        >
          Send Message
        </button>
      </form> */}
    </div>
  );
};

export default Contact;