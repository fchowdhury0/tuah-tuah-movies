/**
 * Converts various YouTube URL formats to the embed format.
 * Supports standard, shortened, and playlist URLs.
 *
 * @param {string} url - The original YouTube URL
 * @returns {string|null} - The converted embed URL or null if invalid
 */
const convertYouTubeUrl = (url) => {
  // Input validation
  if (!url || typeof url !== 'string') {
    console.warn('Invalid YouTube URL: URL must be a non-empty string');
    return null;
  }

  // Sanitize input
  const sanitizedUrl = url.trim();

  try {
    const urlObj = new URL(sanitizedUrl);
    let videoId = '';
    let params = new URLSearchParams();

    // Handle different YouTube domains
    switch (urlObj.hostname) {
      case 'youtu.be':
        videoId = urlObj.pathname.slice(1);
        break;

      case 'youtube.com':
      case 'www.youtube.com':
        // Handle watch URLs
        if (urlObj.pathname === '/watch') {
          videoId = urlObj.searchParams.get('v');
          
          // Preserve timestamp if present
          const startTime = urlObj.searchParams.get('t');
          if (startTime) {
            params.append('start', parseTimeStamp(startTime));
          }

          // Handle playlists
          const listId = urlObj.searchParams.get('list');
          if (listId) {
            params.append('list', listId);
          }
        }
        // Handle shortened embed URLs
        else if (urlObj.pathname.startsWith('/embed/')) {
          return sanitizedUrl; // Already in embed format
        }
        // Handle shortened URLs
        else if (urlObj.pathname.startsWith('/v/')) {
          videoId = urlObj.pathname.slice(3);
        }
        break;

      default:
        console.warn('Invalid YouTube URL: Not a YouTube domain');
        return null;
    }

    // Validate video ID
    if (!videoId || !isValidVideoId(videoId)) {
      console.warn('Invalid YouTube URL: Could not extract valid video ID');
      return null;
    }

    // Construct embed URL with parameters
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    const queryString = params.toString();
    
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;

  } catch (error) {
    console.error('Error converting YouTube URL:', error);
    return null;
  }
};

/**
 * Validates YouTube video ID format
 * @param {string} id - Video ID to validate
 * @returns {boolean} - Whether ID is valid
 */
const isValidVideoId = (id) => {
  return /^[a-zA-Z0-9_-]{11}$/.test(id);
};

/**
 * Converts YouTube timestamp to seconds
 * @param {string} timestamp - Timestamp from URL
 * @returns {number} - Time in seconds
 */
const parseTimeStamp = (timestamp) => {
  // Handle seconds format (e.g. "123s")
  if (timestamp.endsWith('s')) {
    return parseInt(timestamp.slice(0, -1));
  }

  // Handle clock format (e.g. "1h2m3s")
  let seconds = 0;
  const parts = timestamp.match(/(\d+h)?(\d+m)?(\d+s)?/);
  
  if (parts[1]) seconds += parseInt(parts[1]) * 3600;
  if (parts[2]) seconds += parseInt(parts[2]) * 60;
  if (parts[3]) seconds += parseInt(parts[3]);
  
  return seconds;
};

export default convertYouTubeUrl;