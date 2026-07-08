(() => {
  const trackedLinks = [
    {
      eventName: "whatsapp_clicked",
      test: (href) => href.includes("wa.me") || href.includes("api.whatsapp.com"),
    },
    {
      eventName: "instagram_clicked",
      test: (href) => href.includes("instagram.com"),
    },
    {
      eventName: "email_clicked",
      test: (href) => href.startsWith("mailto:"),
    },
    {
      eventName: "maps_clicked",
      test: (href) => href.includes("google.com/maps") || href.includes("maps.google.com"),
    },
  ];

  const sendEvent = (eventName, link) => {
    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", eventName, {
      link_text: link.textContent.trim(),
      link_url: link.href,
      page_path: window.location.pathname,
    });
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!link) {
      return;
    }

    const href = link.href.toLowerCase();
    const match = trackedLinks.find((item) => item.test(href));

    if (match) {
      sendEvent(match.eventName, link);
    }
  });
})();
