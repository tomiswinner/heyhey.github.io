
'use strict';

//デリゲーションでイベントを各ボタンにつける
document.getElementById('show_btn').addEventListener('click', event => {
  let target = event.target;
  let parentOfTarget = target.parentNode;
  const MainBtn = parentOfTarget.previousElementSibling;
  //メインボタンのクリックで、アコーディオンの表示/非表示を切り替え
  if(target.classList.contains('createdBtn')){
    accordion(target);

  }
  //アコーディオンボタンのクリックで内容表示
  if(target.classList.contains('list0')){
    const btnIdString = MainBtn.id;
    //id = button + タイトル, なんで6文字目から最後まで切り取ればよい
    //createBallonはボタンと一緒に作って、hiddenにしとくのが正解だと思います

    displayMemo(btnIdString.slice(6,btnIdString.length)-1);
    }

  if(target.classList.contains('list1')){
    //オブジェクトで渡すようにしてしまえば、後から追加とかがように行えるし、改変しやすいね（clearMemoBtnにオブジェクトで渡す

    const removeTargets = {
      0 : MainBtn,
      1 : parentOfTarget,
    };

    function acquireRemoveKey(){
      const removeStorageKey =  MainBtn.id.replace("button","");
      return removeStorageKey
    };

    const removeStorageKeys = {
      0: acquireRemoveKey(),

    };

    const result = confirm('本当に削除しますか？');
    if(result){
      clearMemoBtn(removeTargets);
      //なんでかメインボタン削除だけでいける、、、そしてえらーは？ ===> remove の仕様間違ってた、あとgetelementbyidもケアレスミスしてるよ
      cle(removeStorageKeys);
      
    }
    else if(!result){
      return;
    }    
  }
})

function newMemoBtn(keyValue){//kyeValueはストレージのバリューか
  //末尾に加える
  const newBtn = document.createElement("button");
  //今追加したボタンにテキスト設定（lengthで末尾の番号をとって）
  newBtn.textContent = keyValue//なぜvalueじゃだめなんだろうか
  
  //個別のidと共通のクラス・イベントをつけてます
  newBtn.classList.add("createdBtn");
  newBtn.id = 'button' + keyValue;  
  
  document.getElementById("show_btn").append(newBtn);
  
  createBallon(newBtn);
}


function allClearMemoBtn(){
  console.log(myStorage.length);
 
  for(let i = 0; i < myStorage.length; i++){
    //buttonの各idはbutton + タイトル（localStroge の key)なので、それでgetElementする
    const removeTargets = {};
    removeTargets['0'] = document.getElementById("button" + myStorage.key(i));
    console.log(removeTargets['0']);
    removeTargets['1'] = removeTargets['0'].nextElementSibling;

    clearMemoBtn(removeTargets); 
    }
    //カンペキですわ、文句なし、天才
}



//どうやって、clearMemoBtnでもmyStroageから削除できるか（あるいはcle()メソッドで削除キーをもらえるか

function clearMemoBtn(target){
  for(const item in target){
    target[item].remove();
  }
}

function displayMemo(num){
  //title,contentフォームに再表示する
  console.log(num);
  document.getElementById('key').value = myStorage.key(num);
  document.getElementById('value').value = myStorage.getItem(myStorage.key(num));

}


function accordion(target) {
  if(target.nextElementSibling.style.display == ''){
    target.nextElementSibling.style.display = 'block';
    console.log("noneだよん");
      //これで一番最初の子要素を取得できる、、、らしいんだけど
  }else if(target.nextElementSibling.style.display === 'block'){
    target.nextElementSibling.style.display = '';
    console.log(target.nextElementSibling);
  }

  //getElementsByClassNameはelementsと複数形になっているように、要素のリストが返ってきます。リストの中身を1つ1つ処理する必要があります。
  
}

//これ毎回作り出すのきれいじゃなくない？デリゲーションみたいにどっかから一つのものを流用できません？

function createBallon(prevSibling){
    // createElement は作成した要素を返すので変数にそのまま格納できる。
    const orderedList = document.createElement('ol');
    orderedList.classList.add('OL');

    (function createLists(ol){
       for(let i = 0; i < 2; i++){
         const list = document.createElement('li');
         list.classList.add('list' + i);
         ol.append(list);
         if(i === 0){  
           list.textContent = "メモを表示/編集する";
         }else{
           list.textContent = "メモ内容の削除";
         }
       }
     }(orderedList));  //このようにすれば即時関数で引数が使える

     prevSibling.insertAdjacentElement('afterend',orderedList);
  };