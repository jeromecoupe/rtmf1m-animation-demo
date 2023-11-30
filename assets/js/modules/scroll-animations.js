// Fully commented script
// https://github.com/jeromecoupe/scrolltriggered_css_animations/

/**
 * Variables
 */
const animatedElements = document.querySelectorAll("[data-scrollanim]");
const pausedClass = "is-paused";
const threshold = 0.25;
const observerOptions = {
  root: null,
  threshold: threshold,
};

/**
 * Play animations by removing paused class
 * @param {Node} el - DOM node
 */
function playAnimations(el) {
  el.classList.remove(pausedClass);
}

/**
 * Add animation classes from data attribute
 * @param {Node} el - DOM node
 */
function addAnimationClasses(el) {
  let animationClass = el.dataset.scrollanim ?? "";
  let animationDelay = el.dataset.scrollanimDelay ?? "0s";
  el.classList.add(animationClass);
  el.style.animationDelay = animationDelay;
  el.classList.add(pausedClass);
}

/**
 * Handle intersections
 * This callback function is fired whenever the position of observed elements change
 * @param {ObserverEntries} observerEntries - RFID tag attached to elements
 * @param {Observer} observer - the observer instance
 */
function handleIntersections(observerEntries, observer) {
  observerEntries.forEach((entry) => {
    if (entry.intersectionRatio >= threshold) {
      observer.unobserve(entry.target);
    }
    if (entry.intersectionRatio < threshold) {
      addAnimationClasses(entry.target);
    }
    if (entry.isIntersecting) {
      playAnimations(entry.target);
      observer.unobserve(entry.target);
    }
  });
}

/**
 * Initiation
 * @returns Init
 */
function init() {
  // bail out if not supported
  if (!"IntersectionObserver" in window) return;

  // create instance
  let observer = new IntersectionObserver(handleIntersections, observerOptions);

  // attach an observer to each node
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

export { init };
