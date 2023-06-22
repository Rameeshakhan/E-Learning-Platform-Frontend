import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/css/toastify.module.css';

const Toastify = ({ text, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Remove the toast after 3 seconds
      closeToast();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const closeToast = () => {
    onClose(); // Call the onClose prop to close the toast
  };

  return (
    <div className={styles.toast}>
      <div className={styles.toastText}>{text}</div>
    </div>
  );
};

Toastify.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toastify;
