let hasUserInteracted = false;

function initMedia() {
  console.log("initMedia called");
  const backgroundMusic = document.getElementById('background-music');
  const backgroundVideo = document.getElementById('background');
  if (!backgroundMusic || !backgroundVideo) {
    console.error("Media elements not found");
    return;
  }
  backgroundMusic.volume = 0.3;
  backgroundVideo.muted = true;


  backgroundVideo.play().catch(err => {
    console.error("Failed to play background video:", err);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const startText = document.getElementById('start-text');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const visitorCountEl = document.getElementById('visitor-count');
  const backgroundMusic = document.getElementById('background-music');
  const hackerMusic = document.getElementById('hacker-music');
  const rainMusic = document.getElementById('rain-music');
  const animeMusic = document.getElementById('anime-music');
  const carMusic = document.getElementById('car-music');
  const homeButton = document.getElementById('cox-theme');
  const resultsButtonContainer = document.getElementById('results-button-container');
  const resultsButton = document.getElementById('results-theme');
  const volumeIcon = document.getElementById('volume-icon');
  const backgroundVideo = document.getElementById('background');
  const hackerOverlay = document.getElementById('hacker-overlay');
  const snowOverlay = document.getElementById('snow-overlay');
  const glitchOverlay = document.querySelector('.glitch-overlay');
  const profileBlock = document.getElementById('profile-block');
  const skillsBlock = document.getElementById('skills-block');
  const musicPlayer = document.getElementById('music-player');
  const pythonBar = document.getElementById('python-bar');
  const cppBar = document.getElementById('cpp-bar');
  const csharpBar = document.getElementById('csharp-bar');
  const resultsHint = document.getElementById('results-hint');
  const profilePicture = document.querySelector('.profile-picture');
  const profileContainer = document.querySelector('.profile-container');
  const socialIcons = document.querySelectorAll('.social-icon');
  const badges = document.querySelectorAll('.badge');


  const cursor = document.querySelector('.custom-cursor');
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (isTouchDevice) {
    document.body.classList.add('touch-device');

    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      cursor.style.left = touch.clientX + 'px';
      cursor.style.top = touch.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      cursor.style.left = touch.clientX + 'px';
      cursor.style.top = touch.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('touchend', () => {
      cursor.style.display = 'none';
    });
  } else {

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'scale(0.8) translate(-50%, -50%)';
    });

    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'scale(1) translate(-50%, -50%)';
    });
  }


  const startMessage = "see more  /ᐠ - ˕ -マ";
  let startTextContent = '';
  let startIndex = 0;
  let startCursorVisible = false;

  function typeWriterStart() {
    startText.textContent = startMessage;
  }






  async function updateVisitorCount() {
    try {
      if (visitorCountEl) {
        visitorCountEl.textContent = '6,969';
      }
      console.log('');
    } catch (err) {
      console.error(err);
    }
  }

  updateVisitorCount();




  startScreen.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    backgroundMusic.muted = false;
    backgroundMusic.play().catch(err => {
      console.error("Failed to play music after start screen click:", err);
    });
    isPlaying = true;
    updatePlayPauseIcon();
    updateMusicDisplay('No More', 'Russ', 'assets/russ-no-more-cover.jpg');
    profileBlock.classList.remove('hidden');
    gsap.fromTo(profileBlock,
      { opacity: 0, y: -50 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
          profileBlock.classList.add('profile-appear');
          profileContainer.classList.add('orbit');
        }
      }
    );
    if (!isTouchDevice) {
      try {
        cursorTrailEffect();
        console.log("Cursor trail initialized");
      } catch (err) {
        console.error("Failed to initialize cursor trail effect:", err);
      }
    }
    typeWriterName();
    typeWriterBio();
  });

  startScreen.addEventListener('touchstart', async (e) => {
    e.preventDefault();
    try {
      await backgroundMusic.play();
      backgroundMusic.muted = false;
      console.log("Music playback allowed!");
    } catch (err) {
      console.error("Playback blocked:", err);
      return;
    }

    startScreen.classList.add('hidden');
    isPlaying = true;
    updatePlayPauseIcon();
    updateMusicDisplay('No More', 'Russ', 'assets/russ-no-more-cover.jpg');

    profileBlock.classList.remove('hidden');
    gsap.fromTo(profileBlock, { opacity: 0, y: -50 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power2.out',
      onComplete: () => {
        profileBlock.classList.add('profile-appear');
        profileContainer.classList.add('orbit');
      }
    });

    if (!isTouchDevice) {
      try { cursorTrailEffect(); } catch (e) { }
    }

    typeWriterName();
    typeWriterBio();
  });


  const inviteCode = "9G6JaTv";

  async function loadDiscordWidget() {
    try {
      const res = await fetch(`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`);
      const data = await res.json();

      const iconUrl = data.guild.icon
        ? `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png?size=128`
        : "https://via.placeholder.com/128";

      document.querySelector("#discord-widget img").src = iconUrl;
      document.querySelector(".server-name").textContent = data.guild.name;
      document.querySelector(".online-count .count-text").textContent = `${data.approximate_presence_count || 0} Online`;
      document.querySelector(".total-count .count-text").textContent = `${data.approximate_member_count || 0} Members`;
      document.querySelector(".discord-join").href = `https://discord.gg/${inviteCode}`;

    } catch (err) {
      console.error("Failed to load Discord widget:", err);
    }
  }

  loadDiscordWidget();

  function cursorTrailEffect() {
    const cursor = document.querySelector('.custom-cursor');
    const trailContainer = document.querySelector('.cursor-trail');

    if (!cursor || !trailContainer) {
      console.error("Cursor or trail container not found!");
      return;
    }

    const trailElements = [];
    const trailLength = 8;
    const trailSpacing = 0.2;

    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement('div');
      dot.classList.add('cursor-trail-dot');
      trailContainer.appendChild(dot);
      trailElements.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    function animateTrail() {
      let x = mouseX;
      let y = mouseY;

      trailElements.forEach((dot) => {
        dot.x += (x - dot.x) * trailSpacing;
        dot.y += (y - dot.y) * trailSpacing;
        dot.el.style.left = dot.x + 'px';
        dot.el.style.top = dot.y + 'px';

        x = dot.x;
        y = dot.y;
      });

      requestAnimationFrame(animateTrail);
    }

    animateTrail();
  }

  if (!isTouchDevice) {
    try {
      cursorTrailEffect();
      console.log("Cursor trail initialized");
    } catch (err) {
      console.error("Failed to initialize cursor trail effect:", err);
    }
  }


  const name = "✦ cox";
  let nameText = '';
  let nameIndex = 0;
  let isNameDeleting = false;
  let nameCursorVisible = false;

  function typeWriterName() {

    profileName.textContent = name;

    if (Math.random() < 0.1) {
      profileName.classList.add('glitch');
      setTimeout(() => profileName.classList.remove('glitch'), 200);
    }

    setTimeout(typeWriterName, 300);
  }


  const bioMessages = [
    `Sometimes being lost is the only way to find yourself.
	Born to die - Mentally Exhausted`
  ];
  let bioText = '';
  let bioIndex = 0;
  let bioMessageIndex = 0;
  let isBioDeleting = false;
  let bioCursorVisible = true;

  function typeWriterBio() {

    const fullText = bioMessages[bioMessageIndex];
    profileBio.textContent = fullText;

    if (Math.random() < 0.1) {
      profileBio.classList.add('glitch');
      setTimeout(() => profileBio.classList.remove('glitch'), 200);
    }

    if (!typeWriterBio.lastSwitchTime) {
      typeWriterBio.lastSwitchTime = Date.now();
    }

    if (Date.now() - typeWriterBio.lastSwitchTime >= 2000) {
      bioMessageIndex = (bioMessageIndex + 1) % bioMessages.length;
      typeWriterBio.lastSwitchTime = Date.now();
    }

    setTimeout(typeWriterBio, 150);
  }



  let currentAudio = backgroundMusic;
  let isPlaying = false;
  let isMuted = false;

  const playPauseBtn = document.getElementById("play-pause-btn");
  const playPauseIcon = document.getElementById("play-pause-icon");
  const stopBtn = document.getElementById("stop-btn");
  const volumeSlider = document.getElementById("volume-slider");
  const seekSlider = document.getElementById("seek-slider");

  function updatePlayPauseIcon() {
    playPauseIcon.setAttribute("d",
      isPlaying ?
        "M6 4h4v16H6zm8 0h4v16h-4z" :
        "M5 3v18l15-9-15-9z"
    );
  }

  function togglePlayPause() {
    if (isPlaying) {
      currentAudio.pause();
    } else {
      currentAudio.play().catch(console.error);
    }
    isPlaying = !isPlaying;
    updatePlayPauseIcon();
  }

  function stopMusic() {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    isPlaying = false;
    updatePlayPauseIcon();
  }

  function updateMusicDisplay(trackTitle, artistName, coverArtUrl) {
    document.getElementById('track-title').textContent = trackTitle;
    document.getElementById('track-artist').textContent = artistName;
    document.getElementById('track-cover').src = coverArtUrl;
  }

  volumeSlider.addEventListener('input', () => {
    currentAudio.volume = volumeSlider.value;
  });

  currentAudio.addEventListener("timeupdate", () => {
    if (currentAudio.duration)
      seekSlider.value = (currentAudio.currentTime / currentAudio.duration) * 100;
  });

  seekSlider.addEventListener("input", () => {
    currentAudio.currentTime = (seekSlider.value / 100) * currentAudio.duration;
  });

  playPauseBtn.onclick = togglePlayPause;
  stopBtn.onclick = stopMusic;




  function switchTheme(videoSrc, audio, themeClass, overlay = null, overlayOverProfile = false) {
    let primaryColor;
    switch (themeClass) {
      case 'cox-theme':
        primaryColor = '#00CED1';
        break;
    }
    document.documentElement.style.setProperty('--primary-color', primaryColor);

    gsap.to(backgroundVideo, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        backgroundVideo.src = videoSrc;

        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        currentAudio = audio;
        currentAudio.volume = volumeSlider.value;
        currentAudio.muted = isMuted;
        currentAudio.play().catch(err => console.error("Failed to play theme music:", err));

        document.body.classList.remove('cox-theme');
        document.body.classList.add(themeClass);

        hackerOverlay.classList.add('hidden');
        snowOverlay.classList.add('hidden');
        profileBlock.style.zIndex = overlayOverProfile ? 10 : 20;
        skillsBlock.style.zIndex = overlayOverProfile ? 10 : 20;
        if (overlay) {
          overlay.classList.remove('hidden');
        }

        if (themeClass === 'hacker-theme') {
          resultsButtonContainer.classList.remove('hidden');
        } else {
          resultsButtonContainer.classList.add('hidden');
          skillsBlock.classList.add('hidden');
          resultsHint.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.to(profileBlock, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
        }

        gsap.to(backgroundVideo, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            profileContainer.classList.remove('orbit');
            void profileContainer.offsetWidth;
            profileContainer.classList.add('orbit');
          }
        });
      }
    });
  }




  function handleTilt(e, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let clientX, clientY;

    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mouseX = clientX - centerX;
    const mouseY = clientY - centerY;

    const maxTilt = 15;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    gsap.to(element, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  }

  profileBlock.addEventListener('mousemove', (e) => handleTilt(e, profileBlock));
  profileBlock.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleTilt(e, profileBlock);
  });

  skillsBlock.addEventListener('mousemove', (e) => handleTilt(e, skillsBlock));
  skillsBlock.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleTilt(e, skillsBlock);
  });

  profileBlock.addEventListener('mouseleave', () => {
    gsap.to(profileBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  profileBlock.addEventListener('touchend', () => {
    gsap.to(profileBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  skillsBlock.addEventListener('mouseleave', () => {
    gsap.to(skillsBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  skillsBlock.addEventListener('touchend', () => {
    gsap.to(skillsBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  musicPlayer.addEventListener('mousemove', (e) => handleTilt(e, musicPlayer));
  musicPlayer.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleTilt(e, musicPlayer);
  });

  musicPlayer.addEventListener('mouseleave', () => {
    gsap.to(musicPlayer, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  musicPlayer.addEventListener('touchend', () => {
    gsap.to(musicPlayer, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });


  profilePicture.addEventListener('mouseenter', () => {
    glitchOverlay.style.opacity = '1';
    setTimeout(() => {
      glitchOverlay.style.opacity = '0';
    }, 500);
  });


  profilePicture.addEventListener('click', () => {
    profileContainer.classList.remove('fast-orbit');
    profileContainer.classList.remove('orbit');
    void profileContainer.offsetWidth;
    profileContainer.classList.add('fast-orbit');
    setTimeout(() => {
      profileContainer.classList.remove('fast-orbit');
      void profileContainer.offsetWidth;
      profileContainer.classList.add('orbit');
    }, 500);
  });

  profilePicture.addEventListener('touchstart', (e) => {
    e.preventDefault();
    profileContainer.classList.remove('fast-orbit');
    profileContainer.classList.remove('orbit');
    void profileContainer.offsetWidth;
    profileContainer.classList.add('fast-orbit');
    setTimeout(() => {
      profileContainer.classList.remove('fast-orbit');
      void profileContainer.offsetWidth;
      profileContainer.classList.add('orbit');
    }, 500);
  });


  let isShowingSkills = false;
  resultsButton.addEventListener('click', () => {
    if (!isShowingSkills) {
      gsap.to(profileBlock, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          profileBlock.classList.add('hidden');
          skillsBlock.classList.remove('hidden');
          gsap.fromTo(skillsBlock,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
          gsap.to(pythonBar, { width: '87%', duration: 2, ease: 'power2.out' });
          gsap.to(cppBar, { width: '75%', duration: 2, ease: 'power2.out' });
          gsap.to(csharpBar, { width: '80%', duration: 2, ease: 'power2.out' });
        }
      });
      resultsHint.classList.remove('hidden');
      isShowingSkills = true;
    } else {
      gsap.to(skillsBlock, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          skillsBlock.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.fromTo(profileBlock,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
        }
      });
      resultsHint.classList.add('hidden');
      isShowingSkills = false;
    }
  });

  resultsButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (!isShowingSkills) {
      gsap.to(profileBlock, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          profileBlock.classList.add('hidden');
          skillsBlock.classList.remove('hidden');
          gsap.fromTo(skillsBlock,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
          gsap.to(pythonBar, { width: '87%', duration: 2, ease: 'power2.out' });
          gsap.to(cppBar, { width: '75%', duration: 2, ease: 'power2.out' });
          gsap.to(csharpBar, { width: '80%', duration: 2, ease: 'power2.out' });
        }
      });
      resultsHint.classList.remove('hidden');
      isShowingSkills = true;
    } else {
      gsap.to(skillsBlock, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          skillsBlock.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.fromTo(profileBlock,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
        }
      });
      resultsHint.classList.add('hidden');
      isShowingSkills = false;
    }
  });


  typeWriterStart();
});