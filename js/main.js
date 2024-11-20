(() => {
  const menu = document.querySelector("#menu-overlay");
  const hamburger = document.querySelector("#hamburger");
  const closeButton = document.querySelector("#close");
  const menuLinks = document.querySelectorAll("#menu-overlay ul a"); 

  function toggleMenu() {
      menu.classList.toggle("open");
  }

  hamburger.addEventListener("click", toggleMenu);
  closeButton.addEventListener("click", toggleMenu);

  menuLinks.forEach(link => {
      link.addEventListener("click", toggleMenu);
  });
})();

(() => {
  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");

  function moveDivisor() {
    console.log(slider.value);
    divisor.style.width = `${slider.value}%`;
  }

  slider.addEventListener("input", moveDivisor);
})();

(() => {
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const infoBoxes = [
    {title: 'Precision Drivers', text: 'Built-in high-fidelity speakers deliver crystal-clear audio, immersing you in sound that’s as smooth as it is dynamic.', image: 'images/icon-01.svg'},
    {title: 'Touch Control', text: 'Effortless control at your fingertips—double-tap to change tracks or answer calls, making every interaction smooth and intuitive.', image: 'images/icon-02.svg'},
    {title: 'Feather-Light Feel', text: 'Designed for ultimate comfort, Fluff earbuds are ultra-light and softly contoured, so you barely notice you’re wearing them.', image: 'images/icon-02.svg'},
    {title: 'Ultra-Smooth Texture', text: 'Inspired by rock but crafted to feel soft and weightless, Fluff delivers a sensation of smooth elegance for all-day comfort.', image: 'images/icon-02.svg'},
    {title: 'Active Noise Reduction', text: 'Advanced noise isolation technology filters out external noise, letting you experience pure sound, undisturbed.', image: 'images/icon-05.svg'},
    {title: 'Bluetooth 5.3', text: 'Enjoy seamless connectivity and superior audio quality with the latest Bluetooth technology, designed for uninterrupted listening.', image: 'images/icon-06.svg'},
  ];

  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index+1}`);
      hotspotTitle = document.createElement('h2');
      hotspotTitle.textContent = infoBox.title;
      hotspotText = document.createElement('p');
      hotspotText.textContent = infoBox.text;
      hotspotImage = document.createElement('img');
      hotspotImage.src = infoBox.image;
      selected.appendChild(hotspotImage);
      selected.appendChild(hotspotTitle);
      selected.appendChild(hotspotText);
    });
  }

  function modelLoaded() {
    loadInfo();
  }

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();

(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from("#title-x-ray", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#title-x-ray",
      start: "top 90%",
      end: "top 20%",
      scrub: 3.5,
      markers: false
    }
  });
})();

(() => {
  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");

  canvas.width = 1920;
  canvas.height = 1080;

  const frameCount = 200;
  const images = [];

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/RockCaseOpen${(i+1).toString().padStart(4, '0')}.webp`;
    images.push(img);
  }
  const buds = {
    frame: 0
  };

  gsap.to(buds, {
    frame: 199,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 35,
      markers: false,
      start: " top top"
    },
    onUpdate: render
  });

  images[0].addEventListener("load", render);

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0);
  }
})();

(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({
    scrollTrigger: {
      trigger: "#title-hotspot",
      pin: true,
      scrub: true,
      start: "top top",
      end: "bottom top",
      markers: false
    }
  })
    .to("#title", {
      autoAlpha: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to("#details-text", {
      autoAlpha: 1,
      duration: 1,
      ease: "power2.out"
    }, 0.5);
})();
