import "./typewriter.js";

/*
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/scripts/sw.js")
      .then((reg) => console.log("✅ Service Worker registered", reg))
      .catch((err) =>
        console.error("❌ Service Worker registration failed", err)
      );
  });
}
*/

// unregistering service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
        console.log("Service worker unregistered");
      }
    })
    .catch(function (err) {
      console.error("Service worker unregister failed: ", err);
    });
}
