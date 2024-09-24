<script>
  // Function to initialize Rive animations
  function initializeRiveAnimation(
    canvasId,
    riveFileUrl,
    artboardName,
    stateMachineNames,
    onLoadCallback
  ) {
    const canvas = document.getElementById(canvasId);

    if (!canvas) {
      return null;
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Create the Rive instance without the onLoad callback
    const riveInstance = new rive.Rive({
      src: riveFileUrl,
      canvas: canvas,
      autoplay: false, // Disable autoplay for now
      artboard: artboardName,
      stateMachines: stateMachineNames,
      fit: rive.Fit.cover,
      maxDevicePixelRatio: window.devicePixelRatio || 1,
    });

    // Set up the 'load' event listener on the riveInstance
    riveInstance.on("load", function () {
      if (onLoadCallback) {
        onLoadCallback(this); // 'this' refers to the riveInstance
      }
    });

    return riveInstance;
  }

  // Function to wait for canvas elements to be in the DOM and then initialize
  function waitForCanvasAndInitialize(
    canvasId,
    riveFileUrl,
    artboardName,
    stateMachineNames,
    callback
  ) {
    const initializeIfCanvasExists = () => {
      const canvas = document.getElementById(canvasId);
      if (canvas) {
        const riveInstance = initializeRiveAnimation(
          canvasId,
          riveFileUrl,
          artboardName,
          stateMachineNames,
          callback
        );
      } else {
        requestAnimationFrame(initializeIfCanvasExists);
      }
    };
    initializeIfCanvasExists();
  }

  // Initialization calls for each animation

  // Initialize the animation and force autoplay
  waitForCanvasAndInitialize(
    "fme-hero",
    "https://cms.harness.io/riv/fme-main.riv",
    "ff-dark",
    ["SM"],
    function (riveInstance) {
      // Play the state machine or animations
      riveInstance.play(); // This plays all animations and state machines

      // If you want to play a specific state machine or animation, you can specify:
      // riveInstance.play({ stateMachines: ["SM"] });
      // riveInstance.play("YourAnimationName");
    }
  );

  // Add initialization calls for your other animations here
</script>
