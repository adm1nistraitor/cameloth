//#############################################################################
var g_nLastVisitCount;

function LastVisitSetCount(nCount)
{
	g_nLastVisitCount = nCount;
}

function LastVisitCheckAll()
{
	for (var i=0;i<g_nLastVisitCount;i++)
		eval('LastVisit'+i+'.checked=LastVisitAll.checked');
}

function LastVisitOpen()
{
	for (var i=g_nLastVisitCount-1;i>=0;i--)//for (var i=0;i<g_nLastVisitCount;i++)
	{
		if (eval('LastVisit'+i+'.checked'))
		{
			strUrl = external.gbGetLastVisit("Url"+i);
			if (strUrl.length<1)
				break;
			try{
			window.open(strUrl,'_blank');
			}catch(e){}
		}
	}
}

function LastVisitCopyUrl()
{
	var strTemp='';
	try{
	for (var i=0;i<g_nLastVisitCount;i++)
	{
		if (eval('LastVisit'+i+'.checked'))
		{
			strUrl = external.gbGetLastVisit("Url"+i);
			if (strUrl.length<1)
				break;
			strTemp += strUrl;
			strTemp += "\r\n";
		}
		
	}
	}catch(e){}
	if (strTemp.length>1)
		window.clipboardData.setData("Text", strTemp);
}

function LastVisitWriteHead()
{
	var strShowLastVisit = '1';
	try{
	strShowLastVisit = external.gbGetIni('ShowLastVisit');
	}catch(e){}

	if (strShowLastVisit=='1')
		document.write("<tbody id=LastVisitDiv>");
	else
		document.write("<tbody id=LastVisitDiv style='display: none'>");
}

function LastVisitWriteTail(i)
{
	document.write("</tbody></table>");
	LastVisitSetCount(i);
}

function LastVisitWrite()
{
	if (external.gbGetVersion==null)
		return;
	//
	document.writeln("<table id=1111 width=100% border=0 align=center cellspacing=1 bgcolor=#C6CFEF style=word-break:break-all>");
	document.writeln("  <tr>");
	document.writeln("    <td colspan=2 class=title1>");
	document.writeln("		<label style=cursor:pointer; onClick=external.gbExec(33109)>HakimBrowser�ϴη���ҳ��<\/label>");
	document.writeln("		<label style=cursor:pointer; onClick=LastVisitShow()>������\/��ʾ��<\/label>");
	document.writeln("    <\/td>");
	document.writeln("  <\/tr>");
	//
	LastVisitWriteHead();
	for (var i=0; i<50; i++)
	{
		strName = external.gbGetLastVisit("Name"+i);
		if (strName.length<1)
			break;
		strUrl = external.gbGetLastVisit("Url"+i);
		document.write("<tr><td width=22 bgcolor=#FFFFFF><input type=checkbox id=LastVisit"+i+" checked></td><td bgcolor=#FFFFFF align=left>��<a href="+strUrl+" title="+strUrl+">"+strName+"</a> <font color=#aaaaaa>("+strUrl+")</font></td></tr>");
	}
	if (i>0)
		document.write("<tr><td bgcolor=#FFFFFF><input type=checkbox id=LastVisitAll onClick='LastVisitCheckAll()' checked></td><td bgcolor=#FFFFFF align=left>��<input type=submit value='��ѡ�е���ַ' onClick='LastVisitOpen()'><input type=submit value='����ѡ�е���ַ' onClick='LastVisitCopyUrl()'></td></tr>");
	else
		document.write("<tr><td bgcolor=#FFFFFF align=left>���ϴη���ҳ��!</td></tr>");
	LastVisitWriteTail(i);
}

function LastVisitWriteEn()
{
	if (external.gbGetVersion==null)//if not HakimBrowser, not show lastvisit
		return;
	//
	document.writeln("<table id=1111 width=760 border=0 align=center cellspacing=1 bgcolor=#C6CFEF style=word-break:break-all>");
	document.writeln("  <tr>");
	document.writeln("    <td colspan=2 class=title1>");
	document.writeln("    	<label style=cursor:pointer; onClick=external.gbExec(33109)>Situs Terakhir di Kunjungi<\/label>");
	document.writeln("    	<label style=cursor:pointer; onClick=LastVisitShow()>[Sembunyi\/Tampilkan]<\/label>");
	document.writeln("    <\/td>");
	document.writeln("  <\/tr>");
	//
	LastVisitWriteHead();
	for (var i=0; i<50; i++)
	{
		strName = external.gbGetLastVisit("Name"+i);
		if (strName.length<1)
			break;
		strUrl = external.gbGetLastVisit("Url"+i);
		document.write("<tr><td width=22 bgcolor=#FFFFFF><input type=checkbox id=LastVisit"+i+" checked></td><td bgcolor=#FFFFFF align=left> <a href="+strUrl+" title="+strUrl+">"+strName+"</a> <font color=#aaaaaa>("+strUrl+")</font></td></tr>");
	}
	if (i>0)
		document.write("<tr><td bgcolor=#E7EFFF><input type=checkbox id=LastVisitAll onClick='LastVisitCheckAll()' checked></td><td bgcolor=#FFFFFF align=left> <input type=submit value='Open Selected URL' onClick='LastVisitOpen()'><input type=submit value='Copy Selected URL' onClick='LastVisitCopyUrl()'></td></tr>");
	else
		document.write("<tr><td bgcolor=#FFFFFF align=left>Dak Katek / Kosong!</td></tr>");
	LastVisitWriteTail(i);
}

function LastVisitShow()
{
	if (LastVisitDiv.style.display=="")
	{
		LastVisitDiv.style.display = "none";
		external.gbSetIni('ShowLastVisit','0');
	}
	else
	{
		LastVisitDiv.style.display = "";
		external.gbSetIni('ShowLastVisit','1');
	}
}
//#############################################################################
var g_SearchList = [
	["�ٶ�",	"http://www.baidu.com/s?tn=5igb_pg&wd="],
	["Google",	"http://www.google.cn/search?client=pub-5434506002917399&channel=2000052002&prog=aff&q="],
	["Ԫ����",	"http://www.bbmao.com/s?pd=100038&q="],
	["�ѹ�",	"http://www.sogou.com/sogou?pid=sogou-site-51d3fef2c0a81090&query="],
	["ͨ����ַ","http://name.cnnic.cn/cn.dll?pid=e_gb&name="],
	["����",	"http://news.baidu.com/ns?cl=2&rn=20&tn=news&word="],
	["ͼƬ",	"http://www.baidu.com/i?ct=201326592&cl=2&lm=-1&tn=baiduimage&word="],
	["���",	"http://www.skycn.com/search.php?sor=00&ss_name="],
	["�£�",	"http://www.gougou.com/search?id=1008860&ty=1&search="],
	["��¿",	"http://www.gougou.com/search?id=1008860&ty=2&search="],
	["MP3",		"http://www.gougou.com/search?id=1008860&search="],
	["���",	"http://mp3.gougou.com/lrc?id=1008860&search="],
	["��Ƶ",	"http://video.baidu.com/v?word="],
	["Ӱ��",	"http://movie.gougou.com/search?id=1008860&search="],
	["Flash",	"http://mp3.baidu.com/m?rn=&tn=baidump3&ct=134217728&lm=6&word="],
	["�ʵ�",	"http://www.baidu.com/baidu?ie=gb2312&bs=&sr=&z=&ct=1048576&cl=3&f=8&word="],
	["����",	"http://post.baidu.com/f?kw="],
	["֪��",	"http://zhidao.baidu.com/q?ct=17&pn=0&pt=5igb_ik&tn=ikaslist&rn=10&word="],
	["�ٿ�",	"http://baike.baidu.com/w?ct=17&lm=0&tn=baiduWikiSearch&pn=0&rn=10&word="],
	["�������Ϲ���",	"http://union.dangdang.com/transfer/transfer.aspx?from=427-40187&backurl=http://search.dangdang.com/search.aspx?key="],
];

var g_SearchListEn = [
	["Google",	"http://www.google.com/search?hl=en&q="],
	["Yahoo",	"http://search.yahoo.com/search?p="],
	["Bing",	"http://www.bing.com/search?q="],	
	["Ask",		"http://www.ask.com/web?q="],
	["Altavista",		"http://av.rds.yahoo.com/_ylt=A0oGkuNfgb5MKRwBZQNqCqMX;_ylu=X3oDMTBxMXBrZzZzBHBndANhdl93ZWJfaG9tZQRzZWMDc2VhcmNo/SIG=11u271p8v/EXP=1287639775/*-http%3A//us.yhs4.search.yahoo.com/yhs/search?q="],
	["Software","http://www.softpedia.com/dyn-search.php?x=0&y=0&search_term="],
	["Torrent",		"http://thepiratebay.org/search/"],
	["MP3",		"http://beemp3.com/index.php?q="],
	["Image",	"http://images.google.com/images?hl=en&q="],
	["News",	"http://news.google.com/news?hl=en&q="],
	["Blog",	"http://blogsearch.google.com/blogsearch?hl=en&q="],
	["Video",	"http://www.youtube.com/results?aq=f&search_query="],
	["Maps",	"http://maps.google.com/maps?hl=en&q="],
	["Books",	"http://books.google.com/books?q="],
	["Froogle",	"http://froogle.google.com/froogle?checkout=1&lmode=online&q="],
	["Taringa!",	"http://buscar.taringa.net/posts?&cat=musica&q="],
	["Dictionary","http://dictionary.reference.com/search?q="],
];

function RadioSearchSubmit(nType)
{
	if (RadioSearchForm.key.value=='')
		return false;
	var SearchList = (nType==0 ? g_SearchList : g_SearchListEn);
	var nLen = SearchList.length-1;
	for (var i=0; i<nLen; i++)
	{
		if(RadioSearchForm.item[i].checked)
		{
			window.open(SearchList[i][1]+RadioSearchForm.key.value,"g"+i);
			break;
		}
	}
	return false;
}

function RadioSearchWrite(nType)
{
	var SearchList = (nType==0 ? g_SearchList : g_SearchListEn);
	var nLen = SearchList.length-1;
	for (var i=0; i<nLen; i++)
	{
		document.write("<input type=radio name=item ",(i==0)?"checked='checked'":"","><a href=",SearchList[i][1],">",SearchList[i][0],"</a> ");
		if (i == (nType==0?9:7) )
			document.write("<br>")
	}
}

function CheckSearchSubmit(nType)
{
	if (CheckSearchForm.key.value=='')
		return false;
	var SearchList = (nType==0 ? g_SearchList : g_SearchListEn);		
	var nLen = SearchList.length-1;
	for (var i=0; i<nLen; i++)
	{
		if(CheckSearchForm.item[i].checked)
			window.open(SearchList[i][1]+CheckSearchForm.key.value,"g"+i);
	}
	return false;
}

function CheckSearchWrite(nType)
{
	var SearchList = (nType==0 ? g_SearchList : g_SearchListEn);
	var nLen = SearchList.length-1;
	for (var i=0; i<nLen; i++)
	{
		document.write("<input type=checkbox name=item ",(i<2)?"checked":"","><a href=",SearchList[i][1],">",SearchList[i][0],"</a> ");
		if (i == (nType==0?9:7) )
			document.write("<br>")
	}
}

//#############################################################################
var lunarInfo=new Array(
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)
var Gan=new Array("��","��","��","��","��","��","��","��","��","��")
var Zhi=new Array("��","��","��","î","��","��","��","δ","��","��","��","��")
var cmStr = new Array('��','��','��','��','��','��','��','��','��','��','ʮ','��','��')
var nStr1 = new Array('��','һ','��','��','��','��','��','��','��','��','ʮ')
var now;var SY;var SM;var SD

function cyclical(num) { return(Gan[num%10]+Zhi[num%12]) }

function lYearDays(y)
{
	var i, sum = 348
	for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0
	return(sum+leapDays(y))
}

function leapDays(y)
{
   if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29)
   else return(0)
}

function leapMonth(y) { return(lunarInfo[y-1900] & 0xf)}
function monthDays(y,m) { return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 )}

function Lunar(objDate)
{
	var i, leap=0, temp=0
	var baseDate = new Date(1900,0,31)
	var offset   = (objDate - baseDate)/86400000
	this.dayCyl = offset + 40
	this.monCyl = 14
	for(i=1900; i<2050 && offset>0; i++) {
	temp = lYearDays(i)
	offset -= temp
	this.monCyl += 12}
	if(offset<0) {
	offset += temp;
	i--;
	this.monCyl -= 12}
	this.year = i
	this.yearCyl = i-1864
	leap = leapMonth(i)
	this.isLeap = false
	for(i=1; i<13 && offset>0; i++) {
	if(leap>0 && i==(leap+1) && this.isLeap==false)
	{ --i; this.isLeap = true; temp = leapDays(this.year); }
	else
	{ temp = monthDays(this.year, i); }
	if(this.isLeap==true && i==(leap+1)) this.isLeap = false
	offset -= temp
	if(this.isLeap == false) this.monCyl ++}
	if(offset==0 && leap>0 && i==leap+1)
	if(this.isLeap)
	{ this.isLeap = false; }
	else
	{ this.isLeap = true; --i; --this.monCyl;}
	if(offset<0){ offset += temp; --i; --this.monCyl; }
	this.month = i
	this.day = offset + 1
}

function YYMMDD() {    return(SY+'��'+(SM+1)+'��'+SD+'��')}

function weekday()
{
    if (now.getDay() == 0 || now.getDay() == 6)
    	return '<font color=#178517>����'+nStr1[now.getDay()]+'</font>';
    else
    	return '����'+nStr1[now.getDay()];
}
function cDay(m,d)
{
	var nStr2 = new Array('��','ʮ','إ','ئ','��');var s
	s= cmStr[m]+'��'
	switch (d) {
	  case 10:s += '��ʮ'; break;
	  case 20:s += '��ʮ'; break;
	  case 30:s += '��ʮ'; break;
	  default:s += nStr2[Math.floor(d/10)]; s += nStr1[Math.round(d%10)];
	}
	return(s)
}

function solarDay()
{
	var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758)
	var solarTerm = new Array("С��","��","����","��ˮ","����","����","����","����","����","С��","â��","����","С��","����","����","����","��¶","���","��¶","˪��","����","Сѩ","��ѩ","����")
	var lFtv = new Array("0101*����","0115 Ԫ����","0505 �����","0707 ��Ϧ","0715 ��Ԫ��","0815 �����","0909 ������","1208 ���˽�","1224 С��","0100*��Ϧ")
	var sFtv = new Array("0101*Ԫ��","0214 ���˽�","0308 ��Ů��","0312 ֲ����","0401 ���˽�","0501 �Ͷ���","0504 �����","0512 ��ʿ��","0601 ��ͯ��","0701 ������","0801 ������","0910 ��ʦ��","1001*�����","1101 ��ʥ��","1108 ������","1225 ʥ����","0513 ĸ�׽�","1129 �ж���")
	var sDObj = new Date(SY,SM,SD);
	var lDObj = new Lunar(sDObj);
	var lDPOS = new Array(3)
	var festival='',solarTerms='',solarFestival='',lunarFestival='',solarTerms='',tmp1,tmp2;
	
	for(i in lFtv)
	if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
	tmp1=Number(RegExp.$1)-lDObj.month
	tmp2=Number(RegExp.$2)-lDObj.day
	if(tmp1==0 && tmp2==0) lunarFestival=RegExp.$4}
	if(lunarFestival=='')
	{
		for(i in sFtv)
		if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
		{
			tmp1=Number(RegExp.$1)-(SM+1)
			tmp2=Number(RegExp.$2)-SD
			if(tmp1==0 && tmp2==0) solarFestival = RegExp.$4
		}
		if(solarFestival =='')
		{
			tmp1 = new Date((31556925974.7*(SY-1900)+sTermInfo[SM*2+1]*60000)+Date.UTC(1900,0,6,2,5))
			tmp2 = tmp1.getUTCDate()
			if (tmp2==SD) solarTerms = solarTerm[SM*2+1]
			tmp1 = new Date((31556925974.7*(SY-1900)+sTermInfo[SM*2]*60000)+Date.UTC(1900,0,6,2,5))
			tmp2= tmp1.getUTCDate()
			
			if (tmp2==SD) solarTerms = solarTerm[SM*2]
			if(solarTerms=='') sFtv='';else sFtv=solarTerms
		}
			else sFtv=solarFestival
	}
		else sFtv=lunarFestival
	//
	var Animals=new Array("��","ţ","��","��","��","��","��","��","��","��","��","��");
	var strYears = Animals[(lDObj.year-4)%12];
	//
	sTermInfo='ũ��'+cyclical(lDObj.year-1900+36)+strYears+'�� '+cDay(lDObj.month,lDObj.day);
	if(sFtv!='')
		sTermInfo += '<br><font color=#178517>'+sFtv+'</font>';
	//
	return(sTermInfo)
}

function GetTime()
{
	var hh = now.getHours();var mm = now.getMinutes();var ss = now.getSeconds();
	//
	var clock='';
	if (hh < 10) clock += '0';
	clock += hh+':';
	if (mm < 10) clock += '0';
	clock += mm+':';
	if (ss < 10) clock += '0';
	clock += ss;
	//=====
	var step;
	if(hh<1)		step="Tengah Mlm";
	else if(hh<6)	step="Fajar";
	else if(hh<9)	step="Pagi";
	else if(hh<11)	step="Tangi";
	else if(hh<14)	step="Siang";
	else if(hh<18)	step="Petang";
	else if(hh<23)	step="Malam";
	else if(hh<24)	step="Tengah Mlm";
	clock = step + '��'+clock;
	return(clock);
}

function refreshCalendarClock()
{
	now = new Date();var hh = now.getHours();var mm = now.getMinutes();var ss = now.getSeconds();
	//
	if(hh==0&&mm==0&&ss==0)
		ShowDate();
	else
		document.getElementById('ClockTime').innerHTML = GetTime();
}

function ShowDate()
{
	now = new Date();SY = now.getFullYear();SM = now.getMonth();SD = now.getDate();
	var str='<div align=center><a href=http://www.5igb.com/wnl.htm>'+YYMMDD()+' '+weekday()+"<br><span id=ClockTime>"+GetTime()+"</span><br>"+solarDay()+'</a></div>'
	document.getElementById('time').innerHTML=str;
}

function ShowTime()
{
	ShowDate();
	setInterval('refreshCalendarClock()',1000);
}

function ShowTimeEn()
{
	today= new Date();
	var years=today.getYear();
	var months=today.getMonth()+1;
	var dates=today.getDate();
	var hours=today.getHours();
	var minutes=today.getMinutes();
	var seconds=today.getSeconds();
	
	var ww=today.getDay();
	if (ww==0) ww="Minggu";
	if (ww==1) ww="Senin";
	if (ww==2) ww="Selasa";
	if (ww==3) ww="Rabu";
	if (ww==4) ww="Kamis";
	if (ww==5) ww="Jumat";
	if (ww==6) ww="Sabtu";
	
	if (eval(hours) <10) {hours="0"+hours;}
	if (eval(minutes) < 10) {minutes="0"+minutes;}
	if (seconds < 10) {seconds="0"+seconds;}
	
	var step;
	if(eval(hours)<1)		step="Tengah Mlm";
	else if(eval(hours)<6)	step="Fajar";
	else if(eval(hours)<9)	step="Pagi";
	else if(eval(hours)<11)	step="Tangi";
	else if(eval(hours)<14)	step="Siang";
	else if(eval(hours)<18)	step="Petang";
	else if(eval(hours)<23)	step="Malam";
	else if(eval(hours)<24)	step="Tengah Mlm";
		
	thisdate = years+"."+months+"."+dates;
	thistime = hours+":"+minutes+":"+seconds;
	document.getElementById("time").innerHTML="<div align=center>"+thisdate+" "+ww+"<br>"+step+" "+thistime+"</div>";
	var timer=setTimeout("ShowTimeEn()",1000);
}
//#############################################################################
function CheckMail()
{
	var gm=document.gomail
	var vDomain = gm.domains
	var vName = gm.uName
	var vPw = gm.uPw
	if(vDomain.value == "")
	{	alert("Pilih Mailbox Anda...")
		vDomain.focus()
		return false
	}
	if(vName.value == "")
	{	alert("Masukkan Account Anda...")
		vName.focus()
		return false
	}
	if(vPw.value == "") {
		alert("Masukkan Password Anda...")
		vPw.focus()
		return false
	}
	
	LoginMail();
	return false
}

function CheckMailEn()
{
	var gm=document.gomail
	var vDomain = gm.domains
	var vName = gm.uName
	var vPw = gm.uPw
	if(vDomain.value == "")
	{	alert("Please select your mailbox...")
		vDomain.focus()
		return false
	}
	if(vName.value == "")
	{	alert("Please input your accounts...")
		vName.focus()
		return false
	}
	if(vPw.value == "") {
		alert("Please input your password...")
		vPw.focus()
		return false
	}
	
	LoginMail();
	return false
}

function LoginMail()
{
	var gm=document.gomail
	var vDomain = gm.domains
	var vName = gm.uName
	var vPw = gm.uPw
	switch(vDomain.value)
	{
	case "163":
		gm.action="http://reg.163.com/CheckUser.jsp"
		gm.url.value="http://fm163.163.com/coremail/fcg/ntesdoor2?lightweight=1&verifycookie=1&language=-1&style=15"
		gm.username.value=vName.value
		gm.password.value=vPw.value
		gm.enterVip.value=''
	break
	case "126":
		gm.action =  "http://entry.126.com/cgi/login"
		gm.domain.value = "126.com"
		gm.user.value = vName.value
		gm.pass.value = vPw.value
	break
	case "188":
		gm.action =  "http://reg.mail.188.com/servlet/coremail/login?language=0&style=1"
		gm.user.value = vName.value
		gm.pass.value = vPw.value
	break
	case "vip163":
		gm.action = "https://ssl1.vip.163.com/logon.m?language=-1&style=-1"
		gm.username.value = vName.value
		gm.password.value = vPw.value
	break
	case "netease":
		gm.action = "http://web.netease.com/cgi/login?verifycookie=1&language=0"
		gm.username.value = vName.value
		gm.password.value = vPw.value
	break
	case "sohu":
		gm.action="http://passport.sohu.com/login.jsp"
		gm.url.value=""
		gm.UserName.value=vName.value
		gm.Password.value=vPw.value
		gm.id.value=vName.value
		gm.username.value=vName.value
		gm.password.value=vPw.value
		gm.m.value=vName.value
		gm.passwd.value=vPw.value
		gm.mpass.value=vPw.value
		gm.loginid.value=vName.value+"@sohu.com"
		gm.fl.value="1"
		gm.vr.value="1|1"
		gm.appid.value="1000"
		gm.ru.value="http://login.mail.sohu.com/servlet/LoginServlet"
		gm.eru.value="http://login.mail.sohu.com/login.jsp"
		gm.ct.value="1173080990"
		gm.sg.value="5082635c77272088ae7241ccdf7cf062"
	break
	case "yahoo":
		gm.action = "https://edit.bjs.yahoo.com/config/login?"
		gm.login.value = vName.value
		gm.passwd.value = vPw.value
	break
	case "yahooId":
		gm.action = "https://edit.bjs.yahoo.com/config/login?"
		gm.login.value = vName.value
		gm.passwd.value = vPw.value
	break
	case "tom":
		gm.action = "http://bjweb.163.net/cgi/163/login_pro.cgi"
		gm.user.value = vName.value
		gm.pass.value = vPw.value
	break
	case "163net":
		gm.action = "http://bjweb.163.net/cgi/163/login_pro.cgi"
		gm.user.value = vName.value
		gm.pass.value = vPw.value
	break
	case "21cn":
		gm.action = "http://passport.21cn.com/maillogin.jsp"
		gm.LoginName.value = vName.value
		gm.passwd.value = vPw.value
		gm.domainname.value = "21cn.com"
		gm.UserName.value = vName.value+'@21cn.com'
	break
	case "china":
		gm.action = "http://mail.china.com/coremail/fcg/login"
		gm.user.value = vName.value
		gm.pass.value = vPw.value
		gm.domainname.value = "china.com"
		//gm.passwd.value = vPw.value
	break
	case "mailchina":
		gm.action = "http://freemail.china.com/extend/gb/NULL/NULL/NULL/SignIn.gen"
		gm.LoginName.value = vName.value
		gm.passwd.value = vPw.value
	break
	case "citiz":
		gm.action = "http://citiz.online.sh.cn/default/login_billing.jsp"
		gm.username.value = vName.value+"@citiz.net"
		gm.password.value = vPw.value
	break
	case "56":
		var gUrsHost = ["m113","m48","m49"];
		gm.action = "http://"+gUrsHost[((new Date()).getSeconds())%3]+".56.com/mail/mail.56"
		gm.username.value = vName.value
		gm.password.value = vPw.value
	break
	case "Xinhuanet":
		gm.action = "http://mail.xinhuanet.com/login.jsp"
		gm.username.value = vName.value
		gm.password.value = vPw.value
		gm.domainname.value = 'xinhuanet.com'
	break
	case "sina":
		gm.action = "http://mail.sina.com.cn/cgi-bin/login.cgi"
		gm.u.value = vName.value
		gm.psw.value = vPw.value
	break
	case "etang":
		gm.action = "http://login.etang.com/servlet/login"
		gm.BackURL.value = "http://vipmail.etang.com"
		gm.login_name.value = vName.value
		gm.login_password.value = vPw.value
	break
	case "eyou":
		gm.action = "https://ssl.eyou.com/mail_login.php"
		gm.LoginName.value = vName.value
		gm.Password.value = vPw.value
	break
	case "yeah":
		gm.action = "http://entry.yeah.net/cgi/login"
		gm.domain.value = "yeah.net"
		gm.user.value = vName.value
		gm.pass.value = vPw.value
	break
	case "263":
		gm.action = "http://g2wm.263.net/xmweb"
		gm.usr.value = vName.value
		gm.pass.value = vPw.value
		gm.domain.value = "263.net"
		gm.func.value = "login"
	break
	case "qq":
		gm.action = "http://mail.qq.com/cgi-bin/login"
		gm.u.value = vName.value
		gm.p.value = vPw.value
		gm.starttime.value=(new Date()).valueOf()
	break
	case "vipsina":
		gm.action = "http://vip.sina.com.cn/cgi-bin/login.cgi"
		gm.user.value = vName.value
		gm.pass.value = vPw.value
	break
	case "Gmail":
		gm.action = "https://www.google.com/accounts/recovery?continue=http%3A%2F%2Fmail.google.com%2Fmail%2F%3Fui%3Dhtml%26zy%3Dl&amp;service=mail&amp;ltmpl=default"
		gm.Email.value = vName.value
		gm.Passwd.value = vPw.value
	break;
	}
	//
	gm.submit()
	vPw.value = ""
	gm.action = ""
	return false
}

//#############################################################################
var g_MediaList = [
	[">>>>>>>>>>>>>>>��ѡ���Ŀ<<<<<<<<<<<<<<<",	""],
	["CCTV-1","mms://202.102.249.220/live_tv01"],
	["CCTV-2","mms://202.102.249.220/live_tv04"],
	["CCTV-4","http://www.35ktv.com/play1.asp?id=834&&gs="],
	["CCTV-5","mms://202.102.249.220/live_tv05"],
	["CCTV-6","http://www.35ktv.com/play1.asp?id=635&&gs=wmv"],
	["CCTV-8","http://www.35ktv.com/play1.asp?id=965&&gs="],
	["CCTV-9","http://www.35ktv.com/play1.asp?id=894&&gs="],
	["CCTV-10","mms://202.102.249.220/live_tv09"],
	[">>>>>>>>>>>>>>>����(��½)<<<<<<<<<<<<<<<",	""],
	["��������","http://www.35ktv.com/play1.asp?id=982&&gs=wmv"],
	["��������","http://www.35ktv.com/play1.asp?id=620&&gs=wmv"],
	["��������","http://www.35ktv.com/play1.asp?id=1002&&gs=wmv"],
	["ɽ����������Ƶ��","http://www.35ktv.com/play1.asp?id=514&&gs=wmv"],
	["�ൺ����̨","http://www.35ktv.com/play1.asp?id=883&&gs=wmv"],
	["���ɹŵ���̨","http://www.35ktv.com/play1.asp?id=988&&gs=wmv"],
	["��������","http://www.35ktv.com/play1.asp?id=669&&gs=wmv"],
	["�ϲ�����̨����Ƶ��","http://www.35ktv.com/play1.asp?id=852&&gs=wmv"],
	["���������ۺ�Ƶ��","http://www.35ktv.com/play1.asp?id=690&&gs=wmv"],
	["��������̨2��","http://www.35ktv.com/play1.asp?id=507&&gs=wmv"],
	["�Ͼ�����Ƶ��","http://www.35ktv.com/play1.asp?id=979&&gs=wmv"],
	["��������̨","http://www.35ktv.com/play1.asp?id=874&&gs=wmv"],
	["�Ͼ�Ӱ��Ƶ��","mms://live.njbg.com.cn:88/NJTV02"],
	["�Ͼ�����Ƶ��","mms://live.njbg.com.cn:88/NJTV03"],
	["XINHUATV","http://202.109.80.136/channel3"],
	[">>>>>>>>>>>>>>>��̨(��½)<<<<<<<<<<<<<<<",	""],
	["��ɳ����Ƶ��",	"mms://real.rednet.cn/1061"],
	["��ɳ��ɳ֮��",	"mms://media.csonline.com.cn/fm105"],
	["è�������̨",	"mms://ting.mop.com/mopradio"],
	["���������̨",	"mms://pub.qmoon.net:8009/audio"],
	["QQ��̨����֮��",	"http://qr.fm.qq.com/qqradio?qqradio"],
	["���������̨",	"http://union.itlearner.com/radio/asx/iwant.asx"],
	[">>>>>>>>>>>>>>>����(�۰�̨)<<<<<<<<<<<<<<<",	""],
	["��������","http://www.35ktv.com/play1.asp?id=963&&gs=wmv"],
	["�������","http://www.35ktv.com/play1.asp?id=775&&gs=wmv"],
	["HD����Ƶ��","http://www.35ktv.com/play1.asp?id=777&&gs=wmv"],
	["�����ȱ�̨","http://www.35ktv.com/play1.asp?id=378&&gs=wmv"],
	["��ɭ����һ̨","http://www.35ktv.com/play1.asp?id=826&&gs=wmv"],
	["���ŵ��ӵ���","http://www.35ktv.com/play1.asp?id=673&&gs=wmv"],
	[">>>>>>>>>>>>>>>����(����)<<<<<<<<<<<<<<<",	""],
	["Discovery̽��Ƶ��",	"mms://media-wm.cac.washington.edu/ResearchTV%20Live%20(LAN)"],
	["�Ĵ�����ACC����̨","http://www.35ktv.com/play1.asp?id=859&&gs=wmv"],
	["���ô��ۺϵ���̨","http://video.cpac.ca/CPAC1E/.asf"],
	["���ô󹫹�Ƶ��","http://www.35ktv.com/play1.asp?id=245&&gs=wmv"],
	["����BFM TV",		"mms://vipmms9.yacast.net/bfm_bfmtv"],
	["USNewsTV����̨","http://www.35ktv.com/play1.asp?id=530&&gs=wmv"],
	["����Graafschap","http://www.35ktv.com/play1.asp?id=866&&gs=wmv"],
	["����RTV","http://www.35ktv.com/play1.asp?id=762&&gs=wmv"],
	["�ձ�LFXƵ��",		"mms://bbn-lf.stream.ne.jp/lfx2"],
	["����ITBSƵ��","http://www.35ktv.com/play1.asp?id=572&&gs=wmv"],
	["����TCT","http://www.35ktv.com/play1.asp?id=923&&gs=wmv"],
	["����NBC","http://www.35ktv.com/play1.asp?id=944&&gs=wmv"],
	["����NASA","http://www.35ktv.com/play1.asp?id=946&&gs=wmv"],
	["����UMTV","http://www.35ktv.com/play1.asp?id=917&&gs=wmv"],
];

var g_RealList = [
	[">>>>>>>>>>>>>>>��ѡ���Ŀ<<<<<<<<<<<<<<<",	""],
	["��������㲥��̨һ��",		"rtsp://211.89.225.1:554/encoder/cnr1"],
	["��������㲥��̨����",		"rtsp://211.89.225.1:554/encoder/cnr2"],
	["��������㲥��̨����",		"rtsp://211.89.225.1:554/encoder/cnr3"],
	["��������̨",		"http://www.bmr.com.cn/script/live.ram"],
	["��������̨",		"rtsp://218.201.40.221/encoder/live.rm"],
	["��������̨",		"rtsp://218.201.40.221/encoder/music.rm"],
	["��������Ƶ��",	"rtsp://real.nbradio.com/encoder/xwpd.rm"],
	["��������֮��",	"rtsp://broadcast.nbradio.com/encoder/jkzs.rm"],
	["�ɶ���Ծ��Ƶ��̨","rtsp://61.157.96.231:554/broadcast/cd/broadcast/djok.rm"],
	["�ɶ���̨���Ź㲥","rtsp://61.157.96.231:554/broadcast/cd/broadcast/1.rm"],
	["21CN�����̨",	"rtsp://radio.21cn.com/id/live1.smil"],
	[">>>>>>>>>>>>>>>�㲥(����)<<<<<<<<<<<<<<<",	""],
	["��۵�̨��ͨ��̨","http://www.rthk.org.hk/live6.ram"],
	["�������ʹ㲥��̨","http://www.tv-radio.com/ondemand/rfi/mere/mandarin/info/mandarin_0930-1030-20k.ram"],
	["�ձ����ʹ㲥��̨(NHK)","http://www.nhk.or.jp/rj/ram/en/chinese.ram"],
	["����֮����Ӣ�","rtsp://a1702.l211048984.c2110.g.lr.akamaistream.net:554/live/D/1702/2110/v0001/reflector:48984"],
	["����֮�������ģ�","rtsp://a1702.l211020409.c2110.g.lr.akamaistream.net:554/live/D/1702/2110/v0001/reflector:23641"],
	["BBC News Summary","rtsp://rmv7.bbc.net.uk/worldservice/summary.rm"],
	["BBC World Service (Live)",	"http://www.bbc.co.uk/worldservice/ram/live_infent.ram"],
	["BBC����վ",		"http://www.bbc.co.uk/radio1/realaudio/media/r1livev7.ram"],
	["BBC�����ģ�",		"rtsp://rmv8.bbc.net.uk/chinese/ch_hold_anno.ra"],
	["BBC ASIAN NETWORK","http://www.bbc.co.uk/asiannetwork/rams/asiannetwork.ram"],
	["ABC News Radio",	"http://www.abc.net.au/streaming/newsradio.ram"],
	["WRN CBC",			"http://www.wrn.org/audio/rnz_eng.ram"],
	[">>>>>>>>>>>>>>>����(����)<<<<<<<<<<<<<<<",	""],
	["����NASAƵ��",	"http://www.nasa.gov/ram/35037main_portal.ram"],
];

var g_MediaListEn = [
	[">>>>>>>>>>Please Select Program<<<<<<<<<",	""],
	["America Music",		"mms://stream.nwez.net/nwez3"],
	["France BFM TV",		"mms://vipmms9.yacast.net/bfm_bfmtv"],
	["Discovery Channel",	"mms://media-wm.cac.washington.edu/ResearchTV%20Live%20(LAN)"],
	["Canada TV",			"http://video.cpac.ca/CPAC1E/.asf"],
	["Korea TBC",			"mms://203.251.80.180/tbc_tv"],
	["Japan LFX",			"mms://bbn-lf.stream.ne.jp/lfx2"],
	["Switzerland TELEM",	"mms://wms01.green.ch/telem1"],
	[">>>>>>>>>>>>>>>MP3-Video<<<<<<<<<<<<<<<",	""],
	["MP3-A place nearby-Lene Marlin",	"http://www.ell.com.cn/ejsound/jre061107.mp3"],
	["Flash-Fishing",	"http://218.87.253.164:8088/tfs92006/upload_swf/ftp/20060516/6.swf"],
];

var g_RealListEn = [
	[">>>>>>>>>>Please Select Program<<<<<<<<<",	""],
	["BBC News Summary","rtsp://rmv7.bbc.net.uk/worldservice/summary.rm"],
	["BBC World Service (Live)",	"http://www.bbc.co.uk/worldservice/ram/live_infent.ram"],
	["BBC Music",		"http://www.bbc.co.uk/radio1/realaudio/media/r1livev7.ram"],
	["BBC ASIAN NETWORK","http://www.bbc.co.uk/asiannetwork/rams/asiannetwork.ram"],
	["VOA News Now",	"rtsp://a1702.l211048984.c2110.g.lr.akamaistream.net:554/live/D/1702/2110/v0001/reflector:48984"],
	["ABC News Radio",	"http://www.abc.net.au/streaming/newsradio.ram"],
	["WRN CBC",			"http://www.wrn.org/audio/rnz_eng.ram"],
	[">>>>>>>>>>>>>>TV<<<<<<<<<<<<<<<",	""],
	["America NASA Channel",	"http://www.nasa.gov/ram/35037main_portal.ram"],
];

function MediaSelectSubmit(nType)
{
	var List = (nType==0 ? g_MediaList : g_MediaListEn);
	MediaPlayer.Stop();
	MediaPlayer.Open(List[MediaSelect.value][1]);
	RealPlayer.focus();
}

function MediaSelectWrite(nType)
{
	var List = (nType==0 ? g_MediaList : g_MediaListEn);
	var nLen = List.length-1;
	for (var i=0; i<nLen; i++)
	{
		document.write("<option value=",i,">",List[i][0],"</option>");
	}
}

function RealSelectSubmit(nType)
{
	var List = (nType==0 ? g_RealList : g_RealListEn);
	RealPlayer.DoStop();
	RealPlayer.SetSource(List[RealSelect.value][1]);
	RealPlayer.DoPlay();
	RealPlayer.focus();
}

function RealSelectWrite(nType)
{
	var List = (nType==0 ? g_RealList : g_RealListEn);
	var nLen = List.length-1;
	for (var i=0; i<nLen; i++)
	{
		document.write("<option value=",i,">",List[i][0],"</option>");
	}
}

function MediaOpenUrl()
{
	var strUrl = prompt("","http://");
	if (strUrl.length<1)
		return;
	MediaPlayer.Stop();
	MediaPlayer.Open(strUrl);
}

function RealOpenUrl()
{
	var strUrl = prompt("","http://");
	if (strUrl.length<1)
		return;
	RealPlayer.DoStop();
	RealPlayer.SetSource(strUrl);
	RealPlayer.DoPlay();
}

function PlayerZoom()
{
	if (MediaPlayer.height<100)
	{
		RealPlayer.CONTROLS = "ImageWindow,ControlPanel,StatusBar";
		MediaPlayer.height = RealPlayer.height = (MediaPlayer.width*0.75+66);//366
	}
	else
	{
		RealPlayer.CONTROLS = "ControlPanel,StatusBar";
		MediaPlayer.height = RealPlayer.height = 66;
	}
}
