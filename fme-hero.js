<script>
  console.log('fme-hero.js script has loaded');
function initializeRiveAnimation(canvasId, riveFileUrl, artboardName, stateMachineNames) {
  const canvas = document.getElementById(canvasId);

  if (!canvas) {
    return;
  }

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  new rive.Rive({
    src: riveFileUrl,
    canvas: canvas,
    autoplay: true,
    artboard: artboardName,
    stateMachines: stateMachineNames,
    fit: rive.Fit.cover,
    maxDevicePixelRatio: window.devicePixelRatio || 1,
  });
}

// Function to wait for canvas elements to be in the DOM and then initialize
function waitForCanvasAndInitialize(canvasId, riveFileUrl, artboardName, stateMachineNames) {
  const initializeIfCanvasExists = () => {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
      initializeRiveAnimation(canvasId, riveFileUrl, artboardName, stateMachineNames);
    } else {
      requestAnimationFrame(initializeIfCanvasExists);
    }
  };
  initializeIfCanvasExists();
}

// Initialization calls for each animation

// Initialize the animation
waitForCanvasAndInitialize(
  "fme-hero",
  "https://cms.harness.io/riv/fme-main.riv",
  "ff-dark",
  ["SM"]
);
</script>
