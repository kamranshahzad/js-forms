	


	var filter_container = document.getElementById('filterContainer');

		function radioButtonGroup(container){
			this.list_options = [];
			this.container = container;
			this.element_name = 'new-england-states';
			this._init();
		}

		radioButtonGroup.prototype = {
			constructor : radioButtonGroup , 
			_init : function(){},
			_dummy : function(){},
			addItem : function(key,label){
				$('#filterContainer').append(createRadioButton(key,label,this.element_name));
				//this.container.appendChild(createRadioButton(key,label,this.element_name));
			},
			removeItem : function(key){},
			addItems : function(data_array){},
			_build : function(){},
			_handleEvents : function(){},
			_destroy : function(){}
		}

		/*
		var radGrp = new radioButtonGroup(filter_container);
		radGrp.addItem('helllo','hhh');
		*/


		// ChoiceGroup
		function ChoiceGroup(options,parent){
			this.is_multiple = false;
			this.options = options;
			this.choice_list = options.choice_list;
			this.url_params  = [];
			if(this.options.preferred_choices.length > 0){
				var that = this;
				this.options.preferred_choices.forEach(function(item){
					that.url_params.push(item);
				});
			}
			this.url_delimiter = '-';
			this._parent = parent; 
			this._init();
		}

		ChoiceGroup.prototype = {
			constructor : ChoiceGroup,
			options : {
				preferred_choices : []
			},
			_init : function(){
				var attribs = {class:'hello'};
				this.wrapper = createEl('ul', attribs);
			},
			_bindEvents : function(){
				var elements = this.wrapper.querySelectorAll('input[type=checkbox]');
				var that = this;
				[].slice.call(elements).forEach( function( el ) {
					var eventBinds = that.clickEventHandler.bind(that);
					el.addEventListener('click', eventBinds);
				});
			},
			_unbindEvents : function(){
				var elements = this.wrapper.querySelectorAll('input[type=checkbox]');
				var that = this;
				[].slice.call(elements).forEach( function( el ) {
					var eventBinds = that.clickEventHandler.bind(that);
					el.removeEventListener('click', eventBinds);
				});	
			},
			clickEventHandler : function(evt){
				if(evt.target.checked){
					this.url_params.push(evt.target.value);
				}else{
					console.log('Not Checked');
				}

				this._parent._collectUrlParams(this);
				//console.log('click---->' + this._parent._urlString);
			},
			_buildHtml : function(){
				var _html = '';
				for(var prop in this.choice_list ){
					_html += '<li>' + createCheckbox(this.choice_list[prop]) + '</li>';
				}
				this.wrapper.innerHTML = _html;
				this.options.container.appendChild(this.wrapper);

				this._bindEvents();
				this._setCheckedItems();				
			},
			_setCheckedItems : function(){
				var elements = this.wrapper.querySelectorAll('input[type=checkbox]');
				var that = this;
				[].slice.call(elements).forEach( function( el ) {
					if(that.url_params.indexOf(el.value) != -1 ){
						el.checked = true;
					}
				});
			},
			_getUrlParams : function(){
				return this.url_params;
			},
			_getUrlString : function(){
				return this.url_params.join(this.url_delimiter);
			},
			_destroy: function(){
				delete this.url_params;
				this._unbindEvents();
				this.options.container.removeChild(this.wrapper);
			}
		}


		



		// Filterbar
		function FilterBar(){
			var group = new ChoiceGroup(options,this);
			//group.url_params.push('lhr');
			group._buildHtml();


			var group2 = new ChoiceGroup(options2,this);
			group2._buildHtml();


			this.g1 = group;
			this.g2 = group2;

			this.all_params = [];
		}

		FilterBar.prototype = {
			constructor : FilterBar,
			_init : function(){},
			_urlString : 'i love you',
			_collectUrlParams : function(child){
				//console.log(this.item._getUrlParams());
				//console.log(child._getUrlParams());
				//this.all_params.push(child._getUrlParams());
				//console.log(this.all_params);
				this._getAllParams();
			},
			_getAllParams : function(){
				var str = '';
				str = this.g1._getUrlString() + "&" + this.g2._getUrlString();
				console.log(str);
			}
		}

		var filterObj = new FilterBar();




		/* 
			Filter Builder (collector of FilterBars)
		*/
		function FilterBuilder(){
            // collection machine
            this.param_string = '';
        }

        FilterBuilder.prototype = {
            constructor : FilterBuilder ,
            _init : function(){},
            _buildHtml : function(){}
        };






