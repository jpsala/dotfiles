
mapkey('<Ctrl-y>', 'Show me the money', function () {
  Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
});

// an example to replace `T` with `gt`, click `Default mappings` to see how `T` works.
map('gt', 'T');

// an example to remove mapkey `Ctrl-i`
unmap('<Ctrl-i>');
imap(',,', "<Esc>");

// set theme
settings.theme = `
.sk_theme {
  background: #000;
  color: #fff;
}
.sk_theme tbody {
  color: #fff;
}
.sk_theme input {
  color: #d9dce0;
}
.sk_theme .url {
  color: #2173c5;
}
.sk_theme .annotation {
  color: #38f;
}
.sk_theme .omnibar_highlight {
  color: #fbd60a;
}
.sk_theme ul>li:nth-child(odd) {
  background: #1e211d;
}
.sk_theme ul>li.focused {
  background: #4ec10d;
}`;

//functions

const clickBtn = selector => {
  const btn = document.querySelector(selector);
  if (btn) btn.click();
};

const googleFilter = (count, type) => {
  mapkey(`G${type}${count}`, `goto filter last ${count} ${type}`, 
    () => clickBtn(`#id_${count}${type.toUpperCase()}`), {
      domain: /google\.com/i
  }
);

}
// mappings

unmap('<Ctrl-j>');
map('F', 'gf');

// filtros google
unmap('G');
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
// fin filtros google