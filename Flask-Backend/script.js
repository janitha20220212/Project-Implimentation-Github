const textData = "Sam is directed spider man 3";

fetch('/aidetection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: textData })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    label = data
  });