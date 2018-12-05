jsUpload.onsubmit = function() {
  const formData = new FormData();
  const input = document.querySelector("#jsUpload input[type='file'][multiple]");

  for (let i = 0; i < input.files.length; i++) {
    formData.append('myFiles', input.files[i]);
  }

  fetch('/files', {
    method: 'POST',
    body: formData
  })
  .then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error));
}

chunkUpload.onsubmit = function() {
  const input = document.querySelector("#chunkUpload input[type='file']");
  [ ...input.files ].forEach((file) => {
    const size = file.size;

    // Set size of each chunk to 32 MB
    const sliceSize = 32 * 1024 * 1024;

    const parts = [];
    let start = 0;
    let end = sliceSize;
    // Chunk the file
    while(start < size) {
      parts.push(file.slice(start, end));
      start = end;
      end += sliceSize;
    }

    // Upload the chunks parallelly
    parts.forEach((part, index) => {
      const formData = new FormData();
      const file = part;
      formData.append(`index`, index);
      formData.append(`myFiles`, file);
      fetch('/files', {
        method: 'POST',
        body: formData
      })
        .then(response => console.log('Success:', response))
        .catch(error => console.log(error));
    });
  });
  // Prevent page reload interrupt file transmission
  return false;
}
