import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import './TrailerModal.css';

const TrailerModal = ({ trailerUrl, title, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const modalRef = useRef(null);
  const MAX_RETRIES = 3;

  const getModalRoot = () => {
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);
    }
    return modalRoot;
  };

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (modalRef.current) modalRef.current.focus();
  }, []);

  const handleRetry = () => {
    if (retryCount < MAX_RETRIES) {
      setIsLoading(true);
      setHasError(false);
      setRetryCount(prev => prev + 1);
    }
  };

  const modalRoot = getModalRoot();

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
            <p>Loading trailer...</p>
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
          <div className="error-container">
            <div className="error-message">
              <h3>Oops! Something went wrong</h3>
              <p>Unable to load the trailer for {title}</p>
              {retryCount < MAX_RETRIES ? (
                <button className="retry-button" onClick={handleRetry}>
                  Try Again
                </button>
              ) : (
                <p className="max-retries">
                  Maximum retry attempts reached. Please try again later.
                </p>
              )}
            </div>
          </div>
        )}
        
        <button
          className="close-trailer"
          onClick={onClose}
          aria-label="Close Trailer"
        >
          ×
        </button>
      </div>
    </div>,
    modalRoot
  );
};

TrailerModal.propTypes = {
  trailerUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TrailerModal;