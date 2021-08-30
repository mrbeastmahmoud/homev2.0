module.exports = {
  images: {
    domains: [
      "links.papareact.com",
      "fakestoreapi.com",
      "dl.airtable.com",
      "i.imgur.com",
      "firebasestorage.googleapis.com",
    ],
  },
  future: {
    webpack5: false,
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
 
  resolve: {
    fallback: {
        "child_process": false, 
        "process":  false, 
        "fs": false, 
        "util": false, 
        "http": false,
        "https": false,
        "tls": false,
        "net": false,
        "crypto": false, 
        "path": false,
        "os": false, 
        "stream": false,
        "zlib": false
    }
},
  
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
