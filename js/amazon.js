// js/amazon.js
function updateAmazonLinks() {
    document.querySelectorAll('a[href*="amazon.com"]').forEach(link => {
      try {
        let url = new URL(link.href);
        let params = url.searchParams;
        if (params.has('tag')) {
          params.set('tag', 'serpextension-20');
        } else {
          params.append('tag', 'serpextension-20');
        }
        link.href = url.toString();
      } catch (error) {
        console.error(`Failed to modify URL: ${link.href}`);
        console.error(error);
      }
    });
  }
  
  // Run updateAmazonLinks every 2 seconds
  setInterval(updateAmazonLinks, 2000);