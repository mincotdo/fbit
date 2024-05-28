//memefi
(async function() {
    accIp=['mincotdo','243.204',
           'dannytuan194','243.146',
           'SWolfMax','242.223',
           'mainguyen65bn','243.175',
           'taobn99','242.221',
           'ngocthu94hg','242.220',
           'nhathoang76','242.206'
    ];

    browser='ff';
    outGameIndex=0;
    InGameIndex=0;

    //teleprepare
    tokenControl	= '6217849493:AAHsHMuC8erAtP4lq4vHX63OzgdLw4oNOx0';	// MBCR BOT
    chatIDData 		= '-925748415';

    teleUid='';
    teleUip='';
    teleUid_index=0;
    stt=0;

    oldMesTeleId='';
    oldMesTeleId_outGame='';
    oldMesTeleId_inGame='';

    window.onmessage = function(e) {
        if (e.data.indexOf('startTap-') != -1) {
            if(teleUid!=''){
                teleApi('mesSend',tokenControl,chatIDData,stt+' - START '+e.data.split('startTap-')[1],'');
            }
        }
        if (e.data.indexOf('endTap-') != -1) {
            if(teleUid!=''){
                teleApi('mesSend',tokenControl,chatIDData,stt+' - END '+e.data.split('endTap-')[1],'');
            }
        }
    };

    while(1){
        chatInfo=document.getElementsByClassName('ChatInfo')[0];

        if(chatInfo!=undefined){
            chatInfoName=chatInfo.textContent;
        }else{
            chatInfoName='';
        }

        if(chatInfoName.indexOf('MemeFi Coin')!=-1){//đang ở memefi bot
            console.info('IN MEMEFI BOT');

            portals=document.getElementsByClassName('Modal').length;
            if(portals==0){//Game chua bat
                selectorSet=document.getElementsByClassName('inline-button-text');

                selectorIndex=0;
                for(i=0;i<selectorSet.length-1;i++){
                    if(selectorSet.textContent=='Start playing'){
                        selectorIndex=i;
                    }
                }

                simulateLongPress(selectorSet[selectorIndex]);
                await delay(10);
            }else{
                await delay(5);
            }

            try{
                back=false;
                iwhile2=0;
                ingameIndex=0;

                while(1){
                    iwhile2++;

                    back_display=document.getElementsByClassName('Button smaller translucent round')[0].title;
                    if(back_display=='Back'&&iwhile2>6){
                        console.info('IN MEMEFI BOT - BOOSTER PAGE');
                        iwhile=0;
                        while(document.getElementsByClassName('Button smaller translucent round')[0].title=='Back'){
                            await delay(1);
                            iwhile++;
                            if(iwhile>15){
                                if(browser=='ff'){
                                    //Firefox
                                    document.getElementsByClassName('modal-backdrop')[0].click();
                                }
                                if(browser=='cr'){
                                    console.info('IN MEMEFI BOT - CLICK BACK');
                                    selectorSet=document.querySelector("#portals > div > div > div > div.modal-dialog > div.modal-header > button");
                                    simulateLongPress(selectorSet);

                                    await delay(30);

                                    portals=document.getElementsByClassName('Modal').length;
                                    if(portals==0){//Out game

                                    }else{//In game
                                        console.info('IN MEMEFI BOT - CLOSE GAME');
                                        selectorSet=document.querySelector("#portals > div > div > div > div.modal-dialog > div.modal-header > button");
                                        simulateLongPress(selectorSet);
                                    }
                                }

                                ran1=Math.floor((Math.random() * 2) + 1);
                                ran2=Math.floor((Math.random() * 200) + 1);
                                reopenTime=700+(ran1==1?(-1):1)*ran2;
                                console.info('IN MEMEFI BOT - WAIT REOPEN '+reopenTime+' SECONDS');

                                if(teleUid!=''){
                                    teleApi('mesSend',tokenControl,chatIDData,teleUid+' - WAIT '+reopenTime+(teleUip!=''?' - '+teleUip:''),'');
                                }

                                iwhile=0;
                                oldMesTeleId='';
                                while(iwhile*10<=reopenTime){
                                    await delay(10);
                                    iwhile++;

                                    if(iwhile%10==0){
                                        console.info('TIME REMAINING '+(reopenTime-iwhile*10)+' SECONDS');

                                        if(oldMesTeleId!=''){
                                            teleApi('mesDelete',tokenControl,chatIDData,'',oldMesTeleId);
                                        }

                                        if(teleUid!=''){
                                            oldMesTeleId=teleApi('mesSend',tokenControl,chatIDData,teleUid+' - REMAINING '+(reopenTime-iwhile*10)+(teleUip!=''?' - '+teleUip:''),'');
                                        }
                                    }
                                }

                                back=true;
                                break;
                            }
                        }
                    }

                    //check tu dong game - break while
                    portals=document.getElementsByClassName('Modal').length;
                    if(portals==0){//Out game
                        outGameIndex++;
                        InGameIndex=0;
                        oldMesTeleId_inGame='';
                        console.info('CHECK - OUT GAME');

                        if(oldMesTeleId_outGame!=''){
                            teleApi('mesDelete',tokenControl,chatIDData,'',oldMesTeleId_outGame);
                        }
                        if(teleUid!=''){
                            oldMesTeleId_outGame=teleApi('mesSend',tokenControl,chatIDData,teleUid+' - OUT '+outGameIndex*60+(teleUip!=''?' - '+teleUip:''),'');
                        }

                        break;
                    }else{//In game
                        InGameIndex++;
                        outGameIndex=0;
                        oldMesTeleId_outGame='';
                        console.info('CHECK - IN GAME');

                        if(oldMesTeleId_inGame!=''){
                            teleApi('mesDelete',tokenControl,chatIDData,'',oldMesTeleId_inGame);
                        }
                        if(teleUid!=''){
                            oldMesTeleId_inGame=teleApi('mesSend',tokenControl,chatIDData,teleUid+' - IN '+InGameIndex*60+(teleUip!=''?' - '+teleUip:''),'');
                        }

                        ingameIndex++;

                        if(teleUid_index==0){
                            try{
                                teleUsername=document.getElementsByTagName('iframe')[0].src.split('username')[1].split('%2522')[2];
                                stt=(accIp.indexOf(teleUsername))/2+1;
                                teleUid=stt+'. '+document.getElementsByTagName('iframe')[0].src.split('username')[1].split('%2522')[2];

                                teleUip=accIp[accIp.indexOf(teleUsername)+1];
                                teleUid_index++;
                            }catch(err){
                                teleUid='username';
                                teleUip='';
                            }
                        }

                        if(ingameIndex>15){//>15phut
                            teleApi('mesSend',tokenControl,chatIDData,teleUid+' - IN OVER'+(teleUip!=''?' - '+teleUip:''),'');

                            if(browser=='ff'){
                                //Firefox
                                document.getElementsByClassName('modal-backdrop')[0].click();
                            }
                            if(browser=='cr'){
                                try{
                                    console.info('IN MEMEFI BOT - CLICK BACK');
                                    selectorSet=document.querySelector("#portals > div > div > div > div.modal-dialog > div.modal-header > button");
                                    simulateLongPress(selectorSet);
                                }catch(err){}

                                await delay(1);

                                portals=document.getElementsByClassName('Modal').length;
                                if(portals==0){//Out game

                                }else{//In game
                                    console.info('IN MEMEFI BOT - CLOSE GAME');
                                    selectorSet=document.querySelector("#portals > div > div > div > div.modal-dialog > div.modal-header > button");
                                    simulateLongPress(selectorSet);
                                }
                            }
                        }
                    }

                    await delay(60);
                }
                await delay(10);
            }catch(err){
                console.info('CATCH ERROR');
            }
            await delay(5);
        }else{//đang ở ngoài memefi bot
             console.info('OUTER MEMEFI BOT');
            //window.location.href = "https://web.telegram.org/a/#6619665157";
            await delay(5);
        }
    }
})();

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

function teleApi(actionFn,tokenFn,chatIdFn,ctnFn,messIdFn){
    try{
        if(actionFn == 'mesSend'){
            messSend = httpGet('https://api.telegram.org/bot'+tokenFn+'/sendMessage?chat_id='+chatIdFn+'&text='+ctnFn);

            returnvar = messSend.split('message_id":')[1].split(',"')[0];
        }else if(actionFn == 'getUpdates'){
            returnvar = httpGet('https://api.telegram.org/bot'+tokenFn+'/getUpdates');
        }else if(actionFn == 'getUpdatesLength'){
            returnvar = httpGet('https://api.telegram.org/bot'+tokenFn+'/getUpdates').length;
        }else if(actionFn == 'mesDelete'){
            returnvar = httpGet('https://api.telegram.org/bot'+tokenFn+'/deleteMessage?chat_id='+chatIdFn+'&message_id='+messIdFn);
        }else if(actionFn == 'getNewestMes'){
            temp1 = httpGet('https://api.telegram.org/bot'+tokenFn+'/getUpdates?offset=-1');

            if(temp1.indexOf('"text":"')!=-1){
                returnvar = temp1.split('"text":"')[1].split('"')[0];	// newest message
            }else{
                returnvar = '';
            }
        }else if(actionFn == 'getMesPin'){
            temp1 = httpGet('https://api.telegram.org/bot'+tokenFn+'/getChat?chat_id='+chatIdFn);
            console.log('https://api.telegram.org/bot'+tokenFn+'/getChat?chat_id='+chatIdFn);
            if(temp1.indexOf('pinned_message')==-1){	// Not found pinned message
                returnvar = '';
            }else{										// Have pinned message
                returnvar = temp1.split('"text":"')[1].split('"')[0];
            }
        }

        return returnvar;
    }catch(err){
        return "";
    }
}
//memefi
