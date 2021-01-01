let searchPrefix = "https://www.reddit.com/r/gonewildaudio/search/?restrict_sr=1&q="

let searchForm = document.getElementById('search_form');
let searchButton = document.getElementById('search');
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

window.onload = function start() {
  prepareForm()
}

searchForm.addEventListener("submit", function submitSearch(e) {
  e.preventDefault()
  let includedTags = includedTagsField.value
  let excludedTags = excludedTagsField.value
  let excludedArray = excludedTags.replaceAll(",", "").split(' ')
  let sortValue = sortField.value
  let timeValue = timeField.value

  let includedString = includedTags ? `title%3A(${includedTags})%20` : "";
  let excludedString = excludedTags ? `NOT%20title%3A(${excludedArray.join('%20OR%20')})%20` : "";

  let poster = posterField.value
  let posterArray = poster.replaceAll(",", "").split(' ');
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

  let queryString =  `${includedString}${excludedString}%20${posterString}${flairString}`;

  let destination = `${searchPrefix}${queryString}${sortString}${timeString}`  

  storeSearch()
  
  if (queryString.length > 512) {
    alert("GWA Search: Search too long.")
    return
  }

  window.open(destination, '_blank'); 
})

function storeSearch() {
  localStorage.setItem('includedTags', includedTagsField.value);
  localStorage.setItem('excludedTags', excludedTagsField.value);
  localStorage.setItem('poster', posterField.value);
}

function prepareForm() {
  let iData = localStorage.getItem('includedTags');
  let eData = localStorage.getItem('excludedTags');
  let pData = localStorage.getItem('poster');

  if (iData) includedTagsField.value = iData;
  if (eData) includedTagsField.value = eData;
  if (pData) includedTagsField.value = pData;
}
