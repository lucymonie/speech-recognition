window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
var words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
  var transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    p.textContent = transcript;

    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }

    if (transcript.includes('clear') || transcript.includes('start again')) {
      var paragraphs = document.getElementsByTagName('p');
      for (i = 0; i < paragraphs.length; i++) {
        words.removeChild(paragraphs[i]);
      }
    }
});

recognition.addEventListener('end', recognition.start);

recognition.start();
