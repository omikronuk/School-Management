/*
This software is allowed to use under GPL or you need to obtain Commercial or Enterise License
to use it in non-GPL project. Please contact sales@dhtmlx.com for details
*/
window.dhtmlXTooltip=window.dhtmlxTooltip={};dhtmlXTooltip.config={className:"dhtmlXTooltip tooltip",timeout_to_display:50,timeout_to_hide:50,delta_x:15,delta_y:-20};dhtmlXTooltip.tooltip=document.createElement("div");dhtmlXTooltip.tooltip.className=dhtmlXTooltip.config.className;
dhtmlXTooltip.show=function(b,d){if(!scheduler.config.touch||scheduler.config.touch_tooltip){var c=dhtmlXTooltip,g=this.tooltip,a=g.style;c.tooltip.className=c.config.className;var h=this.position(b),i=b.target||b.srcElement;if(!this.isTooltip(i)){var e=h.x+(c.config.delta_x||0),f=h.y-(c.config.delta_y||0);a.visibility="hidden";a.removeAttribute?(a.removeAttribute("right"),a.removeAttribute("bottom")):(a.removeProperty("right"),a.removeProperty("bottom"));a.left="0";a.top="0";this.tooltip.innerHTML=
d;document.body.appendChild(this.tooltip);var j=this.tooltip.offsetWidth,k=this.tooltip.offsetHeight;document.body.offsetWidth-e-j<0?(a.removeAttribute?a.removeAttribute("left"):a.removeProperty("left"),a.right=document.body.offsetWidth-e+2*(c.config.delta_x||0)+"px"):a.left=e<0?h.x+Math.abs(c.config.delta_x||0)+"px":e+"px";document.body.offsetHeight-f-k<0?(a.removeAttribute?a.removeAttribute("top"):a.removeProperty("top"),a.bottom=document.body.offsetHeight-f-2*(c.config.delta_y||0)+"px"):a.top=
f<0?h.y+Math.abs(c.config.delta_y||0)+"px":f+"px";a.visibility="visible";scheduler.callEvent("onTooltipDisplayed",[this.tooltip,this.tooltip.event_id])}}};dhtmlXTooltip._clearTimeout=function(){this.tooltip._timeout_id&&window.clearTimeout(this.tooltip._timeout_id)};dhtmlXTooltip.hide=function(){if(this.tooltip.parentNode){var b=this.tooltip.event_id;this.tooltip.event_id=null;this.tooltip.parentNode.removeChild(this.tooltip);scheduler.callEvent("onAfterTooltip",[b])}this._clearTimeout()};
dhtmlXTooltip.delay=function(b,d,c,g){this._clearTimeout();this.tooltip._timeout_id=setTimeout(function(){var a=b.apply(d,c);b=d=c=null;return a},g||this.config.timeout_to_display)};dhtmlXTooltip.isTooltip=function(b){var d=!1;for(b.className.split(" ");b&&!d;)d=b.className==this.tooltip.className,b=b.parentNode;return d};
dhtmlXTooltip.position=function(b){b=b||window.event;if(b.pageX||b.pageY)return{x:b.pageX,y:b.pageY};var d=window._isIE&&document.compatMode!="BackCompat"?document.documentElement:document.body;return{x:b.clientX+d.scrollLeft-d.clientLeft,y:b.clientY+d.scrollTop-d.clientTop}};
scheduler.attachEvent("onMouseMove",function(b,d){var c=window.event||d,g=c.target||c.srcElement,a=dhtmlXTooltip,h=a.isTooltip(g),i=a.isTooltipTarget&&a.isTooltipTarget(g);if(b||h||i){var e;if(b||a.tooltip.event_id){var f=scheduler.getEvent(b)||scheduler.getEvent(a.tooltip.event_id);if(!f)return;a.tooltip.event_id=f.id;e=scheduler.templates.tooltip_text(f.start_date,f.end_date,f);if(!e)return a.hide()}i&&(e="");var j=void 0;_isIE&&(j=document.createEventObject(c));scheduler.callEvent("onBeforeTooltip",
[b])&&e&&a.delay(a.show,a,[j||c,e])}else a.delay(a.hide,a,[],a.config.timeout_to_hide)});scheduler.attachEvent("onBeforeDrag",function(){dhtmlXTooltip.hide();return!0});scheduler.attachEvent("onEventDeleted",function(){dhtmlXTooltip.hide();return!0});scheduler.templates.tooltip_date_format=scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.tooltip_text=function(b,d,c){return"<b>Event:</b> "+c.text+"<br/><b>Start date:</b> "+scheduler.templates.tooltip_date_format(b)+"<br/><b>End date:</b> "+scheduler.templates.tooltip_date_format(d)};
