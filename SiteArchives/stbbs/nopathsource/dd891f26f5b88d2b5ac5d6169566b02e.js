Toolbar=(function(){var FA_TOOLBAR="fa_toolbar",LEFT="fa_left",SEARCH="fa_search",MAGNIFIER="fa_magnifier",TEXTAREA="fa_textarea",SHARE="fa_share",RIGHT="fa_right",FA_TOOLBAR_HIDDEN="fa_toolbar_hidden",ICON="fa_icon",SERVICE="fa_service",SHARE_TEXT="fa_share_text",FB="fa_fb",TWITTER="fa_twitter",MAIL="fa_mail",MAIL_FORM="fa_mail_form",RSS="fa_rss",MENU="fa_menu",FA_USERMENU="fa_usermenu",FA_MENULIST="fa_menulist",HIDE="fa_hide",SHOW="fa_show",WELCOME="fa_welcome",NOTIFICATIONS="fa_notifications",NOTIF_LIST='notif_list',NOTIF_UNREAD='notif_unread',LIVE_NOTIF='live_notif',SEPARATOR="fa_separator",TOOLBAR_STATE='toolbar_state',_notifications=[],_isDeleting=false,_internalProtocol=(location.protocol=="https:")?"https:":"http:",_config={},init=function(tbParams){_setConfig(tbParams);if(_userdata['activate_toolbar']){if(_userdata['session_logged_in']&&_userdata['notifications']){FA.Debugger.log('register');if(FA.Window.loaded){FA.Notification.register()}else{$(window).load(function(){window.setTimeout(FA.Notification.register,100)})}}if(_userdata['tpl_mobile']=='mobi_modern'){$('#'+LIVE_NOTIF).css('right',($('#'+HIDE).outerWidth(true)-1)+'px');if(_userdata['fix_toolbar']){$('#'+FA_TOOLBAR_HIDDEN).addClass('fa_fix')}$(document).click(function(e){switch(e.target.id){case NOTIFICATIONS:if($('#'+RIGHT).toggleClass('notification').hasClass('notification')){$('.ellipsis').dotdotdot();if($('#'+RIGHT).hasClass('welcome')){$('#'+RIGHT).removeClass('welcome')}if(!FA.Notification.registered()){FA.Notification.register()}}else{FA.Notification.markAsRead()}e.stopPropagation();break;default:if(jQuery.contains($('#'+NOTIF_LIST),e.target)){if($(e.target).hasClass('delete')){_delItem($('#'+NOTIF_LIST+' li').index($(e.target).parents('li')),true);e.stopPropagation();return false}}else{if($('#'+RIGHT).hasClass('welcome')){$('#'+RIGHT).removeClass('welcome')}if($('#'+RIGHT).hasClass('notification')){$('#'+RIGHT).removeClass('notification');FA.Notification.markAsRead()}}break}});return}document.body.insertBefore(_createFaToolbarHidden(),document.body.firstChild);document.body.insertBefore(_createFaToolbar(),document.body.firstChild);_alignMenu();_alignNotifications();$('#'+LIVE_NOTIF).css('right',($('#'+HIDE).outerWidth(true)-1)+'px');if(_userdata['fix_toolbar']){$('#'+FA_TOOLBAR).addClass('fa_fix');$('#'+FA_TOOLBAR_HIDDEN).addClass('fa_fix')}_onResize();$(window).resize(_onResize);_manageStateAndCSS();$(document).click(function(e){var e=e||window.event;if(typeof(e)!="object"){return true}var button=e.which||e.button;if(button!=1&&button!=2){return true}var options='menubar=no, status=no, scrollbars=no, width=800, height=600';switch(e.target.id){case MAGNIFIER:document.getElementById(TEXTAREA).focus();e.stopPropagation();break;case FB:window.open('https://www.facebook.com/sharer.php?u='+window.location,'',options);e.stopPropagation();break;case TWITTER:window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent($('title').text())+'&url='+encodeURIComponent(window.location)+'&via='+_lang.Twitter,'',options);e.stopPropagation();break;case WELCOME:if($('#'+RIGHT).toggleClass('welcome').hasClass('welcome')&&$('#'+RIGHT).hasClass('notification')){$('#'+RIGHT).removeClass('notification');FA.Notification.markAsRead()}e.stopPropagation();break;case NOTIFICATIONS:if($('#'+RIGHT).toggleClass('notification').hasClass('notification')){$('.ellipsis').dotdotdot();if($('#'+RIGHT).hasClass('welcome')){$('#'+RIGHT).removeClass('welcome')}if(!FA.Notification.registered()){FA.Notification.register()}}else{FA.Notification.markAsRead()}e.stopPropagation();break;case HIDE:_moveUp();$('#headerbar-top').toggleClass('w-toolbar');e.stopPropagation();break;case SHOW:_moveDown();$('#headerbar-top').toggleClass('w-toolbar');e.stopPropagation();break;default:if(jQuery.contains($('#'+NOTIF_LIST),e.target)){if($(e.target).hasClass('delete')){_delItem($('#'+NOTIF_LIST+' li').index($(e.target).parents('li')),true);e.stopPropagation();return false}}else{if($('#'+RIGHT).hasClass('welcome')){$('#'+RIGHT).removeClass('welcome')}if($('#'+RIGHT).hasClass('notification')){$('#'+RIGHT).removeClass('notification');FA.Notification.markAsRead()}}}})}},_createFaToolbar=function(){var fa_toolbar=document.createElement('div');fa_toolbar.id=FA_TOOLBAR;fa_toolbar.className="fa_toolbar_XL_Sized";fa_toolbar.appendChild(_createRight());fa_toolbar.appendChild(_createLeft());fa_toolbar.appendChild(_createSearch());fa_toolbar.appendChild(_createShare());return fa_toolbar},_createLeft=function(){var left=document.createElement('span');var icon=document.createElement('a');var a=document.createElement('a');left.id=LEFT;left.className="fa_tbMainElement";icon.id=ICON;a.id=SERVICE;(typeof a.innerText=='undefined')?a.textContent=_board['Forumotion']:a.innerText=_board['Forumotion'];if(_board['toolbar_title_url']){icon.href=_board['toolbar_title_url'];icon.target='_blank';a.href=_board['toolbar_title_url'];a.target='_blank'}if(_board['toolbar_logo']){left.appendChild(icon)}else{$(a).css('margin-left','20px')}left.appendChild(a);return left},_createSearch=function(){var search=document.createElement('div');var form=document.createElement('form');var magnifier=document.createElement('a');var textarea=document.createElement('input');search.id=SEARCH;search.className="fa_tbMainElement";form.method='get';form.action='/search';magnifier.id=MAGNIFIER;textarea.id=TEXTAREA;textarea.type='text';textarea.name='search_keywords';search.appendChild(form);form.appendChild(magnifier);form.appendChild(textarea);return search},_createShare=function(){var share=document.createElement('span');var shareText=document.createElement('span');var fb=document.createElement('a');var twitter=document.createElement('a');var mail=document.createElement('a');var rss=document.createElement('a');share.id=SHARE;share.className="fa_tbMainElement";shareText.id=SHARE_TEXT;(typeof shareText.innerText=='undefined')?shareText.textContent=_lang['Share']+' : ':shareText.innerText=_lang['Share']+' : ';fb.id=FB;twitter.id=TWITTER;mail.id=MAIL;mail.href='mailto:?body='+window.location.href;mail.target='_blank';rss.id=RSS;rss.href=_internalProtocol+'//'+window.location.hostname+'/rss';rss.target='_blank';share.appendChild(shareText);share.appendChild(fb);share.appendChild(twitter);share.appendChild(mail);share.appendChild(rss);return share},_createRight=function(){var right=document.createElement('div');var hide=document.createElement('a');right.id=RIGHT;right.className="fa_tbMainElement";hide.id=HIDE;hide.className="rightHeaderLink";if(!_userdata['session_logged_in']){var login=document.createElement('a');login.className="rightHeaderLink";var register=document.createElement('a');register.className="rightHeaderLink";(typeof login.innerText=='undefined')?login.textContent=_lang['Login']:login.innerText=_lang['Login'];login.href=_internalProtocol+'//'+window.location.hostname+'/login';(typeof register.innerText=='undefined')?register.textContent=_lang['Register']:register.innerText=_lang['Register'];register.href=_internalProtocol+'//'+window.location.hostname+'/register';right.appendChild(login);right.appendChild(register)}else{var divMenu=document.createElement('div'),welcome=document.createElement('a'),menu=_createMenu(),notifications=_userdata['notifications']?document.createElement('a'):document.createElement('span'),notifCase=((notifications&&_userdata['notifications'])?1:((notifications&&!_userdata['notifications'])?2:0));divMenu.id=MENU;welcome.id=WELCOME;($(welcome).html(_dynTruncateUsername(_lang['Welcome']+' '+_userdata['username'],150)));if(notifCase===1){var notif_unread=document.createElement('span'),live_notif=document.createElement('div'),notif_list=document.createElement('ul'),notif_view=document.createElement('li'),notif_view_link=document.createElement('a');notifications.id=NOTIFICATIONS;notifications.className="rightHeaderLink";(typeof notifications.innerText=='undefined')?notifications.textContent=_lang['Notifications']:notifications.innerText=_lang['Notifications'];notif_unread.id=NOTIF_UNREAD;notifications.appendChild(notif_unread);notif_list.id=NOTIF_LIST;notif_view.className='see_all';notif_view_link.href='/profile?mode=editprofile&page_profil=notifications';notif_list.appendChild(notif_view).appendChild(notif_view_link).appendChild(document.createTextNode(_lang['Notif_see_all']));live_notif.id=LIVE_NOTIF;$(live_notif).css({width:'330px',position:'absolute'})}else if(notifCase===2){notifications.className="rightHeaderLink";if(typeof(notifications.innerHTML)=='undefined'){notifications.textContent='\u00a0'}else{notifications.innerHTML='\u00a0'}}divMenu.appendChild(welcome);divMenu.appendChild(menu);right.appendChild(divMenu);if(notifCase===1){right.appendChild(notifications);right.appendChild(notif_list);right.appendChild(live_notif)}else if(notifCase===2){right.appendChild(notifications)}}right.appendChild(hide);return right},_createMenu=function(){var menu=document.createElement('ul');var see=_createSubMenu(_lang['See_my_profile'],_internalProtocol+'//'+window.location.hostname+'/u'+_userdata['user_id']);var config=_createSubMenu(_lang['Edit_profile'],_internalProtocol+'//'+window.location.hostname+'/profile?mode=editprofile&page_profil=preferences');var separator1=document.createElement('li');var topics=_createSubMenu(_lang['All_Topics'],_internalProtocol+'//'+window.location.hostname+'/sta/'+encodeURIComponent(_userdata['username']));var posts=_createSubMenu(_lang['All_Messages'],_internalProtocol+'//'+window.location.hostname+'/spa/'+encodeURIComponent(_userdata['username']));var followed=_createSubMenu(_lang['js_topics_followed'],_internalProtocol+'//'+window.location.hostname+'/search?search_id=watchsearch');var separator2=document.createElement('li');var logout=_createSubMenu(_lang['Logout'],_internalProtocol+'//'+window.location.hostname+'/login?logout=1');var mps=_createSubMenu(_lang['All_PMs'],_internalProtocol+'//'+window.location.hostname+'/privmsg?folder=inbox');var userMenu=_createUserMenu();separator1.className=SEPARATOR;separator2.className=SEPARATOR;menu.id=FA_MENULIST;menu.appendChild(userMenu);menu.appendChild(see);menu.appendChild(config);menu.appendChild(separator1);menu.appendChild(topics);menu.appendChild(posts);menu.appendChild(followed);menu.appendChild(mps);menu.appendChild(separator2);if(_userdata['user_level']=="1"){var pa=_createSubMenu(_lang['Admin_panel'],_internalProtocol+'//'+window.location.hostname+'/admin');menu.appendChild(pa)}menu.appendChild(logout);return menu},_createUserMenu=function(){var userMenu=document.createElement('div');var avatar=_userdata['avatar'];var rankTitle='<a id="fa_ranktitle" title="'+_lang['rank_title'].replace(/<\/?[^>]+>/gi,'')+'">'+_lang['rank_title']+'</a>';var table='<table><tbody>';table+='<tr><td class="first">'+_lang['Posts']+'</td><td> : </td>';table+='<td class="bold">'+_userdata['user_posts']+'</td></tr>';table+='<tr><td class="first">'+_lang['PMs']+'</td><td> : </td>';table+='<td class="bold">'+_userdata['user_nb_privmsg']+'</td></tr>';if(_board['reputation_active']){table+='<tr><td class="first">'+_lang['Reputation']+'</td><td> : </td>';table+='<td class="bold">'+_userdata['point_reputation']+'</td></tr>'}table+='</tbody></table>';userMenu.id=FA_USERMENU;$(userMenu).append(avatar).append(rankTitle).append(table);return userMenu},_createSubMenu=function(textContent,href){var a=document.createElement('a');var li=document.createElement('li');(typeof a.innerText=='undefined')?a.textContent=textContent:a.innerText=textContent;a.href=href;li.appendChild(a);return li},_createFaToolbarHidden=function(){var fa_toolbar_hidden=document.createElement('div');var show=document.createElement('a');fa_toolbar_hidden.id=FA_TOOLBAR_HIDDEN;show.id=SHOW;fa_toolbar_hidden.appendChild(show);return fa_toolbar_hidden},_alignMenu=function(){try{var welcome_pos=($("#"+WELCOME).length>0)?$("#"+WELCOME).position():null;if((welcome_pos!=null)&&(typeof(welcome_pos)!='undefined')){$("#"+MENU+"> ul").attr("style","");var margin=welcome_pos.left+$("#"+WELCOME).outerWidth(true)-$("#"+MENU+"> ul").outerWidth(true)+1;$("#"+MENU+"> ul").css("left",(margin>0?margin:0))}else{var margin=(_userdata['notifications']?$("#"+NOTIFICATIONS).outerWidth(true):0)+$("#"+HIDE).outerWidth(true)-1;$("#"+MENU+"> ul").attr("style","").css("right",margin)}}catch(e){var margin=(_userdata['notifications']?$("#"+NOTIFICATIONS).outerWidth(true):0)+$("#"+HIDE).outerWidth(true)-1;$("#"+MENU+"> ul").attr("style","").css("right",margin)}},_alignNotifications=function(){try{var notif_pos=($("#"+NOTIFICATIONS).length>0)?$("#"+NOTIFICATIONS).position():null;if((notif_pos!=null)&&(typeof(notif_pos)!='undefined')){$("#"+NOTIF_LIST).attr("style","");var margin=notif_pos.left+$("#"+NOTIFICATIONS).outerWidth(true)-$("#"+NOTIF_LIST).outerWidth(true)+1;$("#"+NOTIF_LIST).css("left",(margin>0?margin:0))}else{$('#'+NOTIF_LIST).css('right',($('#'+HIDE).outerWidth(true)-1)+'px')}}catch(e){$('#'+NOTIF_LIST).css('right',($('#'+HIDE).outerWidth(true)-1)+'px')}},_dynTruncateUsername=function(username,textSize){var styleItems=['font-size','font-weight','font-family'];var styleValues={};for(var name in styleItems){if(typeof styleItems[name]=='function')continue;styleValues[styleItems[name]]=$("#"+WELCOME).css(styleItems[name])}return _truncateText({text:username,maxWidth:textSize,'style':styleValues})},_intval=function(value){try{value=parseInt(value,10);if(isNaN(value)){value=0}}catch(e){value=0}return value},_truncateText=function(params){var truncated=null;var maxWidth=0;var original="";var defaults={text:"",maxWidth:0,style:{'font-size':'12px','font-weight':'normal','font-family':'Arial'}};var params=$.extend(true,{},defaults,params);try{maxWidth=parseInt(params.maxWidth,10);if(isNaN(maxWidth)){maxWidth=0}if(maxWidth>0){if((params.text!=null)&&(typeof(params.text)=="string")){original=params.text}if(original.length>0){var div=document.createElement('div');document.body.appendChild(div);$(div).css({position:'absolute',left:-1000,top:-1000,display:'none','font-size':params.style['font-size'],'font-weight':params.style['font-weight'],'font-family':params.style['font-family']});$(div).text(original);if($(div).width()>maxWidth){do{original=original.substring(0,original.length-1);$(div).text(original+"...")}while(($(div).width()>maxWidth)&&(original.length>0));truncated=original+"..."}else{truncated=original}$(div).remove()}}}catch(e){truncated=null}finally{return truncated}},_stripTags=function(){return this.replaceWith(this.html().replace(/<\/?[^>]+>/gi,''))};_manageStateAndCSS=function(){if(_userdata['fix_toolbar']){if($.cookie(TOOLBAR_STATE)==HIDE){$("#"+FA_TOOLBAR).css({marginTop:(0-_config.tbHeight)+'px'});$("#"+FA_TOOLBAR_HIDDEN).css({marginTop:"+="+(2*_config.tbHeight)+"px"})}else{$("body").css({marginTop:_config.tbHeight+"px"});$.cookie(TOOLBAR_STATE,SHOW);if(_config.tbTemplate=='modernbb'){$('#headerbar-top').addClass('w-toolbar');if($(window).scrollTop()>=_config.tbHeight){$('#headerbar-top').addClass('is-sticky')}}}}else{if($.cookie(TOOLBAR_STATE)==HIDE){$("#"+FA_TOOLBAR).css({marginTop:($("#"+FA_TOOLBAR).offset().top-_config.tbHeight)+'px'});$("#"+FA_TOOLBAR_HIDDEN).css({marginTop:"+="+(2*_config.tbHeight)+"px"})}else{$.cookie(TOOLBAR_STATE,SHOW)}}},_moveUp=function(){if($.cookie(TOOLBAR_STATE)&&$.cookie(TOOLBAR_STATE)==SHOW){$.cookie(TOOLBAR_STATE,HIDE);$("#"+FA_TOOLBAR).animate({marginTop:"-="+_config.tbHeight+"px"});if(_userdata['fix_toolbar']){$("body").animate({marginTop:"0px"})}$("#"+FA_TOOLBAR_HIDDEN).animate({marginTop:"+="+(2*_config.tbHeight)+"px"})}if($('#'+RIGHT).hasClass('welcome')||$('#'+RIGHT).hasClass('notification')){$('#'+RIGHT).removeClass('welcome notification')}},_moveDown=function(){if($.cookie(TOOLBAR_STATE)&&$.cookie(TOOLBAR_STATE)==HIDE){$.cookie(TOOLBAR_STATE,SHOW);$("#"+FA_TOOLBAR).animate({marginTop:"+="+_config.tbHeight+"px"});if(_userdata['fix_toolbar']){$("body").animate({marginTop:_config.tbHeight+"px"})}$("#"+FA_TOOLBAR_HIDDEN).animate({marginTop:"-="+(2*_config.tbHeight)+"px"})}},_onResize=function(e){var windowWidth=$(window).width();var toolbarSizeClass='';$($('#'+FA_TOOLBAR).attr('class').split(" ")).each(function(index,item){if((item!=null)&&(item!="")){if(item.match(/^fa_toolbar_(XL|L|M|S){1}_Sized$/g)!==null){toolbarSizeClass=item}}});if(toolbarSizeClass!=""){$('#'+FA_TOOLBAR).removeClass(toolbarSizeClass)}if(windowWidth<519){$('#'+SHARE).addClass('fa_hide');$('#'+SEARCH).addClass('fa_hide');$('#'+FA_TOOLBAR).removeClass('fa_fix');$('#'+FA_TOOLBAR_HIDDEN).removeClass('fa_fix')}else if(windowWidth<774){$('#'+SHARE).addClass('fa_hide');$('#'+SEARCH).addClass('fa_hide');$('#'+FA_TOOLBAR).addClass('fa_toolbar_M_Sized');if(_userdata['fix_toolbar']){$('#'+FA_TOOLBAR).addClass('fa_fix');$('#'+FA_TOOLBAR_HIDDEN).addClass('fa_fix')}}else if(windowWidth<980){$('#'+SHARE).removeClass('fa_hide');$('#'+SEARCH).addClass('fa_hide');$('#'+FA_TOOLBAR).addClass('fa_toolbar_L_Sized');if(_userdata['fix_toolbar']){$('#'+FA_TOOLBAR).addClass('fa_fix');$('#'+FA_TOOLBAR_HIDDEN).addClass('fa_fix')}}else{$('#'+SHARE).removeClass('fa_hide');$('#'+SEARCH).removeClass('fa_hide');$('#'+FA_TOOLBAR).addClass('fa_toolbar_XL_Sized');if(_userdata['fix_toolbar']){$('#'+FA_TOOLBAR).addClass('fa_fix');$('#'+FA_TOOLBAR_HIDDEN).addClass('fa_fix')}}_alignMenu();_alignNotifications()},_delItem=function(i,uiAction){if(uiAction&&_isDeleting){return false}_isDeleting=true;var _li=$('#'+NOTIF_LIST).children().get(i),_lilog=_li.cloneNode(true);FA.Debugger.log('_delItem #'+i,_lilog);if(uiAction){FA.Notification.delItem({index:i})}$(_li).fadeOut(200,function(){$(this).remove();_alignNotifications();_isDeleting=false})},_addItem=function(i,data){var _dummy_notif,_text,_args,_maindiv,_divtext;FA.Debugger.log('_addItem2 #'+i,data);_dummy_notif=document.createElement('li');_dummy_notif.setAttribute('id',"n"+data.text.id);if(!data.read){_dummy_notif.className='unread'}_maindiv=document.createElement('div');_maindiv.className="content";_divtext=document.createElement('div');_divtext.className="contentText ellipsis";_text=compileNotif(data);if(_text){$(_divtext).html(_text)}else{_divtext.appendChild(document.createTextNode('#'+i+' '+JSON.stringify(data)))}if($("#"+NOTIF_LIST+" li").length>1){_maindiv.appendChild(document.createElement('hr'))}_maindiv.appendChild(_divtext);$(_maindiv.appendChild(document.createElement('a'))).addClass('delete').attr('href','#');_dummy_notif.appendChild(_maindiv);$('#'+NOTIF_LIST+' li:nth-child('+i+')').before($(_dummy_notif).hide().fadeIn(200,function(){_alignNotifications()}))},_readItem=function(i){FA.Debugger.log('_readItem #'+i);$('#'+NOTIF_LIST+' li:nth-child('+(i+1)+')').removeClass('unread')},refresh=function(o){var _i,_j,_length=0,_open='',_close='';FA.Debugger.log(jQuery.extend({},o));if(typeof o.unread!='undefined'){if(o.unread){_toolbar.notifications.unread=o.unread;if(!_userdata['tpl_mobile']!='mobi_modern'){_open='(';_close=')'}$('#'+NOTIF_UNREAD).text(_open+o.unread+_close);$('#'+NOTIFICATIONS).addClass('unread')}else{$('#'+NOTIFICATIONS).removeClass('unread');_toolbar.notifications.unread=0}}if(o.map){for(_i in o.map){if(typeof o.map[_i]=='function')continue;_length++;_i=parseInt(_i);FA.Debugger.log('-------',_i,o.set[_i],o.data[o.set[_i]],o.data);if(o.map[_i]===null){_addItem(parseInt(_i)+1,o.data[o.set[_i]])}else{FA.Debugger.log(o.data[o.set[_i]].read,!o.data[o.set[_i]].read,o.data[o.set[_i]].read==1);if(o.data[o.set[_i]].read){_readItem(_i)}}}for(_i=0,_j=_length-o.max;_i<_j;++_i){_delItem(_i)}}},_setConfig=function(data){if(typeof(data)!=="object"){data={}}_config=$.extend({tbHeight:30,tbTemplate:""},data);_config.tbHeight=_intval(_config.tbHeight);if(_config.tbHeight==0){_config.tbHeight=30}},compileNotif=function(data){var _text;switch(data.text.type){case FA.Notification.NOTIF_PRIV_MSG:_args={id:data.text.from.id,name:data.text.from.name,msg_id:data.text.msg_id,nid:data.text.id};_text=jQuery.vsprintf(_lang['Notif_priv_msg'],[_args])||false;break;case FA.Notification.NOTIF_REPORT:_args={id:data.text.from.id,name:data.text.from.name,nid:data.text.id};_text=jQuery.vsprintf(_lang['Notif_report'],[_args])||false;break;case FA.Notification.NOTIF_FRIEND_REQ:_args={id:data.text.from.id,name:data.text.from.name,nid:data.text.id};_text=jQuery.vsprintf(_lang['Notif_friend_req'],[_args])||false;break;case FA.Notification.NOTIF_GROUP_REQ:_args={id:data.text.from.id,name:data.text.from.name,group_id:data.text.group.id,group_url_name:data.text.group.url_name,group_name:data.text.group.name,nid:data.text.id};_text=jQuery.vsprintf(_lang['Notif_group_req'],[_args])||false;break;case FA.Notification.NOTIF_FRIEND_CON:_args={id:data.text.from.id,name:data.text.from.name,nid:data.text.id};_text=jQuery.vsprintf(_lang['Notif_friend_con'],[_args])||false;break;case FA.Notification.NOTIF_WALL_MSG:_args={id:data.text.from.id,name:data.text.from.name,self:data.text.self,nid:data.text.id};_text=jQuery.vsprintf(_lang['Notif_wall_msg'],[_args])||false;break;case FA.Notification.NOTIF_ABUSE:_args={nid:data.text.id};_text=jQuery.vsprintf(_lang['Notif_abuse'],[_args])||false;break;case FA.Notification.NOTIF_TOPIC_WATCH:_args={id:data.text.from.id,name:data.text.from.name,topic_id:data.text.post.topic_id,topic_name:data.text.post.topic_name,post_id:data.text.post.post_id,nid:data.text.id};if(data.text.post.start){_args.start=data.text.post.start}FA.Debugger.log('compileNotif()',_lang['Notif_topic_watch_p'],_lang['Notif_topic_watch'],_args);_text=jQuery.vsprintf(_args.start?_lang['Notif_topic_watch_p'+(_args.id==-1?'_guest':'')]:_lang['Notif_topic_watch'+(_args.id==-1?'_guest':'')],[_args])||false;break;case FA.Notification.NOTIF_MENTION:_args={id:data.text.from.id,name:data.text.from.name,topic_id:data.text.post.topic_id,topic_name:data.text.post.topic_name,post_id:data.text.post.post_id,nid:data.text.id,start:data.text.post.start};_text=jQuery.vsprintf(_lang['Notif_mention'],[_args])||false;break;case FA.Notification.NOTIF_HASHTAG:_args={id:data.text.from.id,name:data.text.from.name,topic_id:data.text.post.topic_id,topic_name:data.text.post.topic_name,post_id:data.text.post.post_id,tag:data.text.tag,nid:data.text.id,start:data.text.post.start};_text=jQuery.vsprintf(_lang['Notif_hashtag'],[_args])||false;break;case FA.Notification.NOTIF_ADVERT:_args={ad_id:data.text.post.ad_id,ad_title:data.text.post.ad_title,ad_url:data.text.post.ad_url,forum_id:data.text.post.forum_id,nid:data.text.id};_text=jQuery.vsprintf(_lang['Notif_advert_'+data.text.post.type],[_args])||false;break}return _text};return{FA_TOOLBAR:FA_TOOLBAR,LEFT:LEFT,SEARCH:SEARCH,MAGNIFIER:MAGNIFIER,TEXTAREA:TEXTAREA,SHARE:SHARE,RIGHT:RIGHT,FA_TOOLBAR_HIDDEN:FA_TOOLBAR_HIDDEN,ICON:ICON,SERVICE:SERVICE,SHARE_TEXT:SHARE_TEXT,FB:FB,TWITTER:TWITTER,MAIL:MAIL,MAIL_FORM:MAIL_FORM,RSS:RSS,MENU:MENU,HIDE:HIDE,SHOW:SHOW,WELCOME:WELCOME,NOTIFICATIONS:NOTIFICATIONS,NOTIF_LIST:NOTIF_LIST,NOTIF_UNREAD:NOTIF_UNREAD,LIVE_NOTIF:LIVE_NOTIF,compileNotif:compileNotif,_alignNotifications:_alignNotifications,init:init,refresh:refresh}})();var _toolbar={notifications:{unread:0,},};