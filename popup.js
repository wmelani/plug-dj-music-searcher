// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This extension demonstrates using chrome.downloads.download() to
// download URLs.

var allLinks = [];

// Add links to allLinks and visibleLinks, sort and show them.  send_links.js is
// injected into all frames of the active tab, so this listener may be called
// multiple times.
chrome.extension.onRequest.addListener(function(links) {
  for (var index in links) {
    allLinks.push(links[index]);
    downloadCheckedLinks();
    allLinks = [];
  }
});
function getArtist(link){
   return link.artist; 
}
function downloadCheckedLinksGS(){
  var base = "http://grooveshark.com/#!/search?q=";
  base = base + allLinks[0].song.replace(" ","+") + "+" + allLinks[0].artist.replace(" ","+");
  chrome.tabs.create({
    url : base
  });
}
function downloadCheckedLinksSC(){
  var base = "https://soundcloud.com/search?q=";
  base = base + encodeURIComponent(stripTheThe(allLinks[0].song) + " " + stripTheThe(allLinks[0].artist));
  chrome.tabs.create({
    url : base
  });
}
function stripTheThe(content){
	var strippedComponents = content.split(" ");
	var stripped = "";
  for (var i = 0; i < strippedComponents.length; i++)
  {
	var piece = strippedComponents[i];
	stripped += piece.replace(/^the/gi,"") + " ";
  }
  return stripped;
}
function downloadCheckedLinksXM() {
    var base = "http://music.xbox.com/search/";
    base = base + encodeURIComponent(allLinks[0].song + " " + allLinks[0].artist);
    chrome.tabs.create({
        url: base
    });
}
function downloadCheckedLinksSpotify() {
    var base = "https://open.spotify.com/search/";
    base = base + encodeURIComponent(allLinks[0].song + " " + allLinks[0].artist);
    chrome.tabs.create({
        url: base
    });
}

// Set up event handlers and inject send_links.js into all frames in the active
// tab.
window.onload = function() {
  document.getElementById('grooveshark').onclick = downloadCheckedLinksGS;
  document.getElementById('soundcloud').onclick = downloadCheckedLinksSC;
  document.getElementById('xboxmusic').onclick = downloadCheckedLinksXM;
  document.getElementById('spotify').onclick = downloadCheckedLinksSpotify;
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'send_links.js', allFrames: true});
    });
  });
};
