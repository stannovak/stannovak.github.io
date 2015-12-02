!function(r,t){"use strict";r.formUtils.addValidator({name:"spamcheck",validatorFunction:function(r,t){var e=t.valAttr("captcha");return e===r},errorMessage:"",errorMessageKey:"badSecurityAnswer"}),r.formUtils.addValidator({name:"confirmation",validatorFunction:function(r,t,e,a,n){var o="",i=t.valAttr("confirm")||t.attr("name")+"_confirmation",l=n.find('[name="'+i+'"]').eq(0);return l?o=l.val():alert('Could not find an input with name "'+i+'"'),r===o},errorMessage:"",errorMessageKey:"notConfirmed"});var e={amex:[15,15],diners_club:[14,14],cjb:[16,16],laser:[16,19],visa:[16,16],mastercard:[16,16],maestro:[12,19],discover:[16,16]},a=!1,n=!1;r.formUtils.addValidator({name:"creditcard",validatorFunction:function(o,i){var l=r.split(i.valAttr("allowing")||"");if(n=r.inArray("amex",l)>-1,a=n&&1===l.length,l.length>0){var d=!1;if(r.each(l,function(r,a){if(a in e){if(o.length>=e[a][0]&&o.length<=e[a][1])return d=!0,!1}else t.console&&console.warn('Use of unknown credit card "'+a+'"')}),!d)return!1}if(o=o.replace(/\s/g,""),""!==o.replace(new RegExp("[0-9]","g"),""))return!1;var s=0;return r.each(o.split("").reverse(),function(r,t){t=parseInt(t,10),r%2===0?s+=t:(t*=2,s+=10>t?t:t-9)}),s%10===0},errorMessage:"",errorMessageKey:"badCreditCard"}),r.formUtils.addValidator({name:"cvv",validatorFunction:function(r){return""===r.replace(/[0-9]/g,"")?(r+="",a?4===r.length:n?3===r.length||4===r.length:3===r.length):!1},errorMessage:"",errorMessageKey:"badCVV"}),r.formUtils.addValidator({name:"strength",validatorFunction:function(t,e){var a=e.valAttr("strength")||2;return a&&a>3&&(a=3),r.formUtils.validators.validate_strength.calculatePasswordStrength(t)>=a},errorMessage:"",errorMessageKey:"badStrength",calculatePasswordStrength:function(r){if(r.length<4)return 0;var t=0,e=function(r,t){for(var e="",a=0;a<t.length;a++){for(var n=!0,o=0;r>o&&o+a+r<t.length;o++)n=n&&t.charAt(o+a)===t.charAt(o+a+r);r>o&&(n=!1),n?(a+=r-1,n=!1):e+=t.charAt(a)}return e};return t+=4*r.length,t+=1*(e(1,r).length-r.length),t+=1*(e(2,r).length-r.length),t+=1*(e(3,r).length-r.length),t+=1*(e(4,r).length-r.length),r.match(/(.*[0-9].*[0-9].*[0-9])/)&&(t+=5),r.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)&&(t+=5),r.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)&&(t+=10),r.match(/([a-zA-Z])/)&&r.match(/([0-9])/)&&(t+=15),r.match(/([!,@,#,$,%,^,&,*,?,_,~])/)&&r.match(/([0-9])/)&&(t+=15),r.match(/([!,@,#,$,%,^,&,*,?,_,~])/)&&r.match(/([a-zA-Z])/)&&(t+=15),(r.match(/^\w+$/)||r.match(/^\d+$/))&&(t-=10),0>t&&(t=0),t>100&&(t=100),20>t?0:40>t?1:60>=t?2:3},strengthDisplay:function(t,e){var a={fontSize:"12pt",padding:"4px",bad:"Very bad",weak:"Weak",good:"Good",strong:"Strong"};e&&r.extend(a,e),t.bind("keyup",function(){var t=r(this).val(),e="undefined"==typeof a.parent?r(this).parent():r(a.parent),n=e.find(".strength-meter"),o=r.formUtils.validators.validate_strength.calculatePasswordStrength(t),i={background:"pink",color:"#FF0000",fontWeight:"bold",border:"red solid 1px",borderWidth:"0px 0px 4px",display:"inline-block",fontSize:a.fontSize,padding:a.padding},l=a.bad;0===n.length&&(n=r("<span></span>"),n.addClass("strength-meter").appendTo(e)),t?n.show():n.hide(),1===o?l=a.weak:2===o?(i.background="lightyellow",i.borderColor="yellow",i.color="goldenrod",l=a.good):o>=3&&(i.background="lightgreen",i.borderColor="darkgreen",i.color="darkgreen",l=a.strong),n.css(i).text(l)})}});r.fn.displayPasswordStrength=function(t){return new r.formUtils.validators.validate_strength.strengthDisplay(this,t),this}}(jQuery,window);