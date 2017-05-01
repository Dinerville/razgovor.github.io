var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var startListenBtn = $("#pressAndSay");
var progressStatus = $("#progress");
var resultText = $("#result");
var successAlert = $("#success");
var failedAlert = $("#fail");
  
function testSpeech() {
  startListenBtn.attr("disabled",true);
  resultText.hide("slow");
  successAlert.hide("slow");
  failedAlert.hide("slow");
  progressStatus.show("slow");
  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + $("#btnEnglish").val() +';';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-UK';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
	  startListenBtn.prop("disabled",false);
	progressStatus.hide();  
    var speechResult = event.results[0][0].transcript;
    resultText.text('Вы сказали: ' + speechResult + '.');
	resultText.show("slow");
	console.log('expect: ' + $("#btnEnglish").val());
	console.log('result: ' + event.results[0][0].transcript);
    if(speechResult === $("#btnEnglish").val()) {
      successAlert.show("slow");
    } else {
      failedAlert.show("slow");
    }

    console.log('Confidence: ' + event.results[0][0].confidence);
	
  }

  recognition.onspeechend = function() {
	  startListenBtn.prop("disabled",false);
	progressStatus.hide(); 
    recognition.stop();
  }

  recognition.onerror = function(event) {
	  startListenBtn.prop("disabled",false);
	progressStatus.hide(); 
    resultText.text('Ошибка в распознавании речи: ' + event.error);
	resultText.show("slow");
  }

}
startListenBtn.bind('click', testSpeech);



$(function(){
	$("#btnEnglish").bind( "keyup", function() {
		$("#jumboBlock").show("slow");
		$("#inputContent").text($("#btnEnglish").val());
	});
});

$(function () {
    $(".sound-play").bind("click", function (event) {
        var msg = new window.SpeechSynthesisUtterance();
        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = $(this).text();
        msg.lang = 'en-US';

        window.speechSynthesis.speak(msg);
    });
});