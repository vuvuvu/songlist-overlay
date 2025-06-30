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

  // Set up WebSocket connection with enhanced event handling.
  const socket = io("https://api.streamersonglist.com");

  socket.on("connect", () => {
    console.log("Connected to StreamerSongList WebSocket");
    isConnected = true;
    socket.emit("join-room", `${streamerId}`);
    $("#connection-status").text("Connected").removeClass("disconnected").addClass("connected");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from StreamerSongList WebSocket");
    isConnected = false;
    $("#connection-status").text("Disconnected").removeClass("connected").addClass("disconnected");
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
});

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

  // Rotate through the songs in the queue with flip animations.
  const rotateSongs = () => {
    if (displayQueue.length === 0) return;

    // Exit current song with flip animation
    const currentContainer = $("#queue-wrapper .song-container");
    if (currentContainer.length > 0) {
      currentContainer.removeClass("static entering").addClass("exiting");

      setTimeout(() => {
        // Enter new song after exit animation
        const song = displayQueue[currentIndex];
        const songDiv = createSongDiv(song.song, currentIndex + 1, displayQueue.length);
        $("#queue-wrapper").html(songDiv);

        // Add entering animation
        setTimeout(() => {
          $("#queue-wrapper .song-container").addClass("entering");

          // Set to static after entering animation
          setTimeout(() => {
            $("#queue-wrapper .song-container").removeClass("entering").addClass("static");
          }, 1000);
        }, 50);

        currentIndex = (currentIndex + 1) % displayQueue.length;
      }, 800);
    } else {
      // First song - just enter
      const song = displayQueue[currentIndex];
      const songDiv = createSongDiv(song.song, currentIndex + 1, displayQueue.length);
      $("#queue-wrapper").html(songDiv);

      setTimeout(() => {
        $("#queue-wrapper .song-container").addClass("entering");
        setTimeout(() => {
          $("#queue-wrapper .song-container").removeClass("entering").addClass("static");
        }, 1000);
      }, 50);

      currentIndex = (currentIndex + 1) % displayQueue.length;
    }
  };

  // Initial call and set interval for rotation.
  rotateSongs();
  if (displayQueue.length > 1) {
    rotationInterval = setInterval(rotateSongs, rotationSpeed + 1800); // Add time for animations
  }

  // Show "more" indicator if there are additional songs
  if (showMore && queuePosition.length > maxQueueItems && maxQueueItems > 0) {
    const moreCount = queuePosition.length - maxQueueItems;
    setTimeout(() => {
      $("#queue-info").append(`<div class="more-indicator">+${moreCount} more in queue</div>`);
    }, 100);
  }
}



function createSongDiv(song, position, totalSongs) {
  const artist = allCaps ? song.artist.toUpperCase() : song.artist;
  const title = allCaps ? song.title.toUpperCase() : song.title;
  const requestedBy = song.requests && song.requests.length > 0 ? song.requests[0].name : 'Unknown';
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

  // Add song limit information if enabled
  if (showSongLimit !== 'no') {
    // This would require an additional API call to get limit info
    // For now, we'll add a placeholder that can be updated
    infoHtml += `<div class="song-limit" id="song-limit-display"></div>`;
  }

  infoHtml += `<div class="connection-status" id="connection-status">Connecting...</div></div>`;
  $("body").prepend(infoHtml);
}

// Function to show temporary notifications
function showNotification(message) {
  const notification = `<div class="notification">${message}</div>`;
  $("body").append(notification);

  // Animate in
  $(".notification").last().addClass("show");

  // Remove after 3 seconds
  setTimeout(() => {
    $(".notification").last().removeClass("show");
    setTimeout(() => {
      $(".notification").last().remove();
    }, 500);
  }, 3000);
}

// Function to handle song limit data
function updateSongLimitSuccess(data) {
  if (!data || showSongLimit === 'no') return;

  const songLimit = data.songLimit || 0;
  const playedToday = data.playedToday || 0;

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
  $("#song-limit-display").text(limitText);
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

