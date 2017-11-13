imap(',,', "<Esc>");
vmap(',,', "<Esc>");

unmap('<Ctrl-j>');
map('F', 'gf');

// filtros google
addGoogleFilters();
unmap('G');
vunmap('G');
mapkey('GG', '#2Scroll to the bottom of the page', 'Normal.scroll("bottom")', {repeatIgnore: true});

addSearchAliasX('c', 'criticker', 'https://www.criticker.com/?type=films&search=', 's', 'https://www.criticker.com/ajax/critickerAc.php?type=films&term=', function(response) {
  console.log('criticker...', response);
  var res = JSON.parse(response.text);
  console.log('res', res);
  Omnibar.listResults(res, function(s) {
    return Omnibar.createURLItem({
      title: `s.label`,
      url:   "https://criticker.com/" + s.url
    });
  });
});
addSearchAlias('C', 'criticker search', 'https://www.criticker.com/?type=films&search=');
vmapkey('sc', 'Search Selected with Criticker + ajax',  'searchSelectedWith("https://www.criticker.com/?type=films&search=")');
vmapkey('sC', 'Search Selected with Criticker',  'searchSelectedWith("https://www.criticker.com/?type=films&search=")');
mapkey('sc', '#3Search Criticker + ajax', 'Front.openOmnibar({type: "SearchEngine", extra: "c"})');
mapkey('sC', '#3Search Criticker', 'Front.openOmnibar({type: "SearchEngine", extra: "C"})');

// fin filtros google

// },
//https://clients1.google.com/complete/search?client=youtube&hl=en&gl=ar&sugexp=ytd3_arm_2&gs_rn=64&gs_ri=youtube&tok=pgyz3-q4M6xQfo5hPCaZTg&ds=yt&cp=3&gs_id=c&q=bbb&callback=google.sbox.p50&gs_gbg=7511
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
/*
"google.sbox.p50 && google.sbox.p50(["hol",[["holotropic breathing",35,[39]],["hola soy german",35,[39]],["hollywood movie",0],["hollywood movie in hindi",0],["hollywood undead",0],["hollywood movies in hindi dubbed full action hd",0],["hollywood",0],["hold on",0],["hollywood movies 2017",0],["holiday",0]],{"a":"rZSObmRy4ROjkkVmGenskCVnSgr1IcubUNTvTkV1bm82OluIJLv9Yxk3baeIoeHLZkCaLVfZQQ8EfGU9Ce37ErxetS","j":"c","k":1,"q":"Ps4mRWqbQ9ncZDbttnz8VcdCEkU"}])"
*/

// mapkey('la', '#8Search ' + s.name, 'Front.openOmnibar({type: "SearchEngine", extra: "' + s.alias + '"})');
// fin filtros youtube


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

