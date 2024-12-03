let player = document.getElementById('my-player');
var nowTime = 0;
var prevTime = 0;
var pause = false;
var play = true;
var seek = false;
var participant_id = 0;


function pushId(){
    let participant_id_element = document.getElementById('participant_id');
    participant_id = participant_id_element.value;
}

player.addEventListener('playing', function() {
    if (participant_id == 0) {
        player.pause();
        alert("idを入力してください");
    }else{
        if (play){
            // console.log(participant_id + ',' + nowTime + ',' + [1, 0, 0, 0, 0, 0] + ',' + (nowTime - prevTime));
            const progress = [1, 0, 0, 0, 0, 0];
            const logData = {
                participantId: participant_id,
                timestamp: nowTime,
                progress: progress,
                duration: 0
            };
            const jsonString = JSON.stringify(logData);
            console.log(jsonString);
        }else{
            play = true;
        }
    }
});

player.addEventListener('pause', function() {
    pause = true;
    console.log(participant_id + ',' + nowTime + ',' + [0, 1, 0, 0, 0, 0] + ',' + (nowTime - prevTime));
    
});

player.addEventListener('seeking', function() {
    nowTime = player.currentTime;
    if((nowTime - prevTime) >= 5.000 && (nowTime - prevTime) <= 5.500){ //早送りスキップ
        console.log(participant_id + ',' + nowTime + ',' + [0, 0, 1, 0, 0, 0] + ',' + (nowTime - prevTime));
        play = false;
    }else if((nowTime - prevTime) <= -4.500 && (nowTime - prevTime) >= -5.000){ //巻き戻しスキップ
        console.log(participant_id + ',' + nowTime + ',' + [0, 0, 0, 1, 0, 0] + ',' + (nowTime - prevTime));
        play = false;
    }else if((nowTime - prevTime) > 5.500 && pause){ //早送りシーク
        console.log(participant_id + ',' + nowTime + ',' + [0, 0, 0, 0, 1, 0] + ',' + (nowTime - prevTime));
        pause = false;
        play = false;
    }else if((nowTime - prevTime) < -5.000 && pause){ //巻き戻しシーク
        console.log(participant_id + ',' + nowTime + ',' + [0, 0, 0, 0, 0, 1] + ',' + (nowTime - prevTime));
        pause = false;
        play = false;
    }
});

player.addEventListener('timeupdate', function() {
    prevTime = nowTime;
    nowTime = player.currentTime;
});

function showNewButton(){
    const goToLADButtonContainer = document.getElementById('goToLADButton');
    const goToLADButton = document.createElement('button');
    goToLADButton.textContent = "LADへ移動する";
goToLADButton.addEventListener('click', function() {
    const newPageUrl = 'lad.html';
    window.location.href = newPageUrl;
  });
    goToLADButtonContainer.appendChild(goToLADButton);
}

// (function(){
//     const originalLog = console.log;
//     let logData = [];
//     console.log = function(...args){
//         logData.push(args.join(', '));
//         originalLog.apply(console, args);
//     };
//     function downloadCSV(logData, filename = participant_id + '.csv'){
//         const csvContent = logData.join("\n");
//         const blob = new Blob([csvContent], { type: 'text/csv;charset=shift-js'});
//         const link = document.createElement('a');
//         const url = URL.createObjectURL(blob);
//         link.setAttribute('href', url);
//         link.setAttribute('download', filename);
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     }

//     const button = document.createElement('button');
//     button.textContent = ("小テストまで終えたのでログデータを送信する");
//     button.style.border = "solid 2px red";
//     button.style.borderRadius = "100px";
//     button.style.backgroundColor = "orange";
//     button.style.marginTop = "30px";
//     document.body.appendChild(button);

//     button.addEventListener('click', function(){
//         downloadCSV(logData);
//         // window.open('','_self').close();
//     });
// })();