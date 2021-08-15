window.onload = () => { 

	//create button div
	var centered = document.createElement('div'); //div
    centered.setAttribute('class', 'centered');
    var infoBtn = document.createElement('button'); //button
    infoBtn.setAttribute('data-action', 'change');
    centered.appendChild(infoBtn); //add button to div
    document.body.appendChild(centered); //add div + button to body

    //call places API based on ID
    var placeID = 'edyS0koKFMVeTh4KaXbC';

    // the value below will be replaced by a function return the url of all avaiable places
    var placesURL = `https://smartwalks-test-proxy.herokuapp.com/http://smartwalks.cetools.org/api/v1/place/${placeID}`

    $.getJSON(placesURL, function(data) {

    	console.log(data);
    		
    	console.log(data.location);

    	//set gps position of AR image
    	var img = document.getElementsByTagName("a-image");
    	console.log(img);
    	var gpsString = `latitude: ${data.location._latitude}; longitude: ${data.location._longitude};`;
    	img[0].setAttribute('gps-entity-place', gpsString);

    	//event listener for button: generate overlay
    	infoBtn.addEventListener('click', function () { 
    		//overlay div
	        var content = document.createElement('div');
	        content.setAttribute('id', 'overlay');

	        //close button
	        var closeBtn = document.createElement('i');
	        closeBtn.setAttribute('class', 'fa fa-times-circle');
	        closeBtn.setAttribute('id', 'btn-close');
	        content.appendChild(closeBtn);

	        //create text
	        var placeText = document.createElement('div');
	        placeText.setAttribute('id', 'text');
	        var textTitle = document.createElement('h1');
	        textTitle.innerText = data.name;
	        var textDesc = document.createElement('p');
	        textDesc.setAttribute('id', 'desc');
	        textDesc.innerText = data.description;
	        placeText.appendChild(textTitle);
	        placeText.appendChild(textDesc);

	        content.appendChild(placeText); //add to overlay

	        //create buttons
	        var buttonMenu = document.createElement('div');
	        buttonMenu.setAttribute('id', 'buttons');
	        buttonMenu.innerHTML = `<span class="material-icons" id="info">info</span>
	                  <span class="material-icons" id="quiz">quiz</span>
	                  <span class="material-icons" id="reading">article</span>`

	        content.appendChild(buttonMenu);

	        document.body.appendChild(content);

	        //QUIZ QUESTIONS
	        var questions = data.questions;
	        var questionsList = document.createElement('ol');

	        $.each(questions, function(i) {
	        	let q = document.createElement('li');
	            q.innerText = questions[i];
	            questionsList.appendChild(q);
	         });

	              //event listener for quiz questions
	         $('#quiz').click(function(){
	            textTitle.innerText = 'Questions';
	            $('#desc').hide();
	            placeText.appendChild(questionsList);
	         });

	              //event listener for info
	         $('#info').click(function(){
	            if (placeText.contains(questionsList)) {
	            	placeText.removeChild(questionsList);
	                $('#desc').show();
	             }
	             textDesc.innerText = data.description;
	             textTitle.innerText = data.name;
	          });

	              //event listener for further reading
	          $('#reading').click(function(){
	            if (placeText.contains(questionsList)) {
	                placeText.removeChild(questionsList);
	                $('#desc').show();
	             }
	             textDesc.innerText = data.link;
	             textTitle.innerText = 'Further reading';
	           });

	              //event listener for close icon
	           $('#btn-close').click(function(){
	             $('#overlay').hide();
	           });
    		
    		});
    	

      });


}


