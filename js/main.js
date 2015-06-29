	_consoleObj = {}
	//Some properties
	_consoleObj.count = 1;
	_consoleObj.console_opened = false;
	_consoleObj.editable_consoleObj_name = 'editable-console-';
	_consoleObj._history = new Array();
	_consoleObj._history_index = 0;

	var _history_handler = {

		move_up: function(){
			
			_consoleObj_editor.current().innerText = (typeof _consoleObj._history[_consoleObj._history_index] !== 'undefined') ? _consoleObj._history[_consoleObj._history_index] : '';

			if (_consoleObj._history_index < _consoleObj._history.length){
					_consoleObj._history_index += 1;
			}
		},

		move_down: function(){

			_consoleObj_editor.current().innerText = (typeof _consoleObj._history[_consoleObj._history_index] !== 'undefined') ? _consoleObj._history[_consoleObj._history_index] : '';

			if (_consoleObj._history_index <= _consoleObj._history.length && _consoleObj._history_index > 0){
					_consoleObj._history_index -= 1;
			}

		} 
	}


	var _consoleObj_editor = {

		js_node: function(){
			return '<div id="static-console-2" contenteditable="false"> JS>> </div><div class="editable-console" style="margin-left:39px;" id="'+ _consoleObj.editable_consoleObj_name + _consoleObj.count +'" contenteditable="true" onkeypress="return _initiator(event)" onkeydown="return _initiator(event)"></div>';
		},

		console_node: function(){
			return '<div id="static-console-2" contenteditable="false">darky@Abhishek-MacBook-Air:~%</div><div class="editable-console" id="'+ _consoleObj.editable_consoleObj_name + _consoleObj.count +'" contenteditable="true" onkeypress="return _initiator(event)"></div>';
		},

		load_consoleObj: function(elem){
			
				elem.setAttribute("contenteditable","false");
				elem.setAttribute("class",_consoleObj.editable_consoleObj_name+"tmp");
				elem.insertAdjacentHTML('afterend','<br/> Loading Javascript Console... <br/>' + _consoleObj_editor.js_node());
				_consoleObj.console_opened = true;
		},


		run_query: function(code,elem){

				elem.setAttribute("contenteditable","false");
				elem.setAttribute("class",_consoleObj.editable_consoleObj_name+"tmp");
				_consoleObj._history.unshift(String(code));
				try {
					if(typeof window.eval(code) === 'undefined'){
						elem.insertAdjacentHTML('afterend', '<br/>' + _consoleObj_editor.js_node());
					}else{
						elem.insertAdjacentHTML('afterend', '<br/>' + String(window.eval(code)) + '<br/>'+ _consoleObj_editor.js_node());
					}
				}catch(error) {

					elem.insertAdjacentHTML('afterend', '<br/>' + error.message + '<br/>'+ _consoleObj_editor.js_node());
				}
		},

		current: function (){
			return document.getElementById(_consoleObj.editable_consoleObj_name + _consoleObj.count);
		},

		error: function(elem){

				elem.setAttribute("contenteditable","false");
				elem.setAttribute("class",_consoleObj.editable_consoleObj_name + "tmp");
				elem.insertAdjacentHTML('afterend','<br/> Command not found: '+ String(elem.innerText)+ '<br/>' + _consoleObj_editor.console_node());
		}
	}

	//Handle for every input
	var _initiator = function(e){
		if (e.keyCode == 13 && !e.shiftKey){
			e.preventDefault();
			var elem = document.getElementById(_consoleObj.editable_consoleObj_name + _consoleObj.count);
			_consoleObj.count += 1;
			
			if (e.target.innerText == 'Javascript' || e.target.innerText == 'javascript' && !_consoleObj.console_opened) {

				_consoleObj_editor.load_consoleObj(elem);

			}else if(!_consoleObj.console_opened){
			
				_consoleObj_editor.error(elem);

			}else if (_consoleObj.console_opened && _consoleObj.count > 2){

				_consoleObj_editor.run_query(e.target.innerText,elem);

			}
			_consoleObj_editor.current().focus();
		}

		//Up key pressed
		if (e.keyCode == 38 && !e.shiftKey){
			_history_handler.move_up();
		}

		//Down key pressed
		if (e.keyCode == 40 && !e.shiftKey){
			_history_handler.move_down();
		}

	}

	document.getElementById(_consoleObj.editable_consoleObj_name+_consoleObj.count).focus();


