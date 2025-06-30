/**
 * The endpoint for the API. You do not need to change this.
 */
const apiUrl = "https://api.streamersonglist.com/v1/";

/**
 * Replace this with the name you use on Twitch, using only lower case. This must also match the
 * name you have used to sign up with streamersonglist.com but this is automatic when you sign up
 * there.
 * 
 * For example, if your name on Twitch is "My_Cool_Name", you would enter "my_cool_name" here
 * (lower case).
 */
const streamerName = "belleune";

/**
 * Your streamer ID. This is the ID assigned by streamersonglist.com and not anything
 * associated with Twitch.
 */
const streamerId = 287;

/**
 * True will cause all text to appear in capitals. False will use upper and lower case.
 */
const allCaps = true;

/**
 * The maximum number of items that can show in the queue at once. Items beyond this will either
 * not show, or use a "+X more" label at the bottom of the list, depending on the "showMore"
 * setting.
 */
const maxQueueItems = 5;

/**
 * If there are more items in the queue than maxQueueItems, and this is set to true, a "+X more"
 * will be shown at the bottom of the queue.
 */
const showMore = true;

/**
 * The message that will be displayed when there are no items in the queue.
 */
const queueEmptyMessage = "Queue is empty";

/**
 * If set to something other than "no", will show the request limit current configured in Streamer Song List.
 * 
 * There are two possible values you could use here:
 * - "maximum" will show the total number of requests allowed for this stream, as set by your "Song Limit" in the
 *   Streamer Song List queue settings.
 * - "remaining" will show the number of requests that are remaining, which is the maximum minus the number that
 *   have already been played.
 */
const showSongLimit = 'remaining';

/**
 * If showSongLimit is "maximum", this controls the message that will appear on the screen. The # will be replaced by
 * the maximum number of requests, and plurals (request/requests) will be handled automatically.
 */
const songLimitMaximumMessage = "# request allowed today!";

/**
 * If showSongLimit is "remaining", this controls the message that will appear on the screen. The # will be replaced
 * by the remaining number of requests, and plurals (request/requests) will be handled automatically.
 */
const songLimitRemainingMessage = "# request remaining!";

/**
 * The speed at which the songs in the queue will rotate, in milliseconds. For example, 5000
 * means that the song will change every 5 seconds.
 */
const rotationSpeed = 5000;

/**
 * Set up classes for visual style based on allCaps above.
 */
const artistClass = allCaps ? "artist caps" : "artist";
const titleClass = allCaps ? "title caps" : "title";
const moreClass = allCaps ? "more caps" : "more";
const limitClass = allCaps ? "limit caps" : "limit";

// Global variables for managing intervals and state
let rotationInterval = null;
let currentQueue = [];
let currentIndex = 0;
let isConnected = false;

$(function () {
  // Initialize profile system
  initializeProfileSystem();
  
  // Initialise with first API call.
  $("body").updateQueue();

  // Set up WebSocket connection - use polling only to avoid version incompatibility
  let socket = null;
  
  try {
    socket = io("https://api.streamersonglist.com", {
      transports: ['polling'], // Use only polling to avoid WebSocket version issues
      upgrade: false, // Don't upgrade to WebSocket
      timeout: 10000,
      forceNew: true,
      autoConnect: true,
      reconnection: false // Disable reconnection to avoid errors
    });
  } catch (error) {
    console.warn("WebSocket setup failed, using API polling only:", error);
    socket = null;
    isConnected = false;
  }
  
  if (socket) {
    socket.on("connect", () => {
    console.log("Connected to StreamerSongList WebSocket");
    isConnected = true;
    socket.emit("join-room", `${streamerId}`);
    updateConnectionStatus("Connected", true);
    console.log(`Joined room: ${streamerId}`);
    
    // Start heartbeat when connected
    heartbeatInterval = setInterval(() => {
      if (socket.connected) {
        socket.emit('ping'); // Send ping to keep connection alive
        console.log('Heartbeat ping sent');
      }
    }, 30000); // Send heartbeat every 30 seconds
  });

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected from StreamerSongList WebSocket: ${reason}`);
    isConnected = false;
    updateConnectionStatus("Disconnected", false);
    
    // Clear heartbeat when disconnected
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
  });

  socket.on("connect_error", (error) => {
    console.error("WebSocket connection error:", error);
    isConnected = false;
    updateConnectionStatus("Connection Error", false);
  });

  socket.on("reconnect", (attemptNumber) => {
    console.log(`Reconnected to WebSocket (attempt ${attemptNumber})`);
    isConnected = true;
    updateConnectionStatus("Connected", true);
  });

  socket.on("reconnect_error", (error) => {
    console.error("Reconnection failed:", error);
  });

  socket.on("reconnect_failed", () => {
    console.error("All reconnection attempts failed");
    isConnected = false;
    updateConnectionStatus("Connection Failed", false);
  });

  socket.on("queue-update", () => {
    console.log("Queue updated via WebSocket");
    $("body").updateQueue();
  });

  socket.on("reload-song-list", () => {
    console.log("Song list reload requested via WebSocket");
    $("body").updateQueue();
  });

  socket.on("new-song", (data) => {
    console.log("New song added:", data);
    $("body").updateQueue();
    showNotification("New song added to queue!");
  });

  socket.on("delete-song", (data) => {
    console.log("Song removed:", data);
    $("body").updateQueue();
    showNotification("Song removed from queue");
  });

  socket.on("new-playhistory", (data) => {
    console.log("Song played:", data);
    showNotification("Now playing: " + (data.song ? data.song.title : "Unknown"));
  });
  
  } // Close if (socket) block
});

  // Heartbeat handlers are now consolidated above
  
  // Handle pong responses
  socket.on('pong', () => {
    console.log('Heartbeat pong received');
  });
  
  // Monitor connection health
  setInterval(() => {
    if (!socket.connected && !socket.connecting) {
      console.log('Connection lost, attempting manual reconnect...');
      socket.connect();
    }
  }, 10000); // Check every 10 seconds
});

function updateConnectionStatus(status, connected) {
  const statusEl = $("#connection-status");
  if (statusEl.length) {
    statusEl.text(status)
      .removeClass("connected disconnected")
      .addClass(connected ? "connected" : "disconnected");
  }
}

jQuery.fn.extend({
  updateQueue: function () {
    const url = apiUrl + "streamers/" + streamerName + "/queue";
    ajaxCall(url, updateQueueSuccess);

    // Also fetch song limits if enabled
    if (showSongLimit !== 'no') {
      const streamerUrl = apiUrl + "streamers/" + streamerName;
      ajaxCall(streamerUrl, updateSongLimitSuccess);
    }
  },
});

function ajaxCall(url, successCallback) {
  $.ajax({
    url: url,
    success: function (data) {
      successCallback(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error: " + errorThrown);
    },
  });
}

function updateQueueSuccess(data) {
  let queuePosition = data.list;

  // Sort queuePosition correctly.
  queuePosition.sort(function (a, b) {
    return a.position - b.position;
  });

  // Update global queue state
  currentQueue = queuePosition;
  currentIndex = 0;

  // Clear existing interval to prevent multiple timers
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }

  // Clear existing queue display.
  $("#queue-wrapper").empty();

  // Update queue count display
  updateQueueInfo(queuePosition.length);

  // If the queue is empty, display the empty queue message.
  if (queuePosition.length === 0) {
    const emptyText = allCaps ? queueEmptyMessage.toUpperCase() : queueEmptyMessage;
    const flipEmptyText = createFlipBoardText(emptyText);
    const emptyQueueDiv = `<div class="song-container">
        <div class="song-position">NO SONGS</div>
        <div class="song-text">${flipEmptyText}</div>
        <div class="song-artist">ADD SONGS TO GET STARTED!</div>
    </div>`;
    $("#queue-wrapper").html(emptyQueueDiv);

    // Add entering animation for empty message
    setTimeout(() => {
      $("#queue-wrapper .song-container").addClass("entering");
      setTimeout(() => {
        $("#queue-wrapper .song-container").removeClass("entering").addClass("static");
      }, 1000);
    }, 50);
    return;
  }

  // Apply maxQueueItems limit if set
  let displayQueue = queuePosition;
  if (maxQueueItems > 0 && queuePosition.length > maxQueueItems) {
    displayQueue = queuePosition.slice(0, maxQueueItems);
  }

  // Create song divs for all songs in the display queue
  displayQueue.forEach((song, index) => {
    const songDiv = createSongDiv(song, index + 1, displayQueue.length);
    $("#queue-wrapper").append(songDiv);
  });

  // Add "more" indicator if there are additional songs
  if (showMore && queuePosition.length > maxQueueItems) {
    const moreCount = queuePosition.length - maxQueueItems;
    const moreText = allCaps ? `+${moreCount} MORE IN QUEUE` : `+${moreCount} more in queue`;
    const moreDiv = `<div class="more-indicator">${moreText}</div>`;
    $("#queue-wrapper").append(moreDiv);
  }

  // Start rotation if there are multiple songs
  if (displayQueue.length > 1) {
    startQueueRotation(displayQueue);
  } else if (displayQueue.length === 1) {
    // Show the single song immediately
    $("#queue-wrapper .song-container").first().addClass("static");
  }
}

function createSongDiv(song, position, totalSongs) {
  // Safely handle potentially undefined values
  const artist = song.artist ? (allCaps ? song.artist.toUpperCase() : song.artist) : 'Unknown Artist';
  const title = song.title ? (allCaps ? song.title.toUpperCase() : song.title) : 'Unknown Title';
  
  // FIXED: Enhanced requester name detection for requests[0].name
  const requestedBy = getRequesterName(song);
  const displayRequestedBy = allCaps ? requestedBy.toUpperCase() : requestedBy;

  // Create flip-board effect for each line
  const flipTitle = createFlipBoardText(title);
  const flipArtist = createFlipBoardText(artist);
  const flipRequestedBy = createFlipBoardText(displayRequestedBy);

  const positionHtml = `<div class="song-position">POSITION ${position}/${totalSongs}</div>`;
  const titleHtml = `<div class="song-title">${flipTitle}</div>`;
  const artistHtml = `<div class="song-artist">BY ${flipArtist}</div>`;
  const requestedByHtml = `<div class="song-requester">REQUESTED BY ${flipRequestedBy}</div>`;

  return `<div class="song-container">
        ${positionHtml}
        ${titleHtml}
        ${artistHtml}
        ${requestedByHtml}
    </div>`;
}

// FIXED: Enhanced requester name detection function
function getRequesterName(song) {
  let requestedBy = 'Unknown';
  
  console.log('Detecting requester for song:', song.title);
  
  // Method 1: Check requests array with name field (CORRECT LOCATION)
  if (song.requests && Array.isArray(song.requests) && song.requests.length > 0) {
    const req = song.requests[0];
    console.log('Found requests array, first item:', req);
    
    if (req.name) {
      requestedBy = req.name;
      console.log('Found requester name:', requestedBy);
    } else if (req.username) {
      requestedBy = req.username;
    } else if (req.displayName) {
      requestedBy = req.displayName;
    } else if (typeof req === 'string') {
      requestedBy = req;
    }
  }
  // Method 2: Check direct name field (fallback)
  else if (song.name) {
    requestedBy = song.name;
  }
  // Method 3: Check requester object
  else if (song.requester) {
    if (typeof song.requester === 'string') {
      requestedBy = song.requester;
    } else if (song.requester.name) {
      requestedBy = song.requester.name;
    } else if (song.requester.username) {
      requestedBy = song.requester.username;
    }
  }
  // Method 4: Check other common fields
  else if (song.requestedBy) {
    requestedBy = song.requestedBy;
  } else if (song.user) {
    if (typeof song.user === 'string') {
      requestedBy = song.user;
    } else if (song.user.name) {
      requestedBy = song.user.name;
    }
  }
  
  // Clean up the name (remove extra whitespace, handle empty strings)
  if (requestedBy && typeof requestedBy === 'string') {
    requestedBy = requestedBy.trim();
    if (requestedBy === '') {
      requestedBy = 'Unknown';
    }
  }
  
  console.log('Final requester result:', requestedBy);
  return requestedBy;
}

// Create flip-board letter effect
function createFlipBoardText(text) {
  return text.split('').map((char, index) => {
    if (char === ' ') {
      return ' ';
    }
    const delay = index * 0.05; // Stagger the animation
    return `<span class="flip-segment" style="animation-delay: ${delay}s">${char}</span>`;
  }).join('');
}

// Helper function to update queue information display
function updateQueueInfo(queueLength) {
  let infoHtml = `<div id="queue-info"><div class="queue-count">Queue: ${queueLength} songs</div>`;

  // Add connection status
  const connectionStatus = isConnected ? "Connected" : "Disconnected";
  const connectionClass = isConnected ? "connected" : "disconnected";
  infoHtml += `<div id="connection-status" class="connection-status ${connectionClass}">${connectionStatus}</div>`;

  infoHtml += `</div>`;

  // Remove existing info and add new
  $("#queue-info").remove();
  $("#queue-wrapper").append(infoHtml);
}

function startQueueRotation(displayQueue) {
  if (rotationInterval) {
    clearInterval(rotationInterval);
  }

  // Show first song immediately
  showSongAtIndex(0, displayQueue);

  rotationInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % displayQueue.length;
    showSongAtIndex(currentIndex, displayQueue);
  }, rotationSpeed + 1000); // Add time for flip animation
}

function showSongAtIndex(index, displayQueue) {
  const containers = $("#queue-wrapper .song-container");
  
  // Hide all containers with exit animation
  containers.removeClass("static entering").addClass("exiting");
  
  setTimeout(() => {
    containers.hide().removeClass("exiting");
    
    // Show the selected container with enter animation
    const targetContainer = containers.eq(index);
    targetContainer.show().addClass("entering");
    
    setTimeout(() => {
      targetContainer.removeClass("entering").addClass("static");
    }, 1000);
  }, 800);
}

function showNotification(message) {
  // Remove existing notifications
  $(".notification").remove();
  
  const notification = $(`<div class="notification">${message}</div>`);
  $("#queue-wrapper").append(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.fadeOut(500, () => notification.remove());
  }, 3000);
}

function updateSongLimitSuccess(data) {
  if (!data || showSongLimit === 'no') return;

  const songLimit = data.songLimit || 0;
  const playedToday = data.playedToday || 0;

  // Only show if there's actually a song limit configured
  if (songLimit === 0) {
    $("#song-limit-display").hide();
    return;
  }

  let limitText = '';
  let limitNumber = 0;

  if (showSongLimit === 'maximum') {
    limitNumber = songLimit;
    limitText = songLimitMaximumMessage.replace('#', limitNumber);
  } else if (showSongLimit === 'remaining') {
    limitNumber = Math.max(0, songLimit - playedToday);
    limitText = songLimitRemainingMessage.replace('#', limitNumber);
  }

  // Handle pluralization
  if (limitNumber === 1) {
    limitText = limitText.replace('requests', 'request');
  } else {
    limitText = limitText.replace('request', 'requests');
  }

  // Update the display
  $("#song-limit-display").text(limitText).show();
}

/**
 * Initialize the profile system
 */
function initializeProfileSystem() {
  // Check if profiles.js is loaded
  if (typeof applyProfile === 'undefined') {
    console.warn('Profile system not available - profiles.js not loaded');
    return;
  }
  
  // Load saved profile from localStorage
  const savedProfile = localStorage.getItem('selectedProfile');
  
  if (savedProfile && getAllProfiles()[savedProfile]) {
    console.log(`Loading saved profile: ${savedProfile}`);
    applyProfile(savedProfile);
  } else {
    console.log('Using default profile: superhero');
    applyProfile('superhero');
  }
  
  // Add keyboard shortcut for profile selector (Ctrl+P)
  $(document).on('keydown', function(e) {
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      window.open('profile-selector.html', '_blank');
    }
  });
}