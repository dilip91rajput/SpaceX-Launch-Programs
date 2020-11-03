//  Script for active inactive filter buttons...

var listGroup = document.getElementsByClassName('list-group-item');

function getTarget(e) {
  if (!e) {
    e = window.event;
  }
  return e.target || e.srcElement;
}

function setActive(e) {
	var target = getTarget(e),
      section = target.parentNode;
  
  for (i = 0; i < listGroup.length; i++) {
    if (listGroup[i].parentNode === section) {
      listGroup[i].className = 'list-group-item';
    }
  }
  
  target.className = 'list-group-item active';
}

for (j = 0; j < listGroup.length; j++) {
  listGroup[j].addEventListener('click', function(e) {
    setActive(e);
  }, false);
}
  
