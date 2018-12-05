jsUpload.onsubmit = function() {
  const formData = new FormData();
  const input = document.querySelector("#jsUpload input[type='file'][multiple]");

  for (let i = 0; i < input.files.length; i++) {
    formData.append('files', input.files[i]);
  }

  fetch('files', {
    method: 'POST',
    body: formData
  })
  .then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error));
}
