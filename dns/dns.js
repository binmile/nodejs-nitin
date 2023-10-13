import dns from "dns";
const domain = "facebook.com";

dns.resolve(domain, "A", (err, addresses) => {
  if (err) return;
  console.log(`IPv4 addresses for ${domain}:`);
  addresses.forEach((address) => {
    console.log(address);
  });
});

dns.resolve(domain, "AAAA", (err, addresses) => {
  if (err) return;
  console.log(`IPv6 addresses for ${domain}:`);
  addresses.forEach((address) => {
    console.log(address);
  });
});

const ip = "8.8.8.8";

dns.reverse(ip, (err, hostnames) => {
  if (err) return;
  console.log(`Hostnames for ${ip}:`);
  hostnames.forEach((hostname) => {
    console.log(hostname);
  });
});



  
