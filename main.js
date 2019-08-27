/**
 * @author Denis Nikolaev (kroscw) 
 * @company OOO "WhiteHack" 
 */

var servResponse = document.querySelector('#response');

document.forms.ourForm.onsubmit = function(e)
{
	e.preventDefault();
	send_post_form_req('form.php', document.forms.ourForm, function(resp){servResponse.innerHTML = resp;});
};

/**
 * send ajax message for server, methods POST and GET (type_req=1/0)
 * without form! 
 * [send_req description]
 * @param  {[type]} handler_script [description]
 * @param  {[type]} obj            [description]
 * @param  {[type]} func           [description]
 * @param  {Number} type_req       [description]
 * @param  {String} header_request [description]
 * @param  {String} value_request  [description]
 * @return {[type]}                [description]
 */
function send_req(handler_script, obj, func, type_req = 1, header_request='Content-Type', value_request='application/x-www-form-urlencoded')
{
	let keys = Object.keys(obj);
	let count = keys.length;
	if(count>0)
	{
		let request=keys[0]+'='+obj[keys[0]];
		
		if(count>1)
		{
			for(var k = 1; k < count; k++)
			{
				request += '&' + keys[k] + '=' + obj[keys[k]];
			}
		}
		request = encodeURIComponent(request);
	}
	
	var xhr = new XMLHttpRequest();

	if(type_req==1)
	{
		xhr.open('POST', handler_script);
	}
	else if(type_req==0) 
	{
		xhr.open('GET', handler_script+"?"+request);
	}

	xhr.setRequestHeader(header_request, value_request);

	xhr.onreadystatechange = function()
	{
		if(xhr.readyState === 4 && xhr.status === 200)
		{
			func(xhr.responseText);
		}
	};

	if(type_req==1)
		xhr.send(request);
}

/**
 * send ajax message for server, method POST with FORM
 * [send_post_form_req description]
 * @param  {[type]} handler_script [description]
 * @param  {[type]} func           [description]
 * @param  {[type]} my_form        [description]
 * @param  {String} header_request [description]
 * @param  {String} value_request  [description]
 * @return {[type]}                [description]
 */
function send_post_form_req(handler_script, my_form, func)
{

	var xhr = new XMLHttpRequest();

	xhr.open('POST',handler_script);

	var form_data = new FormData(my_form);
	alert(form_data);

	xhr.onreadystatechange = function()
	{
		if(xhr.readyState === 4 && xhr.status === 200)
		{
			alert(xhr.responseText);
			func(xhr.responseText);
		}
	};

	xhr.send(form_data);
}