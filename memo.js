'use strict';


const myStorage = localStorage;

//データの保存
function set(){
  const keyVal = document.getElementById('key').value;
  const valVal = document.getElementById('value').value;
  const prevLength = myStorage.length;

  myStorage.setItem(keyVal,valVal);

  if(!(myStorage.length === prevLength)){
    newMemoBtn(keyVal);
  }
  // Object.keys()がweb storage apiでは用意されていないので、用意されているkey()メソッドとfor文を使って疑似的にkeys()メソッド化、その後、someを使って被りがある場合項目ボタンを生成しないようにした。
  
  // let myStorageKeys = [];
  console.log(myStorage.key(0));  

  // for(let i = 0; i < myStorage.length; i++){
  //   myStorageKeys.push(myStorage.key(i));
  //   console.log(myStorage.key(i),i);
  // }

  // myStorageKeys = myStorageKeys.filter(value => Boolean(value ));    //boolean は ゴミ値を真偽地falseに変換してくれる＝テスト関数に合格しない

  
  // if(!myStorageKeys.some(value => {
  //   return value === keyVal
  // })){
  //   //これ一回目から一致しちゃうんであかんな
  //   //if文で分岐させるより、myStoragekeysで重複消したほうがよいか？
  //   newMemoBtn();
  //   console.log("重複ありません、ボタン作成します");
  // // }
  // myStorageKeys = [];
  
}

function allCle(){   //ここclearだとメソッドかぶる（storageクラスのものと）んで、html側のイベントハンドラとして設定したときに、挙動がおかしくなる

  allClearMemoBtn();
  myStorage.clear();
  
}











//shou_resultのところにもonloadで最初からでるようにしたいよね、あとaddeveが不可能だった理由も知りたい。






function cle(removeKeyValue){
  myStorage.removeItem(removeKeyValue['0']);
  show_result();

  //どうやってこのremoveKyeValueを持ってくるか、、、というかそもそも順番にじゃなくて、消したいアイテムを消したいんすよね、だからこのストレージをクリアは必要ないわけだわ。

}


// function show_result(){
//   let result = "";
//   //保存されているだけループ
//   for(let i = 0; i < myStorage.length; i++){
//     //i番目のキー取得
//     const k = myStorage.key(i);  //key はキーを取得するメソッド
//     result += k + " : " + myStorage.getItem(k) + "<br>";
//     }
//     document.getElementById("show_result").innerHTML = result;
// }






//storage api の要素をすべて抽出する方法
//localStorage.setItem('キー1', 'バリュー1');
// localStorage.setItem('キー2', 'バリュー2');
// localStorage.setItem('キー3', 'バリュー3');

// ①for (key in localStorage) {
//     if (localStorage.hasOwnProperty(key)) {
//         console.log(key);
//     }
// }

// ②for (var i = 0, length = localStorage.length; i < length; ++i) {
//   console.log(localStorage.key(i));
// }

// ③Object.keys(localStorage).forEach(function(key) { console.log(key); });