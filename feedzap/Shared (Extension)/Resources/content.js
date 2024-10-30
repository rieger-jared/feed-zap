console.log('content.js loaded');

// const siteMap = {
//   x: ['x.com', 'twitter.com'],
//   linkedin: ['linkedin.com'],
// };

// const siteFeedSelectors = {
//   x: ['[aria-label="Timeline: Your Home Timeline"]', '[aria-label="Home"]'],
//   linkedin: ['[aria-label="Main Feed"]'],
// };

// function getSiteFeedSelectors(site) {
//   switch (site) {
//     case 'x':
//       return siteFeedSelectors.x;
//     case 'linkedin':
//       return siteFeedSelectors.linkedin;
//     default:
//       return siteFeedSelectors.x;
//   }
// }

// function hideFeed() {
//   const domain = location.hostname;
//   console.log(domain);
//   const selectors = getSiteFeedSelectors(siteMap[domain]);
//   hideElement(selector);
// }

// function hideElement(selector) {
//   const element = document.querySelector(selector);
//   if (element) {
//     element.style.display = 'none';
//   }
// }

// // Retry mechanism
// function retryHideFeed(attempts = 10, interval = 500) {
//   let count = 0;
//   const retry = setInterval(() => {
//     hideFeed();
//     count++;
//     if (count >= attempts) {
//       clearInterval(retry);
//     }
//   }, interval);
// }

// // Run on every possible event
// ['load', 'DOMContentLoaded', 'readystatechange'].forEach((event) => {
//   window.addEventListener(event, () => retryHideFeed());
// });

// console.log('running');

// // Initial attempts
// hideFeed();
// retryHideFeed();

// // Watch for timeline and SPA navigation
// const observer = new MutationObserver(() => {
//   hideFeed();
// });

// // Start observing with more complete config
// observer.observe(document, {
//   childList: true,
//   subtree: true,
//   attributes: true,
//   characterData: true,
// });

// // URL change detection with retry
// let lastUrl = location.href;
// setInterval(() => {
//   const currentUrl = location.href;
//   if (currentUrl !== lastUrl) {
//     lastUrl = currentUrl;
//     retryHideFeed();
//   }
// }, 500);

// // Safari-specific: try to catch when tabs become active
// document.addEventListener('visibilitychange', () => {
//   if (!document.hidden) {
//     retryHideFeed();
//   }
// });

// // Additional Safari event
// if (typeof safari !== 'undefined') {
//   window.addEventListener('pageshow', () => retryHideFeed());
// }
