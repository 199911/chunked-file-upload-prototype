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
    const sliceSize = 8;

    const parts = [];
    let start = 0;
    let end = sliceSize;
    while(start < size) {
      parts.push(file.slice(start, end));
      start = end;
      end += sliceSize;
    }

    parts.forEach((part, index) => {
      const formData = new FormData();
      formData.append(`myFiles`, part);
      fetch('/files', {
        method: 'POST',
        body: formData
      })
        .then(response => console.log('Success:', response))
        .catch(error => console.error('Error:', error));
    });
  });
}
