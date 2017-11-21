imap(',,', "<Esc>");
vmap(',,', "<Esc>");
unmap('ss');
// settings.blacklistPattern = /.*localhost.*/i;
unmap('<Ctrl-j>');
map('F', 'gf');
//busquedas torrent
mapkey('GG', '#2Scroll to the bottom of the page', 'Normal.scroll("bottom")', {repeatIgnore: true});

/*
   busquedas
*/
//torrent
addSearchAlias('tp', 'Pirate Bay search', 'https://thepiratebay.org/search/');
mapkey('sstp', 'Search Selected with Pirate Bay search',  'searchSelectedWith("https://thepiratebay.org/search/")');
//fin torrent

// subtitulos
addSearchAlias('s1', 'opensubtitles search', 'https://www.opensubtitles.org/en/search/sublanguageid-spa/moviename-');
mapkey('sso', 'Search Selected with opensubtitles',  'searchSelectedWith("https://www.opensubtitles.org/en/search/sublanguageid-spa/moviename-")');
// fin subtitulos

// criticker
addSearchAliasX('c', 'criticker', 'https://www.criticker.com/?type=films&search=', 's', 'https://www.criticker.com/ajax/critickerAc.php?type=films&term=', function(response) {
  console.log('criticker...', response);
  var res = JSON.parse(response.text);
  try{
    Omnibar.listResults(res, function(s) {
      return Omnibar.createURLItem({
        title: s.label,
        url:   "https://criticker.com/" + s.url
      });
    });
    addSearchAlias('C', 'criticker search', 'https://www.criticker.com/?type=films&search=');
    } catch(e) {
      console.log('error en busqueda con criticker', e);
  }
});
mapkey('ssc', 'Search Selected with Criticker + ajax',  'searchSelectedWith("https://www.criticker.com/?type=films&search=")');
mapkey('ssC', 'Search Selected with Criticker',  'searchSelectedWith("https://www.criticker.com/?type=films&search=")');
mapkey('sc', '#3Search Criticker + ajax', 'Front.openOmnibar({type: "SearchEngine", extra: "c"})');
mapkey('sC', '#3Search Criticker', 'Front.openOmnibar({type: "SearchEngine", extra: "C"})');
// fin criticker

// busquedas google
addGoogleFilters();
unmap('G');
vunmap('G');
// fin busqueda google


//youtube
vmapkey('ssy', 'Search Selected with youtube',  'searchSelectedWith("https://www.youtube.com/results?search_query=")');
addSearchAliasX('y', 'youtube', 'https://www.youtube.com/results?search_query=', 's', `https://www.googleapis.com/youtube/v3/search?maxResults=20&part=snippet&type=video,channel&key=AIzaSyAlnuigXIdOfthUHe75FqZJFeT-kVmmcWc&safeSearch=none&q=`,  
  function(response) {
    var res = JSON.parse(response.text).items;
    Omnibar.listResults(res, function(s) {
      switch(s.id.kind) {
        case "youtube#channel":
          return Omnibar.createURLItem({
            title: s.snippet.channelTitle + ": " + s.snippet.description,
            url:   "https://youtube.com/channel/" + s.id.channelId
          });
        case "youtube#video":
          return Omnibar.createURLItem({
            title: " ▶ " + s.snippet.title,
            url:   "https://youtu.be/" + s.id.videoId
          });
      }
    });
  }
);
// fin youtube
//****************** fin busquedas

function clickBtn(selector) {
  const btn = document.querySelector(selector);
  if (btn) btn.click();
};

function googleFilter(count, type) {
  mapkey(`G${type}${count}`, `goto filter last ${count} ${type}`, 
    () => clickBtn(`#id_${count}${type.toUpperCase()}`), {
      domain: /google\.com/i
  }
);

}

function addGoogleFilters() {
  googleFilter(1, 'd');
  googleFilter(3, 'd');
  googleFilter(1, 'd');
  googleFilter(2, 'd');
  googleFilter(1, 'w');
  googleFilter(2, 'w');
  googleFilter(3, 'w');
  googleFilter(1, 'm');
  googleFilter(2, 'm');
  googleFilter(3, 'm');
  googleFilter(4, 'm');
  googleFilter(5, 'm');
  googleFilter(6, 'm');
  googleFilter(1, 'y');
  googleFilter(2, 'y');
  googleFilter(3, 'y');  
}

// $(document).ready(()=>{
  $($('.div-socios button')[0]).click();
// });

