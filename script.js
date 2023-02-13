const downloadButton = document.querySelector('.download-button');
const fileList = document.querySelector('.file-list');

downloadButton.addEventListener('click', function() {
  fileList.classList.toggle('show');
});
