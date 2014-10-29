// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Send back to the popup a sorted deduped list of valid link URLs on this page.
// The popup injects this script into all frames in the active tab.

var links = [];
var full = document.getElementById("now-playing-media").childNodes[1].innerText;
var song = document.getElementById("now-playing-media").childNodes[1].childNodes[0].innerText;
var artist = full.substr(3+full.indexOf(" - "));
	links.push({
			artist : artist, song : song});
chrome.extension.sendRequest(links);


