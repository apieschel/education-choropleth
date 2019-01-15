/* globals d3 */
let dataset = [];
const xhr = new XMLHttpRequest();
const callback = function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    console.log(data);
  }
}

xhr.open('GET', 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json', true);
xhr.responseType = 'json';
xhr.onload = function() {
  var status = xhr.status;
  if (status === 200) {
    callback(null, xhr.response);
  } else {
    callback(status, xhr.response);
  }
};
xhr.send();