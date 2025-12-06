export function getLoaderHtml() {
    return `
    <style>
      #app-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.5s ease-out;
      }
      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        #app-loader {
          background-color: #121212;
        }
        .spinner {
          border-color: #333;
          border-top-color: #bb86fc;
        }
      }
    </style>
    <div id="app-loader">
      <div class="spinner"></div>
    </div>
    <script>
      (function() {
        var MIN_DURATION = 3000;
        var start = Date.now();
        var loader = document.getElementById('app-loader');
        var isHydrated = false;

        window.__HYDRATION_COMPLETE__ = function() {
          isHydrated = true;
          checkAndRemove();
        };

        function checkAndRemove() {
          if (!loader) return;
          var elapsed = Date.now() - start;
          var remaining = Math.max(0, MIN_DURATION - elapsed);
          
          if (remaining > 0) {
            setTimeout(remove, remaining);
          } else {
            remove();
          }
        }

        function remove() {
          if (loader) {
            loader.style.opacity = '0';
            setTimeout(function() {
              if (loader.parentNode) loader.parentNode.removeChild(loader);
            }, 500);
          }
        }

        // Failsafe: remove after 10s even if hydration fails
        setTimeout(function() {
          if (loader && loader.parentNode) {
            console.warn('Loader removed by failsafe');
            remove();
          }
        }, 10000);
      })();
    </script>
  `
}
