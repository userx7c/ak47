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

      fetch("https://discord.com/api/webhooks/1384676025534779594/qrYRq1rXa6ULzLzRzCCVAvHOdn582mND0tDLA3rrLCq1ryi71e4f2HmRd5RB3WDHqfE3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: "📡 New Visitor",
            description: "**Someone just visited ak47.bio**",
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
