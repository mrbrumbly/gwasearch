let redditURL = "https://www.reddit.com/";
let searchPrefix = "/search/?restrict_sr=1&q=nsfw:1%20";

let searchForm = document.getElementById('search_form');
let searchButton = document.getElementById('search');
let subredditField = document.getElementById('subr');
let includedTagsField = document.getElementById('included_tags');
let excludedTagsField = document.getElementById('excluded_tags');
let posterField = document.getElementById('poster');
let timeField = document.getElementById('time');
let sortField = document.getElementById('sort');
let fills = document.getElementById('fills');
let improv = document.getElementById('improv');
let rambles = document.getElementById('rambles');
let offers = document.getElementById('offers');
let requests = document.getElementById('requests');
let modeField = document.getElementById('mode');

window.onload = function start() {
  attachListeners();
  prepareForm();
}

function attachListeners() {
  modeField.addEventListener('change', function onModeChange(e) {
    setMode(e.target.value);
    localStorage.setItem('mode', e.target.value); 
  });

  searchForm.addEventListener("submit", function onSubmitSearch(e) {
    e.preventDefault()
    storeSearch()
    let searchURL = createSearchURL();
    if (searchURL === 'error') return
    else window.open(searchURL, '_blank'); 
  })
}

function createSearchURL() {
  let includedTags = includedTagsField.value;
    let excludedTags = excludedTagsField.value;
    let excludedArray = excludedTags.replace(/,/g, "").split(' ');
    let sortValue = sortField.value;
    let timeValue = timeField.value;
    let subreddit = subredditField.value;
  
    let includedString = includedTags ? `title%3A(${includedTags})%20` : "";
    let excludedString = excludedTags ? `NOT%20title%3A(${excludedArray.join('%20OR%20')})%20` : "";
  
    let poster = posterField.value
    let posterArray = poster.replace(/,/g, "").split(' ');
    let posterString = posterField.value ? `author%3A(${posterArray.join('%20OR%20')}%20)` : "";
  
    let flairArray = [];
  
    if (fills.checked) flairArray.push("ScriptFill")
    if (improv.checked) flairArray.push("Improvisation")
    if (rambles.checked) flairArray.push("Ramblefap")
    if (offers.checked) flairArray.push("ScriptOffer")
    if (requests.checked) flairArray.push("Request")
    
    let flairString = flairArray.length > 0 ? `NOT%20flair%3A(${flairArray.join("%20OR%20")})` : ""
  
    let sortString = `&sort=${sortValue}`
    let timeString = `&t=${timeValue}`
    
    //let subredditString = "subreddit%3Agonewildaudio%20"
    //${subredditString}

    let queryString =  `${includedString}${excludedString}${posterString}${flairString}`;
  
    if (queryString.length > 512) {
      alert("GWA Search: Search too long.")
      return "error"
    }

    return `${redditURL}${subreddit}${searchPrefix}${queryString}${sortString}${timeString}`  
}

function setMode(mode) {
  if (mode === 'dark') {
    document.body.style.background = 'black';
  } else if (mode === 'light') {
    document.body.style.background = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(120,227,98,1) 0%, rgba(0,212,255,1) 100%)'
  }
}

function storeSearch() {
  localStorage.setItem('includedTags', includedTagsField.value);
  localStorage.setItem('excludedTags', excludedTagsField.value);
  localStorage.setItem('poster', posterField.value);
  localStorage.setItem('subreddit', subredditField.value);
  localStorage.setItem('flairF', fills.checked);
  localStorage.setItem('flairI', improv.checked);
  localStorage.setItem('flairR', rambles.checked);
  localStorage.setItem('flairO', offers.checked);
  localStorage.setItem('flairQ', requests.checked);
}

function prepareForm() {
  let iData = localStorage.getItem('includedTags');
  let eData = localStorage.getItem('excludedTags');
  let pData = localStorage.getItem('poster');
  let mData = localStorage.getItem('mode');
  let sData = localStorage.getItem('subreddit');
  let flairFData = localStorage.getItem('flairF');
  let flairIData = localStorage.getItem('flairI');
  let flairRData = localStorage.getItem('flairR');
  let flairOData = localStorage.getItem('flairO');
  let flairQData = localStorage.getItem('flairQ');

  if (iData) includedTagsField.value = iData;
  if (eData) excludedTagsField.value = eData;
  if (pData) posterField.value = pData;
  if (sData) subredditField.value = sData;
  if (flairFData) fills.checked = flairFData === 'true' ? true : false;
  if (flairIData) improv.checked = flairIData === 'true' ? true : false;
  if (flairRData) rambles.checked = flairRData === 'true' ? true : false;
  if (flairOData) offers.checked = flairOData === 'true' ? true : false;
  if (flairQData) requests.checked = flairQData === 'true' ? true : false;
  if (mData) { 
    modeField.value = mData;
    setMode(mData);
  }
}
