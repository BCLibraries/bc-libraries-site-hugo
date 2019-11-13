fetch("js/search-tips.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonResponse) {
    var rand = Math.floor(Math.random() * jsonResponse.length);
    var searchTip = jsonResponse[rand];
    var element = document.getElementById("search-tip-text");
    element.innerHTML = searchTip.text;
  });
