//
//  tapGame.js
//  MonacaFirstApp
//
//  Created by Natsumo Ikeda on 2016/07/01.
//  Copyright 2017 FUJITSU CLOUD TECHNOLOGIES LIMITED All Rights Reserved.
//

/******************************************************/
    
/******************************************************/

// mBaaSの初期化
var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
// タイマー設定
var countTimer = 13;
var countTimer20 = 23;
// タップ回数カウンター
var counter = 0;

// 「tapFlag」的のタップ可否設定
var tapFlag = false;
var tapFlag20 = false;

// 「Start」ボタン押下時の処理
function startGame() {
    // ボタンの無効化
    document.gameForm.start.disabled = true;
    document.gameForm.start20.disabled = true;
    document.gameForm.ranking.disabled = true;
    
    // タップカウンターリセット
    this.counter = 0;
    $("#list-page strong").html(String(0));
    // タイマーリセット
    this.countTimer = 13;
    // タイマーを起動
    countTime(countTimer);
}
function startGame20() {
    // ボタンの無効化
    document.gameForm.start20.disabled = true;
    document.gameForm.start.disabled = true;
    document.gameForm.ranking.disabled = true;
    
    // タップカウンターリセット
    this.counter20 = 0;
    $("#list-page strong").html(String(0));
    // タイマーリセット
    this.countTimer20 = 23;
    // タイマーを起動
    countTime20(countTimer20);
}

// 【mBaaS】データの保存
function saveScore (name, score) {
    // **********【問題１】名前とスコアを保存しよう！**********
    var GameScore = ncmb.DataStore("GameScore");
// クラスインスタンスを生成
var gameScore = new GameScore();
// 保存先クラスを作成
var highScore = ncmb.DataStore("GameScore");
// 値を設定
gameScore.set("name", name);
gameScore.set("score", score);
// 保存を実施
gameScore.save()
         .then(function (){
             // 保存に成功した場合の処理
             console.log("保存に成功しました。");
         })
         .catch(function (error){
             // 保存に失敗した場合の処理
             console.log("保存に失敗しました。エラー:" + error); 
         });
         
// scoreの降順でデータ5件を取得するように設定する
highScore.order("score", true)
.limit(7) .fetchAll()
.then(function(results){
// 検索に成功した場合の処理
console.log("検索に成功しました。");
// テーブルにデータをセット
setData(results);
})
}


function saveScore20 (name, score) {
    // **********【問題１】名前とスコアを保存しよう！**********
    var GameScore20 = ncmb.DataStore("GameScore20");
// クラスインスタンスを生成
var gameScore20 = new GameScore20();
// 保存先クラスを作成
var highScore20 = ncmb.DataStore("GameScore20");
// 値を設定
gameScore20.set("name", name);
gameScore20.set("score", score);
// 保存を実施
gameScore20.save()
         .then(function (){
             // 保存に成功した場合の処理
             console.log("保存に成功しました。");
         })
         .catch(function (error){
             // 保存に失敗した場合の処理
             console.log("保存に失敗しました。エラー:" + error); 
         });
         
// scoreの降順でデータ5件を取得するように設定する
highScore20.order("score", true)
.limit(7) .fetchAll()
.then(function(results){
// 検索に成功した場合の処理
console.log("検索に成功しました。");
// テーブルにデータをセット
setData(results);
})
.catch(function(error){
// 検索に失敗した場合の処理
console.log("検索に失敗しました。エラー:" +error);
});
    
    
    
    
    
    
    
    
    
    
    
    // ********************************************************
}

// タイマー
function countTime(time) {
    if (time > 0){
        if (time >= 11) {
            this.tapFlag = false;
            $("#list-page p").html(String(time-10));
        } else if (time == 10) {
            this.tapFlag = true;
            $("#list-page p").html("スタート！");
        } else {
            this.tapFlag = true;
            $("#list-page p").html(String(time));
        }
        this.countTimer -= 1;
        // １秒後にcountTime()を呼び出す
        setTimeout("countTime(countTimer)",1000);
    } else {
        this.tapFlag = false;
        $("#list-page p").html("タイムアップ！");
        imputName(this.counter);
    }    
}
function countTime20(time) {
    if (time > 0){
        if (time >= 21) {
            this.tapFlag20 = false;
            $("#list-page p").html(String(time-20));
        } else if (time == 20) {
            this.tapFlag20 = true;
            $("#list-page p").html("スタート！");
        } else {
            this.tapFlag = true;
            $("#list-page p").html(String(time));
        }
        this.countTimer20 -= 1;
        // １秒後にcountTime()を呼び出す
        setTimeout("countTime20(countTimer20)",1000);
    } else {
        this.tapFlag = false;
        $("#list-page p").html("タイムアップ！");
        imputName20(this.counter);
    }    
}

// 名前入力アラートの表示
function imputName(count){
    // 入力アラートを表示
	var name = window.prompt("名前を入力してください", "");
    if (name == null || name == "") {
        $("#list-page p").html("保存がキャンセルされました");        
    } else {
        // スコアと入力した名前を保存
        saveScore(name, count);
        $("#list-page p").html(name + "さんのスコアは" + String(count) + "連打でした"); 
    }
    // ボタンの有効化
    document.gameForm.start.disabled = false;
    document.gameForm.start20.disabled = false;
    document.gameForm.ranking.disabled = false;
}



function imputName20(count){
    // 入力アラートを表示
	var name = window.prompt("名前を入力してください", "");
    if (name == null || name == "") {
        $("#list-page p").html("保存がキャンセルされました");        
    } else {
        // スコアと入力した名前を保存
        saveScore20(name, count);
        $("#list-page p").html(name + "さんのスコアは" + String(count) + "連打でした"); 
    }
    // ボタンの有効化
    document.gameForm.start.disabled = false;
    document.gameForm.start20.disabled = false;
    document.gameForm.ranking.disabled = false;
}
// タップ数カウント
function tapCount() {
    if (tapFlag) {
        this.counter += 1;
        $("#list-page strong").html(String(this.counter));
    }
}

