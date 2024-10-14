// src/components/TrailerModal/TrailerModal.jsx
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import './TrailerModal.css'; // Ensure this CSS file is created

const TrailerModal = ({ trailerUrl, title, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const modalRef = useRef(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Ensure modalRef is focused for accessibility
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  // Ensure modal-root exists
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error("Modal root element not found. Please add <div id='modal-root'></div> to your HTML.");
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="trailer-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trailer-title"
      tabIndex="-1"
      ref={modalRef}
    >
      <div className="trailer-content" onClick={(e) => e.stopPropagation()}>
        {isLoading && (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        )}
        {!hasError ? (
          <iframe
            className={`trailer-iframe ${isLoading ? 'hidden' : 'visible'}`}
            src={trailerUrl}
            title={`${title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          ></iframe>
        ) : (
          <div className="error-message">
            <p>Failed to load trailer. Please try again later.</p>
          </div>
        )}
        <button
          className="close-trailer"
          onClick={onClose}
          aria-label="Close Trailer"
        >
          ✖
        </button>
      </div>
    </div>,
    modalRoot // Ensure 'modal-root' exists
  );
};

TrailerModal.propTypes = {
  trailerUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TrailerModal;
