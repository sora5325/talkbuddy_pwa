let cacheFiles = [
  './index.html',
  './design.css',
  './manifest.json',
  './yes.mp3',
  './no.mp3',
  './thank_you.mp3',
  './explanation.mp3',
  './introduction.mp3',
  './hello.mp3',
  './ntmy.mp3',
  './bye.mp3',
  './good.mp3',
  './nice.mp3',
  './excuse_me.mp3'
];

//event listner: things that are done when the page is loaded, closed, or a button clicked etc.
self.addEventListener('install', function(event){
  console.log('service worker is installing...');
  //wait until the caches are opened, then show the message and add all files to the cache
  event.waitUntil(
    caches.open('talkbuddy-cache')
     .then(function(cache) {
       console.log('files are caching...');
       return cache.addAll(cacheFiles);
     })
    );
});

//triggered when the service worker is activated
self.addEventListener('activate', function(event){
  console.log('service worker activated');
});

//triggered when the page requests a file
self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request) //check if the file is in cache
     .then(function (response){
       if (response){
         return response;
       }
       return fetch(event.request); //else fetch from network
      });
  );
});
    

