const initializer = new MutationObserver(waitforpanel)
const observer = new MutationObserver(markmutations)
const initializerm = new MutationObserver(waitformessages)
const meetid = "newmeet"+document.URL.split('/')[3]
var showclicked = false;
var taking = false;
var attendancetimes = []
var aae = false;
var currentattime = 0;
const storage = window.sessionStorage
var attendancetime = new Date();

window.addEventListener('beforeunload',function(){
    browser.runtime.sendMessage({action:"backup", data:htmlsheet(),chromeName:"AttendanceBackup"+getdatenumber()+meetid+".html",name:"ഹാജര്‍സൂക്ഷിപ്പ്"+getdatenumber()+meetid+".html"},function(message){console.log(message)})
})

function pmodel(link,name, middlestring,timeratio,totaltime,firstshown,lastseen,autoattendance){
    let hajar = getplist()[link].manualattendance ? '<div class="manualattendance"><div style="font-size:16px;position:relative;top:50%;left:50%;transform:translate(-50%, -50%)">✓</div></div>':'<div class="manualattendance" style="background:rgb(227,38,54)"><div style="font-size:16px;position:relative;top:50%;left:50%;transform:translate(-50%, -50%)">x</div></div>'
    let model = '       <div style ="padding:5px;border:1px solid blue;border-radius:5px;margin-bottom:5px;">\n            <div class="pheader">\n                <img width="32px" height="32px" style="border:1px solid lightblue;box-shadow:0 0 5px lightgray; border-radius:16px" src="'+link+'"></img>\n                <p style="font-size:20px;margin:5px 0 10px 0;padding:0;">'+name+'</p>\n                \n'+hajar+'                <div class="participance"><div class="participancefiller" style="flex:'+timeratio+'"></div></div>\n            ‌‌‌‌‌‌‌</div>\n            <div style="display:flex"><div style="font-weight:bold;position:relative;bottom:6px;margin:0 0 0 37px;padding:0;font-size:12px;">സാന്നിധ്യ നിരക്ക്: '+timeratio+'</div></div>\n           <div style="width:100%;display:flex;flow:row"><div style="flex:1;padding:5px;">ആദ്യം കയറിയത്: '+firstshown+'</div><div style="flex:1;text-align:right;padding:5px;">ഇറങ്ങിയത്: '+lastseen+'</div></div>\n            <div class="timeline">\n                '+middlestring+'\n            </div>\n            <div style="display:flex"><div width="100%" style="text-align:right;padding:5px">ആകെസമയം:'+totaltime+'</div></div>\n         \n<div style="width:100%;flex-wrap:wrap;display:flex;gap:10px;margin-top:10px;"><div class="autoattendance" style="padding:5px; line-height:19px;text-align:center;color:white;font-weight:bold;background-image: linear-gradient(315deg, #738bdc 0%, #48c3eb 74%);border-radius:5px;border:2px #738bdc ">താനേഹാജര്‍</div>  '+autoattendance+'</div>\n        </div>'
    return model;
}

function storeaae(aae){
    let autoattendance = getstoredaae()
    autoattendance.aae.push(aae)
    storage.setItem(meetid+'_aae',JSON.stringify(autoattendance))
}

function getstoredaae(){
    return JSON.parse(storage.getItem(meetid+'_aae'))||{aae:[]}
}

function graphautoattendance(plink){
    let paa = getplist()[plink].autoattendance
    let stringtoreturn = '';
    for(let i of getstoredaae().aae){
        if(paa.includes(i)){
            stringtoreturn+='              \n'+'<div class="autoattendances">'+converttolt(i)+'</div>'
        }else{
            stringtoreturn+='              \n'+'<div class="autoattendances" style="background: rgb(227,38,54)">'+converttolt(i)+'</div>'
        }
    }
    return stringtoreturn
}

function getmessagebutton(){
    return document.querySelector('button[class="VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc"][aria-label="Chat with everyone"]')
}

function getsendtext(){
    return document.querySelector('textarea.KHxj8b')
}

function getsendbutton(){
    return document.querySelector('button.VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.tWDL4c.Cs0vCd')
}

function waitformessages(mutations){
    let textarea = getsendtext()
    let sendbutton = getsendbutton()
    if(textarea&&sendbutton){
        observemessages(mutations)
        if(!document.querySelector('div.attoggler')){
            appendattoggler()
        }
    }
}

function sendmessage(message){
    let textarea = getsendtext()
    let sendbutton = getsendbutton()
    if(textarea&&sendbutton){
        textarea.value = message
        sendbutton.removeAttribute('disabled')
        sendbutton.click()
    }
}

function waitforpanel(mutations){
    try{
        let showbutton = document.querySelector('button[class="VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc"][aria-label="Show everyone"]')
        if(showbutton && !showclicked){
            showbutton.click()
            appendhtmlbutton()
            appendcsvbutton()
        }
        if(document.querySelector('div[class="GvcuGe"]')){
            observer.observe(document.querySelector('div[class="GvcuGe"]'), {childList:true,subtree:true})
            initialising()
            initializer.disconnect()
        }
    }catch(e){
        console.error(e)
        throw 1
    }
}

function appendhtmlbutton(){
    let buttonbar = document.querySelector('div[class="SGP0hd kunNie"]')
    let button = buttonbar.appendChild(document.createElement('div'))
    button.style = 'font-size:18px;font-weight:bold;width:48px;height:48px;right:50%;top:50%;text-align:center;line-height:48px;cursor:pointer;border-radius:27px'
    button.innerHTML = '&lt;/&gt;'
    button.onclick = downloadhtml
    button.className = 'htmlbutton'
    button.onmouseover = function(something){something.target.style.backgroundColor = "rgba(255,255,255,.05)"}
    button.onmouseout = function(something){something.target.style.backgroundColor = "transparent"}
    button.onmousedown = function(something){something.target.style.backgroundColor = "rgba(255,255,255,.1)"}
    button.onmouseup = function(something){something.target.style.backgroundColor = "transparent"}
}

function appendcsvbutton(){
    let buttonbar = document.querySelector('div[class="SGP0hd kunNie"]')
    let button = buttonbar.appendChild(document.createElement('div'))
    button.style = 'font-size:18px;font-weight:bold;width:48px;height:48px;right:50%;top:50%;text-align:center;line-height:48px;cursor:pointer;border-radius:27px'
    button.className = 'csvbutton'
    button.innerHTML = '.csv'
    button.onclick = downloadcsv
    button.onmouseover = function(something){something.target.style.backgroundColor = "rgba(255,255,255,.05)"}
    button.onmouseout = function(something){something.target.style.backgroundColor = "transparent"}
    button.onmousedown = function(something){something.target.style.backgroundColor = "rgba(255,255,255,.1)"}
    button.onmouseup = function(something){something.target.style.backgroundColor = "transparent"}
}

function appendattoggler(){
    let buttonbar = document.querySelector('div[class="SGP0hd kunNie"]')
    let button = buttonbar.appendChild(document.createElement('div'))
    let toggler = button.appendChild(document.createElement('div'))
    toggler.style = 'position: relative; top: 50%; left: 50%; width: 20px; transform: translate(-50%, -50%); height: 20px; border: 2px solid white; border-radius: 18px; background-color: transparent;'
    button.style = 'font-size:18px;font-weight:bold;width:48px;height:48px;right:50%;top:50%;text-align:center;line-height:48px;cursor:pointer;border-radius:27px'
    button.className = 'attoggler'
    button.onclick = attendancetoggler
    button.onmouseover = function(something){something.target.style.backgroundColor = "rgba(255,255,255,.05)"}
    button.onmouseout = function(something){something.target.style.backgroundColor = "transparent"}
    button.onmousedown = function(something){something.target.style.backgroundColor = "rgba(255,255,255,.1)"}
    button.onmouseup = function(something){something.target.style.backgroundColor = "transparent"}
}

function attendancetoggler(){
    if(aae){
        disableattendance()
        document.querySelector('div.attoggler').children[0].style.background = 'transparent'
    }else{
        enableattendance()
        document.querySelector('div.attoggler').children[0].style.background = 'linear-gradient(315deg, #7f53ac 0%, #647dee 74%)'
    }
}

function main(){
    try{
        initializer.observe(document.body,{childList:true,subtree:true})
        initializerm.observe(document.body,{childList:true,subtree:true})
    }catch(e){
        console.error(e)
        throw 1
    }
}

function htmlsheet(){
    let returnstring = '<!DOCTYPE html>\n<html lang="">\n  <head>\n    <meta charset="utf-8">\n    <title>'+"ഹാജര്‍"+getdatenumber()+'</title>\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>\n   <script>function downloadpdf(){html2pdf().from(document.getElementById("containerdiv")).set({margin:[2, 2, 2, 2],filename:"document.pdf",image:{ type: "jpg", quality: 0.98 },html2canvas:{ scale: .8, useCORS: true },jsPDF:{ unit: "mm", format: "a2", orientation: "portrait" }}).save()}</script>   \n      <style>     @import url("https://fonts.googleapis.com/css?family=Manjari&display=swap");\n    body{\n       font-size:14px;\n        font-family:Manjari;\n    }       \n.pheader{\n        \npadding:0;        \nmargin-bottom:0;        \ndisplay:flex;\n        flow:row;\n        align-items:center;\n        gap:5px;\n        font-family:Manjari;\n        font-weight:bold;\n    }     \n.manualattendance{           \nborder-radius:20px;           \ntext-align:center;            \nwidth:20px;           \nheight:20px;          \nbackground:rgb(0,158,96);         \ncolor:white;          \nfont-weight:bold      \n}       \n.autoattendances{\n        height:16px;        \nline-height:18px;         \nborder-radius:20px;           \npadding:0 5px;        \nbackground: rgb(0,158,96);       \nfont-size:14px;       \ncolor:white;       \nfont-family:Manjari;         \nfont-weight:bold;         \npadding:5px;      \n}\n    .timeline{\n        width:100%;\n        height:24px;\n        overflow:hidden;\n        background-image: linear-gradient(315deg, #9e8fb2 0%, #a7acd9 74%);\n        border-radius:24px;\n        display:flex;\n        flow:row;\n    }\n    .intime{\n        border-radius:2px;\n        background-image: linear-gradient(315deg, #7f53ac 0%, #647dee 74%);\n        height:100%;\n    }\n    .intime[nullblock=true]{\n        background-image:none;\n        box-shadow:none;\n        border:none;\n    }    .participance{\n         \nborder:1px solid gray;        width:20px;\n        height:20px;\n        border-radius:14px;\n        box-shadow:0 0 2px gray;\n       \n display:flex;\n        overflow:hidden;\n        flow:row;\n        margin-left:10px;\n    }\n    .participancefiller{\n        height:100%;\n        background-image: linear-gradient(315deg, #7f53ac 0%, #647dee 74%);\n    }\n    </style>\n  </head>\n  <body>\n    <div id="containerdiv"><header style="margin-bottom:10px;display:flex;flow:row;border:1px solid blue; border-radius:5px;padding:10px">\n        <div style="flex:1">\n            <p style="font-size:30px;font-weight:bold;color:#3DA3CE">'+document.title+'<p>\n           <p> തീയ്യതി:'+getdatenumber()+" "+new Date().toLocaleDateString("ml-IN", { weekday: 'long' })+'</p>\n        </div>\n        <div style="flex:1;">\n            <div style="float:right">\n                <p>തുടങ്ങിയത്:'+converttolt(getstarttime())+'</p>\n                <p>ആകെ സമയം:'+gettimeinhours(gettime()-getstarttime())+'<p>\n            </div>\n        </div>\n    </header>\n    <main>'+getgraphdata()+' </main>\n    <footer></footer></div>\n   \n<div id="pdfdownloader" style="width:38px;height:38px;position:fixed;right:10px;bottom:10px;background: #6e72fc;border-radius:26px;cursor:pointer;box-shadow:0 0 5px grey;" onclick="downloadpdf()"><div style="font-familiy:Ubuntu;text-align:center;font-size:20px;font-weight:bold;color:white;position:relative;left:50%;top:50%;transform:translate(-50%, -40%);">🗎</div></div>      \n      </body>\n</html>'
    return returnstring;
}

function downloadhtml(){
    downloadrequest("ഹാജര്‍"+getdatenumber()+".html",'text/html',htmlsheet())
}

function roundto(inter){
    return Math.round(inter*1000)/1000
}

function getgraphdata(){
    let plist = getplist();
    let starttime = getstarttime();
    let endtime = new Date().getTime();
    let returnstring = ""
    for(let p in plist){
        if(!plist[p].joinleavetimes[plist[p].joinleavetimes.length -1].left){
            plist[p].joinleavetimes[plist[p].joinleavetimes.length -1].left = endtime;
            plist[p].joinleaveinfo[plist[p].joinleaveinfo.length -1].left = gethours();
        }
        returnstring+=pmodel(p, plist[p].name, getgraph(starttime,endtime,plist[p]),Math.round(getptotaltime(plist[p])/(endtime-starttime)*100)/100,gettimeinhours(getptotaltime(plist[p])), plist[p].joinleaveinfo[0].joined, plist[p].joinleaveinfo[plist[p].joinleaveinfo.length-1].left, graphautoattendance(p))
    }
    return returnstring;
}

function getgraph(starttime, endtime, object){
    let totaltime = endtime-starttime
    let startingnull = (object.joinleavetimes[0].joined-starttime)/totaltime
    let returnstring = '\n<div class="intime" nullblock=true style="flex:'+roundto(startingnull)+'"></div>'
    for(let i in object.joinleavetimes){
        var interval = (object.joinleavetimes[i].left-object.joinleavetimes[i].joined)/totaltime
        returnstring+='\n                <div class="intime" style="flex:'+roundto(interval)+'"></div>'
        if(object.joinleavetimes[Number(i)+1]!=undefined&&object.joinleavetimes[i].left!=undefined){
            var nullinterval = (object.joinleavetimes[Number(i)+1].joined-object.joinleavetimes[i].left)/totaltime
            returnstring+='\n                <div class="intime" nullblock=true style="flex:'+roundto(nullinterval)+'"></div>'
        }
    }
    let endingnull = (endtime-object.joinleavetimes[object.joinleavetimes.length-1].left)/totaltime
    return returnstring+'\n                <div class="intime" nullblock=true style="flex:'+roundto(endingnull)+'"></div>'
}

function initialising(){
    try{
        let meetobject = getmeetdata();
        let linklist = []
        for(let k of document.querySelector('div[class="GvcuGe"]').children){
            addparticipants(k)
        }
        for(let j in meetobject.plist){
            if(!linklist.includes(j)){
                removep(j)
            }
        }
    }catch(e){
        console.error(e)
        throw 1
    }
}

function csv(){
    let header = '"ക്രമം","പേര്","ആദ്യം കണ്ടത്","കേറിയിറങ്ങലുകള്‍","സാന്നിധ്യം", "ക്ലാസ്സിലിരുന്നത്(മണിക്കൂറില്‍)","ഹാജര്‍" \n'
    let meetobject = getplist();
    let starttime = getstarttime();
    let endtime = new Date().getTime()
    let endinfo = gethours()
    let slno = 1;
    let plist = getplist()
    let totaltime = endtime - starttime
    for(let p in plist){
        if(!plist[p].joinleavetimes[plist[p].joinleavetimes.length -1].left){
            plist[p].joinleavetimes[plist[p].joinleavetimes.length -1].left = endtime;
            plist[p].joinleaveinfo[plist[p].joinleaveinfo.length -1].left = gethours();
        }
        let hajar = plist[p].manualattendance ? '✓':'x'
        header += '\n'+slno+',"'+plist[p].name+'",'+ plist[p].joinleaveinfo[0].joined+','+generatejoinleave(plist[p]) +',"   '+Math.round(getptotaltime(plist[p])/totaltime*100)/100+'    ",'+gettimeinhours(getptotaltime(plist[p]))+","+hajar
        slno++
    }
    return header;
}

function pexists(link){
    for(let i of document.querySelectorAll('div[class="KV1GEc"]')){
        if(getplink(i)==link){
            return true
        }
    }
    return false;
}

function getlinkfrompid(pid){
    for(let i of document.querySelectorAll('div[class="KV1GEc"]')){
        if(getpid(i) == pid){
            return getplink(i)
        }
    }
    return false
}

function observemessages(mutations){
    for(let mutation of mutations){
        for(let addednode of mutation.addedNodes){
            if(addednode.className == "GDhqjd"&&taking){
                let someobject = JSON.parse(readfromstorage())
                console.log(getlinkfrompid(addednode.dataset.senderId))
                someobject.plist[getlinkfrompid(addednode.dataset.senderId)].autoattendance.push(attendancetime)
                writetostorage(JSON.stringify(someobject))
            }
        }
    }
}

function enableattendance(){
    if(!aae){
        if(getatelement()){
            getatelement().style.display = 'initial';
        }else{
            createatinfo()
        }
        aae = true
        return autoattendance()
    }
}

function disableattendance(){
    if(getatelement()){
        getatelement().style.display = 'none';
    }
    return (aae = false);
}

function getatelement(){
    return document.getElementById('autoattendanceinfonewmeet')
}

function createatinfo(){
    let element = document.createElement('div')
    element.style = "position:absolute;left:50%;transform:translateX(-50%);font-family:Manjari;font-weight:bold;background-image: linear-gradient(315deg, #8989bb 0%, #a5a4cb 74%);z-index:10;font-size:13px;padding:2px 10px;margin:5px;color:white;font-family:'Google Sans',Roboto,Arial,saninherit;font-weight:bold;border-radius:20px;"
    element.id = "autoattendanceinfonewmeet"
    return document.body.appendChild(element)
}

function autoattendance(){
    let coefficient = 60;
    let randomtime = Math.floor(Math.random()*(10*coefficient))
    let aaeinterval = setInterval(function(){
        if(aae){
            currentattime+=1
            if(currentattime == randomtime){
                let sometime = gettime()
                sendmessage('ഹാജര്‍ തരൂ')
                getatelement().innerHTML = 'ഹാജരെടുക്കുന്നു...'
                attendancetime = sometime
                attendancetimes.push(sometime)
                storeaae(sometime)
                taking = true;
            }
            if(currentattime<randomtime){
                let displaytime = Math.floor((randomtime-currentattime)/coefficient);
                getatelement().innerHTML = displaytime>=1 ? displaytime+" മിനിട്ടുകള്‍ക്കുള്ളില്‍ ഹാജരെടുക്കും":(randomtime-currentattime)+" നിമിഷങ്ങള്‍ക്കുള്ളില്‍ ഹാജരെടുക്കും"
            }
            if(currentattime == randomtime+coefficient&&taking){
                taking =false
                sendmessage('സമയം കഴിഞ്ഞു')
                getatelement().innerHTML = "കഴിഞ്ഞു."
            }
            if(currentattime == 12*coefficient){
                currentattime = 0;
                randomtime = Math.floor(Math.random()*(10*coefficient))
            }
        }
        else{
            clearInterval(aaeinterval)
        }
    },1000)
}

function gettimeinhours(ptotaltime){
    let hours = Math.floor(ptotaltime/3600000)
    let minutes = Math.floor((ptotaltime%3600000)/60000)
    let seconds = Math.floor(((ptotaltime%3600000)%60000)/1000)
    return (String(hours).length<2 ? "0"+hours:hours)+":"+(String(minutes).length<2 ? "0"+minutes:minutes)+":"+(String(seconds).length<2 ? "0"+seconds:seconds)
}

function getdatenumber(){
    let time = new Date()
    return ""+time.getDate()+"-"+(time.getMonth()+1)+'-'+time.getFullYear()
}

function downloadcsv(){
    downloadrequest("ഹാജര്‍"+getdatenumber()+".csv","text/csv", csv())
}

//unmodified since newmeet 1.0
function downloadrequest(filename,filetype, data){
    let blob = new Blob([data],{type:filetype});
    let url = URL.createObjectURL(blob), a = document.body.appendChild(document.createElement('a'));
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(function(){
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },20)
}

function generatejoinleave(object){
    let returnstring = "";
    for(let p of object.joinleaveinfo){
        returnstring += p.joined+"|"+p.left+"  "
    }
    return returnstring;
}

function firstitem(object){
    for(let i in object){
        return object[i]
    }
}

function getptotaltime(object){
    let ttime = 0;
    for(let p of object.joinleavetimes){
        ttime += p.left-p.joined
    }
    return ttime
}

function getstarttime(){
    let plist = getplist()
    let leasttime = firstitem(plist).joinleavetimes[0].joined;
    let leastdate;
    for(let p in plist){
        let ptime = plist[p].joinleavetimes[0].joined
        if(ptime<leasttime){
            leasttime = ptime
            leastdate = plist[p].joinleaveinfo[0].joined
        }
    }
    return leasttime
}

function converttolt(time){
    let date = new Date(time);
    let hours = date.getHours()>12 ? date.getHours()-12:date.getHours()
    let apm = date.getHours>12? "PM":"AM"
    let minutes = String(date.getMinutes()).length<2 ? 0+date.getMinutes():date.getMinutes()
    return hours+":"+minutes+" "+apm
}

function gettime(){
    try{
        let date = new Date()
        return date.getTime()
    }catch(e){
        console.error(e)
        throw 1
    }
}

function gethours(){
    try{
        let date = new Date()
        let hours = date.getHours()>12 ? date.getHours()-12:date.getHours()
        let minutes = date.getMinutes()
        let apm = date.getHours()>12 ? "PM":"AM"
        return hours+":"+minutes+" "+apm
    }catch(e){
        console.error(e)
        throw 1
    }
}

function addp(node){
    try{
        let meetobject = getmeetdata()
        let plink = getplink(node)
        if(!meetobject.plist[plink]){
            meetobject.plist[plink] = {jointime:gettime(),name:getpname(node), pid:getpid(node), joinleaveinfo:[{joined:gethours()}],joinleavetimes:[{joined:gettime()}],autoattendance:[],manualattendance:false}
        }
        return writetostorage(JSON.stringify(meetobject))
    }catch(e){
        console.error(e)
        throw 1
    }
}

function pentry(node){
    try{
        let link = getplink(node)
        let meetobject = getmeetdata()
        let position = meetobject.plist[link].joinleavetimes.length - 1
        if(meetobject.plist[link].joinleavetimes[position].left){
            meetobject.plist[link].joinleavetimes.push({joined:gettime()})
            meetobject.plist[link].joinleaveinfo.push({joined:gethours()})
        }
        meetobject.plist[link].pid = getpid(node)
        return writetostorage(JSON.stringify(meetobject))
    }catch(e){
        console.error(e)
        throw 1
    }
}

function removep(link){
    try{
        let meetobject = getmeetdata()
        let position = meetobject.plist[link].joinleavetimes.length - 1
        if(!meetobject.plist[link].joinleavetimes[position].left && !pexists(link)){
            meetobject.plist[link].joinleavetimes[position]['left'] = gettime()
            meetobject.plist[link].joinleaveinfo[position]['left'] = gethours()
        }
        return writetostorage(JSON.stringify(meetobject))
    }catch(e){
        console.error(e)
        throw 1
    }
}

function markmutations(mutations){
    try{
        for(let mutation of mutations){
            for(let removednode of mutation.removedNodes){
                if(removednode.className == "KV1GEc"){
                    removep(getplink(removednode))
                }
            }
            for(let addednode of mutation.addedNodes){
                addparticipants(addednode)
            }
        }
    }catch(e){
        console.error(e)
        throw 1
    }
}

function addparticipants(addednode){
    let meetobject = getmeetdata()
    if(addednode.className == "KV1GEc"){
        if(meetobject.plist[getplink(addednode)]){
            pentry(addednode)
        }else{
            addp(addednode)
        }
        if(!addednode.querySelector('div.atchecker')){
            addChecker(addednode.children[1])
            var somemutations = new MutationObserver(function(mutations){
                for(let mutation of mutations){
                    if(!addednode.querySelector('div.atchecker')){
                        console.log("removed")
                        addChecker(addednode.children[1])
                    }
                }
            })
            somemutations.observe(addednode.children[1], {childList:true})
        }
    }
}

function addChecker(parent){
  if(!parent.querySelector('div.atchecker')){
        let a = parent.appendChild(document.createElement('div'))
        let already = getplist()[getplink(parent.parentNode)].manualattendance
        a.className = "atchecker"
        a.style = "width: 30px; height: 48px; background: transparent none repeat scroll 0% 0%;"
        let b = a.appendChild(document.createElement('div'))
        b.style = 'background-image:none;position:relative;left:50%;top:50%;transform:translate(-50%,-50%);width:20px;height:20px;border:2px solid gray;cursor:pointer;border-radius:20px;'
        b.style.backgroundImage = already ? 'linear-gradient(315deg, #5de6de 0%, #b58ecc 74%)':'none'
        b.style.borderColor = already ? 'lightgray':'gray'
        b.onclick = function(event){
            let unchecked = event.target.style.backgroundImage == 'none'
            event.target.style.backgroundImage = unchecked ? 'linear-gradient(315deg, #5de6de 0%, #b58ecc 74%)':'none'
            event.target.style.borderColor = unchecked ? "lightgray":'gray'
            let meetobject = getmeetdata()
            meetobject.plist[getplink(event.target.parentNode.parentNode.parentNode)].manualattendance = !(event.target.style.backgroundImage == 'none')
            writetostorage(JSON.stringify(meetobject))
        }
        return a
    }
    return null
}


function getplist(){
    try{
        return getmeetdata().plist
    }catch(e){
        console.error(e)
        throw 1
    }
}

function getmeetdata(){
    try{
        return JSON.parse(readfromstorage())||{starttime:gettime(), plist:{}}
    }catch(e){
        console.error(e)
        throw 1
    }
}

function readfromstorage(){
    try{
        return storage.getItem(meetid)
    }catch(e){
        console.error(e)
        throw 1
    }
}

function writetostorage(string){
    try{
        return storage.setItem(meetid,string)
    }catch(e){
        console.error(e)
        throw 1
    }
}

function isnode(node){
    try{
        return node.children[0].children[1]
    }catch(e){
        console.error(e)
        throw 1
    }
}

function getpname(node){
    try{
        return node.children[0].children[1].children[0].children[0].innerHTML
    }catch(e){
        console.error(e)
        throw 1
    }
}

function getpid(node){
    try{
        return node.dataset.participantId
    }catch(e){
        console.error(e)
        throw 1
    }
}

function getplink(node){
    try{
        return node.children[0].children[0].src
    }catch(e){
        console.error(e)
        throw 1
    }
}

let starterinterval = setInterval(function(){
    if(document.readyState === "complete" && document.querySelector('button[class="VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc"][aria-label="Show everyone"]')){
        main()
        clearInterval(starterinterval)
    }
},1000)
