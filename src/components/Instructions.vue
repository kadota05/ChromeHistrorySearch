<template>
  <div class="instructions">
    <h2>利用方法</h2>
    <ol>
      <li><a href="https://takeout.google.com/" target="_blank">Google Takeout</a>にアクセスします。</li>
      <li>「すべて選択を解除」をクリックし、「Chrome」のみを選択します。</li>
      <li>「次へ」をクリックします。</li>
      <li>配信方法を選択します（メール送信推奨）。</li>
      <li>エクスポート頻度は「1回のみ」を選択します。</li>
      <li>ファイル形式（ZIP推奨）とサイズ（2GB）を選択します。</li>
      <li>「エクスポートを作成」をクリックします。</li>
      <li>通知を受け取ったらデータをダウンロードします。</li>
      <li>ダウンロードしたZIPファイルをこのアプリにアップロードします。</li>
      <li>検索したいキーワードを入力し、検索ボタンをクリックします。</li>
    </ol>
    <router-link to="/" class="back-link">トップページに戻る</router-link>
  </div>
</template>

<script>
export default {
  name: 'Instructions'
}
</script>

<style scoped>
.instructions {
  background-color: #1e1e1e;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.1);
}

h2 {
  color: #ffd700;
  margin-bottom: 20px;
}

ol {
  padding-left: 20px;
}

li {
  margin-bottom: 15px;
  line-height: 1.6;
}

a {
  color: #ffd700;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ffd700;
  color: #121212;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.back-link:hover {
  background-color: #ffea00;
  text-decoration: none;
}
</style>