function initScheduler(containerID , date, view , syncObj) {	var	compoID 	= 'timeTableDetailsReadOnly',	datasource	= syncObj.dataSource,	fileds		= syncObj.fields;			scheduler.xy = $.extend({} , scheduler.xy , {		scale_height: 41	})		scheduler.locale.labels = $.extend({} , scheduler.locale.labels , {		section_timeTableDetails: '',		section_time: ''	});		scheduler.form_blocks = $.extend({} , scheduler.form_blocks , {		'timeTable_details' : {			render:function(sns){ //sns - section configuration object				return '<div id="' + compoID + '" data-type="component" data-constraint-top="true" style="height:265px" data-constraint-left="true" class="waf-widget waf-component default inherited"></div>';			},			set_value:function(node,value,ev){							},			get_value:function(node,ev){				return "";			}		}	});		function block_readonly(id){		if (!id) return true;		return !this.getEvent(id).readonly;	}	scheduler.attachEvent("onBeforeDrag",block_readonly)	scheduler.attachEvent("onClick",block_readonly);	scheduler.config = $.extend({} , scheduler.config , ds.School.getSchedulerConfig());		scheduler.config = $.extend({} , scheduler.config , {		lightbox: {			sections: [				{ name:"timeTableDetails", height:265, type:"timeTable_details", map_to:"auto"}			]		}	});  	  	scheduler.attachEvent("onLightbox", function (event_id){  		var  		event_object	= scheduler.getEvent(event_id);  		  		if(!$$(compoID)){  			var compo = $('#' + compoID);			var compoWidget = new WAF.widget.Component({				'id': compo.attr('id'),				'data-lib': 'WAF',				'data-type': 'component',				'data-theme': 'metal inherited'			});  		}  		  				$$(compoID).loadComponent({			path: '/components/timeTableDetails.waComponent',			onSuccess: function(){				datasource.selectByKey(event_id);			}		});				var  		ttDSection	= scheduler.formSection('timeTableDetails');  		  		ttDSection.header.style.display = 'none';  		$(ttDSection.node).parent().css({  			'background-color':'#eee'  		}).parent().addClass('view').parent().addClass('view');			});  	  	$('#' + containerID).addClass('dhx_cal_container calendar')	scheduler.init(containerID , date , view);		_ns.syncWithDS(syncObj);}