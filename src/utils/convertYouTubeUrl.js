// src/utils/convertYouTubeUrl.js

/**
 * Converts a standard or shortened YouTube URL to the embed format.
 *
 * @param {string} url - The original YouTube URL.
 * @returns {string} - The converted embed URL or the original URL if conversion isn't possible.
 */
const convertYouTubeUrl = (url) => {
    try {
      const urlObj = new URL(url);
  
      // Check if the hostname is YouTube
      if (
        urlObj.hostname === 'www.youtube.com' ||
        urlObj.hostname === 'youtube.com' ||
        urlObj.hostname === 'youtu.be'
      ) {
        let videoId = '';
  
        // Handle different YouTube URL formats
        if (urlObj.hostname === 'youtu.be') {
          // Shortened URL: https://youtu.be/VIDEO_ID
          videoId = urlObj.pathname.slice(1);
        } else if (urlObj.pathname === '/watch') {
          // Standard URL: https://www.youtube.com/watch?v=VIDEO_ID
          videoId = urlObj.searchParams.get('v');
        } else if (urlObj.pathname.startsWith('/embed/')) {
          // Already an embed URL: https://www.youtube.com/embed/VIDEO_ID
          return url; // No conversion needed
        }
  
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
  
      // If not a YouTube URL or already embed, return the original URL
      return url;
    } catch (error) {
      console.error('Invalid URL:', url);
      return url;
    }
  };
  
  export default convertYouTubeUrl;
  