/**
 * Converts a standard or shortened YouTube URL to the embed format.
 *
 * @param {string} url - The original YouTube URL.
 * @returns {string|null} - The converted embed URL or null if conversion isn't possible.
 */
const convertYouTubeUrl = (url) => {
  if (!url) {
    console.warn('convertYouTubeUrl called with null or undefined URL');
    return null; // Return null to indicate invalid URL
  }

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
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.pathname === '/watch') {
        videoId = urlObj.searchParams.get('v');
      } else if (urlObj.pathname.startsWith('/embed/')) {
        return url;
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // If not a YouTube URL or already embed, return null
    console.warn('convertYouTubeUrl received a non-YouTube or unsupported URL:', url);
    return null;
  } catch (error) {
    console.error('Invalid URL:', url, error);
    return null; // Return null to indicate invalid URL
  }
};

export default convertYouTubeUrl;