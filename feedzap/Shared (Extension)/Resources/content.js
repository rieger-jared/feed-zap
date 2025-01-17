console.log("loaded content.js");

const siteMap = {
  x: ["x.com", "twitter.com"],
  linkedin: ["www.linkedin.com"],
  reddit: ["www.reddit.com"],
  facebook: ["www.facebook.com"],
  facebook_mobile: ["m.facebook.com"],
  instagram: ["www.instagram.com"],
  tiktok: ["www.tiktok.com"],
  youtube: ["www.youtube.com"],
  youtube_mobile: ["m.youtube.com"],
};

const siteFeedSelectors = {
  x: [
    '[aria-label="Timeline: Your Home Timeline"]',
    '[aria-label="Home"]',
    '[aria-label="Trending"]',
    '[aria-label="New posts are available. Push the full stop key to go to them."]',
  ],
  linkedin: [
    '[aria-label="Main Feed"]',
    '[aria-label="LinkedIn News"]',
    '[id="app-container"]',
  ],
  reddit: [
    "main",
    '[class="masthead w-full"]',
    '[id="right-sidebar-container"]',
  ],
  facebook: ['[aria-label="Stories"]', '[role="main"]'],
  facebook_mobile: ['[id="screen-root"]'],
  instagram: ['[role="main"]', '[role="contentinfo"]'],
  tiktok: [
    '[id="main-content-explore_page"]',
    '[id="main-content-homepage_hot"]',
    '[data-e2e="nav-foryou"]',
    '[data-e2e="nav-explore"]',
    '[data-e2e="nav-following"]',
    '[data-e2e="nav-live"]',
    '[data-e2e="video-card"]',
    '[id="tiktok-webapp-mobile-player-container"]',
  ],
  youtube: [
    '[page-subtype="home"]',
    '[id="secondary"]',
    '[title="Home"]',
    '[title="Shorts"]',
    '[title="Subscriptions"]',
  ],
  youtube_mobile: ['[class="page-container"]'],
};

function hideFeed() {
  const domain = location.hostname;
  let site;
  for (const key in siteMap) {
    if (siteMap[key].includes(domain)) {
      site = key;
      break;
    }
  }
  const selectors = siteFeedSelectors[site];
  for (const selector of selectors) {
    hideElement(selector);
  }
}

function hideElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.remove();
  }
  // else {
  //   console.log("Could not find element with selector", selector);
  // }
}

// Retry mechanism
function retryHideFeed(attempts = 10, interval = 500) {
  let count = 0;
  const retry = setInterval(() => {
    hideFeed();
    count++;
    if (count >= attempts) {
      clearInterval(retry);
    }
  }, interval);
}

// Run on every possible event
["load", "DOMContentLoaded", "readystatechange"].forEach((event) => {
  window.addEventListener(event, () => retryHideFeed());
});

// Initial attempts
hideFeed();

// URL change detection with retry
let lastUrl = location.href;
setInterval(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    hideFeed();
  }
}, 500);

// Safari-specific: try to catch when tabs become active
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    hideFeed();
  }
});

// Additional Safari event
if (typeof safari !== "undefined") {
  window.addEventListener("pageshow", () => hideFeed());
}
