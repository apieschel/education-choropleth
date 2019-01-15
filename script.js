/* globals d3 */
const xhr = new XMLHttpRequest();
const callback = function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    const dataset = data;
    console.log(dataset);
    /*
    const xhr2 = new XMLHttpRequest();
    const callback2 = function(err, data) {
      if (err !== null) {
        alert('Something went wrong: ' + err);
      } else {
        const dataset2 = data;
        console.log(dataset2);
      }
    }
    xhr2.open('GET', 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json', true);
    xhr2.responseType = 'json';
    xhr2.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr2.send();
    */
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