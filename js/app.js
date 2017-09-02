'use strict';

function game() {
	let cards = document.querySelectorAll('.card'),
        deck = document.querySelector('.deck'),
        // create the list holding matched cards
        openCards = [],
        // create coutner for the moves
	    counter = 0,
	    moves = document.querySelector('.moves'),
	    container = document.querySelector('.container'),
	    //create the congratulation page
        win = document.createElement('div'),
        restart = document.querySelector('.restart'),
        stars = document.querySelector('.stars'),
        scorePanel = document.querySelector('.score-panel'),
        //create the div for the timer
        timer = document.querySelector('.timer'),
        hour = 0,
        minuit = 0,
        second = 0,
        time;
    // set up a fresh game board
    rest();

    // set up the congratulation page 
    winPage();

    // flip and match the cards 
    main();

    //set up the timer 
    function setUptimer(){
	    time = setInterval(function() {
	    	second++
	    	if (second === 60) {
	    		second = 0;
	    		minuit ++;
	    		if (minuit === 60) {
	    			minuit = 0 ;
	    			hour++;
	    		}    	
	    	}
	    	rendertime(hour, minuit, second);
	    },1000);
    }

    // render time on the page
    function rendertime(){
    	 timer.innerHTML = hour +':' + minuit +':'+ second;
    }

    // rest the game by clicking the restart icon
    restart.addEventListener('click', function() {
         init();
    });
    
   
	function winPage() {
		win.style.display = 'none';
		win.style.textAlign ='center';
		container.append(win);
	}

   // function to set up the game board
	function rest() {
        // randomly shuffle the lists holding the cards 
		let newCards = shuffle(Array.from(cards));
		// delete the old lists
		while(deck.firstChild){
			deck.removeChild(deck.firstChild);
		}
		// append the new lists 
		for(let i=0; i<newCards.length; i++){
			deck.append(newCards[i]);
	    }
	    // render the moves counter
	    renderScore(counter);
	    // show time
	    rendertime();
	    // set up the timer
	    setUptimer();   
	}

	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) {
	    let currentIndex = array.length, temporaryValue, randomIndex;
	    while (currentIndex !== 0) {
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	    }
	    return array;
	}

    // initiate the game 
	function init() {
		// hide all the cards and remove all the classes enabling animation or transition 
		for(let i=0; i < cards.length; i++){
			cards[i].classList.remove('open', 'show', 'match', 'hide');
		}
		// clear the list holding matched cards
		openCards.splice(0);
		// reset the moves counter
		counter=0;
		// reset the timer
		clearInterval(time);
		hour = 0;
		minuit = 0;
		second = 0;
		// set up a new game board
		rest();
		// reshow the game board
		deck.style.display = 'flex';
		// hide the congratulation page
		win.style.display = 'none';
		// reset rating stars
		stars.children[2].innerHTML='<i class="fa fa-star"></i>';
		stars.children[1].innerHTML='<i class="fa fa-star"></i>';
	}

	function main() {
		// set up the event listener for a card
		deck.addEventListener('click',function(evt){
			let target = evt.target
			if(target.tagName != 'LI')
				return;
		    // update the moves counter with each click in the card
			updateScore(counter);
			// update the rating stars accordingly
			updateStar(); 
			// when a card is clicked, it displays the card's symbol 
			flip(target);  
			// wait for the card to be fliped and match 
			setTimeout(function(){compare(openCards,target);}, 700); 	
		});
    }
    
    // show the moves counter
	function renderScore(num) {
        moves.innerText = num + ' ';
	}

    // update the moves counter
	function updateScore() {
		counter++;
		renderScore(counter);
	}
   
    // update the rating stars
	function updateStar() {
		switch(counter){
			case 26:
				stars.children[2].innerHTML='<i class="fa fa-star-o" aria-hidden="true"></i>';
				break;
			case 40:
				stars.children[1].innerHTML='<i class="fa fa-star-o" aria-hidden="true"></i>';
		}
	}
		
    // show the congratulation page when all cards are matched
	function gameWin() {
		// hide the game board and score panel
		deck.style.display = 'none';
		scorePanel.style.display = 'none';
		// show congratulation page
		win.style.display = 'block';
		win.style.height = '100vh';
		// show the reward icon, tell the player how much time it took to win the game and what the star rating was
		win.innerHTML = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"'+
	                   	'viewBox="0 0 512.002 512.002" style="width:100, height:100;" xml:space="preserve">'+
                       	'<path style="fill:#E47500;" d="M372.279,268.177c-1.399,0-2.809-0.085-4.221-0.255c-11.717-1.419-22.61-8.541-29.14-19.051'+
						'c-6.235-10.036-7.684-21.833-3.975-32.368c6.245-17.742,23.415-27.616,37.211-35.549c3.685-2.119,7.164-4.12,9.956-5.998'+
						'c18.931-12.735,32.529-24.497,42.793-37.016c17.09-20.844,24.909-44.946,21.453-66.124C442.74,49.649,424,30.905,404.586,30.033'+
						'c-10.949-0.488-21.508,4.785-25.673,12.833c-1.921,3.71-2.21,8.754-0.755,13.162c0.664,2.013,2.295,5.644,5.748,7.335'+
						'c1.885,0.923,4.372,0.826,6.052-0.236c0.798-0.505,0.3-3.055-0.064-3.684c0,0.001,0.068,0.117,0.232,0.312l22.938-19.336'+
						'c5.744,6.814,8.397,16.987,6.923,26.548c-1.395,9.044-6.36,16.683-13.982,21.508c-10.504,6.648-24.029,7.35-35.296,1.829'+
						'c-9.868-4.834-17.34-13.668-21.038-24.873c-4.014-12.159-3.065-25.41,2.601-36.356c9.51-18.367,31.089-30.028,53.661-29.011'+
						'c33.949,1.525,64.058,30.295,70.034,66.922c4.842,29.677-5.313,62.472-27.863,89.976c-12.171,14.846-27.82,28.474-49.248,42.888'+
						'c-3.666,2.467-7.773,4.829-11.744,7.112c-9.993,5.747-21.319,12.26-23.87,19.505c-0.954,2.712,0.493,5.502,1.16,6.575'+
						'c1.722,2.772,4.573,4.773,7.265,5.1c3.172,0.387,5.661-2.62,6.346-3.55c2.092-2.847,2.78-6.352,1.712-8.721l27.348-12.333'+
						'c5.546,12.299,3.674,27.174-4.887,38.821C394.761,262.456,383.812,268.177,372.279,268.177z"/>'+
						'<path style="fill:#FF9800;" d="M139.722,268.177c-11.533,0-22.48-5.72-29.904-15.82c-8.562-11.646-10.435-26.521-4.889-38.82'+
						'l27.348,12.331c-1.068,2.37-0.38,5.874,1.713,8.722c0.684,0.93,3.145,3.93,6.346,3.55c2.69-0.326,5.542-2.327,7.264-5.099'+
						'c0.667-1.073,2.115-3.863,1.16-6.577c-2.55-7.244-13.875-13.757-23.868-19.503c-3.972-2.284-8.079-4.646-11.746-7.113'+
						'c-21.427-14.413-37.076-28.041-49.248-42.888c-22.549-27.503-32.704-60.298-27.862-89.976C42.012,30.358,72.119,1.588,106.07,0.062'+
						'c22.576-1.021,44.151,10.645,53.66,29.011c5.666,10.946,6.615,24.197,2.602,36.356c-3.698,11.206-11.17,20.04-21.039,24.874'+
						'c-11.267,5.52-24.792,4.82-35.295-1.829c-7.623-4.826-12.589-12.464-13.983-21.508c-1.475-9.561,1.179-19.734,6.923-26.548'+
						'l22.938,19.336c0.164-0.195,0.231-0.311,0.232-0.312c-0.364,0.629-0.862,3.178-0.063,3.684c1.678,1.061,4.165,1.159,6.052,0.236'+
						'c3.453-1.692,5.084-5.322,5.748-7.336c1.455-4.408,1.165-9.451-0.756-13.162c-4.166-8.048-14.721-13.314-25.672-12.833'+
						'c-19.416,0.872-38.154,19.616-41.771,41.783c-3.456,21.18,4.363,45.281,21.452,66.124c10.265,12.52,23.862,24.282,42.794,37.016'+
						'c2.792,1.878,6.272,3.88,9.957,5.999c13.796,7.934,30.965,17.807,37.21,35.548c3.709,10.536,2.26,22.334-3.975,32.37'+
						'c-6.529,10.509-17.422,17.63-29.139,19.049C142.531,268.092,141.122,268.177,139.722,268.177z"/>'+
						'<polygon style="fill:#FFB74D;" points="281.785,325.211 281.785,355.211 271.115,355.211 271.115,433.971 241.115,433.971   241.115,355.211 230.445,355.211 230.445,325.211 241.115,325.211 241.115,272.242 271.115,272.242 271.115,325.211 "/>'+
						'<g><path style="fill:#FFDA2D;" d="M339.365,472.782v39.22h-166.5v-39.22c0-29.67,24.14-53.81,53.82-53.81h58.86'+
						'C315.225,418.971,339.365,443.112,339.365,472.782z"/>'+
						'<path style="fill:#FFDA2D;" d="M377.295,35.471v132.68c0,66.84-54.35,121.23-121.18,121.29h-0.11c-66.88,0-121.28-54.41-121.28-121.29V35.471H377.295z"/>'+
						'</g><polygon style="fill:#FF9800;" points="281.785,325.211 281.785,355.211 271.115,355.211 271.115,433.971 256.115,433.971 256.115,272.242 271.115,272.242 271.115,325.211 "/><g>'+
						'<path style="fill:#FDBF00;" d="M339.365,472.782v39.22h-83.25v-93.03h29.43C315.225,418.971,339.365,443.112,339.365,472.782z"/>'+
						'<path style="fill:#FDBF00;" d="M377.295,35.471v132.68c0,66.84-54.35,121.23-121.18,121.29V35.471H377.295z"/>'+
						'</g><h2>Congratulations! You Won!</h2> <h3> Win with ' + counter + ' moves and '+ document.querySelectorAll('.fa-star').length + ' stars</h3> <h4> Wooo! </h4><div><h3>You have used  '+hour+'  hours  '+ minuit+'  minuits  '+second+'  seconds</h3></div><div> <button>Replay?</button></div>';
		// ask the player if they want to replay, if yes, click the button to replay
		let button = document.querySelector('button');
		button.addEventListener('click',function(){
			init();
			scorePanel.style.display = 'block';
		});
	}
    
    // flip the cards by adding the match class 
	function flip(node) {
		node.classList.add('match');
	}
    
    // match the cards 
	function compare(array, node) {
		// add the clicked card to the list 
		array.push(node);	
		// if the number of cards in the list is a even number compare the last two cards 
		if ((array.length %2) ===0) {
			let last = array.length-1;
			// check if they contain the same icon, if true, lock them in the list and show them, if false, remove them from the list and hide them again
			if (array[last].firstElementChild.className === array[last-1].firstElementChild.className) {
				array[last].classList.add('open', 'show');
				array[last].classList.remove('match', 'hide');
				array[last-1].classList.add('open','show');
				array[last-1].classList.remove('match','hide');
			}else {
				array[last].classList.toggle('match');
				array[last].classList.add('hide');
				array[last-1].classList.toggle('match');
				array[last-1].classList.add('hide');
				array.splice(-2,2);
			}    				
		}
		// check if all the 16 cards have been matched if true
		if (array.length === 16) {
			// stop the timer
			clearInterval(time);
			// prepare a game summary and pop up the congratulation page 
			setTimeout(function(){gameWin();},700);
		}
	}
};

game();

	