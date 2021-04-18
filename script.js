function zeroPadding(num, len){
  return (Array(len).join('0') + num).slice(-len);
}
function set2fig(num) {
  // 数値が1桁だったら2桁の文字列にして返す
  let ret;
  if (num < 10) { ret = "0" + num; }
  else { ret = num; }
  return ret;
}
function isNumOrZero(num) {
  // 数値でなかったら0にして返す
  if (isNaN(num)) { return 0; }
  return num;
}
function showCountdown() {
  // 現在日時を数値(1970-01-01 00:00:00からのミリ秒)に変換
  let nowDate = new Date();
  let dnumNow = nowDate.getTime();

  // 指定日時を数値(1970-01-01 00:00:00からのミリ秒)に変換
  let inputYear = 2021
  let inputMonth = 3
  let inputDate = 20
  let inputHour = 0
  let inputMin = 0
  let inputSec = 0

  let targetDate = new Date(isNumOrZero(inputYear), isNumOrZero(inputMonth), isNumOrZero(inputDate), isNumOrZero(inputHour), isNumOrZero(inputMin), isNumOrZero(inputSec));
  let dnumTarget = targetDate.getTime();

  // 表示を準備
  let dlYear = targetDate.getFullYear();
  let dlMonth = targetDate.getMonth() + 1;
  let dlDate = targetDate.getDate();
  let dlHour = targetDate.getHours();
  let dlMin = targetDate.getMinutes();
  let dlSec = targetDate.getSeconds();
  let msg1 = "期限の" + dlYear + "/" + dlMonth + "/" + dlDate + " " + set2fig(dlHour) + ":" + set2fig(dlMin) + ":" + set2fig(dlSec);

  // 引き算して日数(ミリ秒)の差を計算
  let diff2Dates = dnumTarget - dnumNow;
  if (dnumTarget < dnumNow) {
    // 期限が過ぎた場合は -1 を掛けて正の値に変換
    diff2Dates *= -1;
  }

  // 差のミリ秒を、日数・時間・分・秒に分割
  let dDays = diff2Dates / (1000 * 60 * 60 * 24);   // 日数
  diff2Dates = diff2Dates % (1000 * 60 * 60 * 24);
  let dHour = diff2Dates / (1000 * 60 * 60);   // 時間
  diff2Dates = diff2Dates % (1000 * 60 * 60);
  let dMin = diff2Dates / (1000 * 60);   // 分
  diff2Dates = diff2Dates % (1000 * 60);
  let dSec = diff2Dates / 1000;   // 秒
  diff2Dates = diff2Dates % (1000);
  let dMillSec = diff2Dates;   // 秒
  let msg2 = Math.floor(dDays) + "日"
    + Math.floor(dHour) + "時間"
    + Math.floor(dMin) + "分"
    + Math.floor(dSec) + "秒"
    + zeroPadding(Math.floor(dMillSec), 4);

  // 表示文字列の作成
  let msg;
  if (dnumTarget > dnumNow) {
    // まだ期限が来ていない場合
    // msg = msg1 + "までは、あと" + msg2 + "です。";
    msg = "あと" + msg2 + "です。";
  }
  else {
    // 期限が過ぎた場合
    msg = msg1 + "は、既に" + msg2 + "前に過ぎました。";
  }

  // 作成した文字列を表示
  document.getElementById("RealtimeCountdownArea").innerHTML = msg;
}
// 1秒ごとに実行
setInterval('showCountdown()', 16);