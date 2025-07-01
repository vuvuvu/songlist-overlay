/**
 * Minimal StreamerSongList Overlay - Essential functionality only
 */

// Configuration
const apiUrl = "https://api.streamersonglist.com/v1/";
const streamerName = "belleune";
const maxQueueItems = 10;
const queueEmptyMessage = "Queue is empty";
const cycleInterval = 8000; // 8 seconds to allow for sequential flying animations

// State
let streamerId = null;
let socket = null;
let currentQueue = [];
let currentCycleIndex = 1; // Start at 1 to skip the current song
let cycleTimer = null;

// Initialize when page loads
$(function () {
  fetchStreamerId().then(() => {
    updateQueue();
    initializeWebSocket();
  }).catch(error => {
    console.error("Failed to initialize:", error);
    $("#queue-wrapper").html(`<div class="error">Error: ${error.message}</div>`);
  });
});

/**
 * Fetch streamer ID from API
 */
function fetchStreamerId() {
  return new Promise((resolve, reject) => {
    const url = `${apiUrl}streamers/${encodeURIComponent(streamerName.toLowerCase())}`;
    
    $.ajax({
      url: url,
      success: function(data) {
        if (data && data.id) {
          streamerId = data.id;
          console.log(`Connected to streamer: ${data.displayName || streamerName} (ID: ${data.id})`);
          resolve(data.id);
        } else {
          reject(new Error(`Invalid response for streamer: ${streamerName}`));
        }
      },
      error: function(jqXHR) {
        if (jqXHR.status === 404) {
          reject(new Error(`Streamer '${streamerName}' not found`));
        } else {
          reject(new Error(`API error: ${jqXHR.status}`));
        }
      }
    });
  });
}

/**
 * Initialize WebSocket connection
 */
function initializeWebSocket() {
  if (!streamerId) return;
  
  socket = io("https://api.streamersonglist.com");
  
  socket.on("connect", () => {
    console.log("WebSocket connected");
    socket.emit("join-room", streamerId.toString());
  });
  
  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });
  
  // Queue update events
  socket.on("queue-update", updateQueue);
  socket.on("reload-song-list", updateQueue);
  socket.on("new-song", updateQueue);
  socket.on("update-song", updateQueue);
  socket.on("delete-song", updateQueue);
}

/**
 * Fetch and display queue
 */
function updateQueue() {
  if (!streamerId) return;
  
  const queueUrl = `${apiUrl}streamers/${streamerId}/queue`;
  
  $.ajax({
    url: queueUrl,
    success: function(data) {
      displayQueue(data.list || []);
    },
    error: function(jqXHR) {
      console.error("Queue fetch error:", jqXHR.status);
      $("#queue-wrapper").html(`<div class="error">Failed to load queue</div>`);
    }
  });
}

/**
 * Display queue in DOM with current song always visible and cycling animation
 */
function displayQueue(queueList) {
  const wrapper = $("#queue-wrapper");
  
  if (queueList.length === 0) {
    wrapper.html(`<div class="empty-queue">${queueEmptyMessage}</div>`);
    stopCycling();
    return;
  }
  
  // Sort by position
  queueList.sort((a, b) => a.position - b.position);
  currentQueue = queueList.slice(0, maxQueueItems);
  
  // Clear existing content
  wrapper.empty();
  
  // Create containers for current song and cycling queue
  wrapper.html(`
    <div id="current-song-container" class="current-song-fixed"></div>
    <div id="cycling-queue-container" class="cycling-queue"></div>
  `);
  
  // Display current song (always visible)
  if (currentQueue.length > 0) {
    displayCurrentSong(currentQueue[0]);
  }
  
  // Start cycling through remaining songs
  if (currentQueue.length > 1) {
    startCycling();
  } else {
    stopCycling();
  }
  
  console.log(`Queue updated: ${queueList.length} songs`);
}

/**
 * Display the current song (always visible)
 */
function displayCurrentSong(song) {
  const container = $("#current-song-container");
  container.html(`
    <div class="current-song">
      <div class="song-position current">${song.position}</div>
      <div class="current-song-info">
        <div class="song-title current">${song.song.title || 'Unknown'}</div>
        <div class="song-artist current">${song.song.artist || 'Unknown Artist'}</div>
        <div class="song-requester current">Requested by: ${(song.requests && song.requests[0] && song.requests[0].name) || 'Anonymous'}</div>
      </div>
    </div>
  `);
}

/**
 * Start cycling through queue items - shows 2-3 songs with rolling effect
 */
function startCycling() {
  stopCycling(); // Clear any existing timer
  
  if (currentQueue.length <= 1) return;
  
  currentCycleIndex = 1; // Start with second song
  displayCyclingSongs();
  
  cycleTimer = setInterval(() => {
    rollQueue();
  }, cycleInterval);
}

/**
 * Stop cycling animation
 */
function stopCycling() {
  if (cycleTimer) {
    clearInterval(cycleTimer);
    cycleTimer = null;
  }
}

/**
 * Display songs one at a time until stack of 3 is built
 */
function displayCyclingSongs() {
  const container = $("#cycling-queue-container");
  const maxVisible = Math.min(3, currentQueue.length - 1); // Show up to 3 songs, excluding current
  
  container.empty();
  
  // Add songs one by one with delays
  for (let i = 0; i < maxVisible; i++) {
    const songIndex = (currentCycleIndex + i) % (currentQueue.length - 1) + 1; // Skip index 0 (current song)
    const song = currentQueue[songIndex];
    
    if (song) {
      setTimeout(() => {
        const songDiv = $(`
          <div class="cycling-song fade-in">
            <div class="song-position queue">${song.position}</div>
            <div class="queue-song-info">
              <div class="song-title queue">${song.song.title || 'Unknown'}</div>
              <div class="song-artist queue">${song.song.artist || 'Unknown Artist'}</div>
              <div class="song-requester queue">Requested by: ${(song.requests && song.requests[0] && song.requests[0].name) || 'Anonymous'}</div>
            </div>
          </div>
        `);
        
        container.append(songDiv);
      }, i * 400); // 400ms delay between each song
    }
  }
}

/**
 * Roll the queue - animate out all songs simultaneously, then build new stack
 */
function rollQueue() {
  if (currentQueue.length <= 1) return;
  
  const container = $("#cycling-queue-container");
  const currentSongs = container.children();
  
  // Animate out all current songs simultaneously
  currentSongs.addClass('fade-out');
  
  setTimeout(() => {
    // Update cycle index
    currentCycleIndex++;
    if (currentCycleIndex >= currentQueue.length) {
      currentCycleIndex = 1; // Reset to second song
    }
    
    // Display new set of songs (they will fly in one by one)
    displayCyclingSongs();
  }, 600); // Timeout to match the flip animation duration
}
