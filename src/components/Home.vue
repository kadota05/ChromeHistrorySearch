<template>
  <div class="home">
    <div class="search-form">
      <input type="file" @change="handleFileUpload" accept=".zip" class="file-input" />
      <input v-model="keyword" placeholder="検索キーワード" @keyup.enter="searchHistory" class="keyword-input" />
      <select v-model="timeRange" class="time-range-select">
        <option value="all">全期間</option>
        <option value="1">過去1ヶ月</option>
        <option value="3">過去3ヶ月</option>
        <option value="6">過去6ヶ月</option>
        <option value="12">過去1年</option>
      </select>
      <button @click="searchHistory" :disabled="!file || !keyword" class="search-button">検索</button>
    </div>
    <div v-if="loading" class="loading">検索中...</div>
    <div v-else-if="results.length === 0 && !error" class="no-results">ヒットしませんでした</div>
    <ul v-else-if="results.length > 0" class="results">
      <li v-for="(result, index) in results" :key="index">
        <a :href="result.url" target="_blank" class="result-link">{{ result.title }}</a>
        <p class="result-description">{{ result.description }}</p>
      </li>
    </ul>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import JSZip from 'jszip';

export default {
  name: 'Home',
  data() {
    return {
      file: null,
      keyword: '',
      timeRange: 'all',
      results: [],
      loading: false,
      error: null
    }
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async searchHistory() {
      if (!this.file || !this.keyword) return;

      this.loading = true;
      this.error = null;
      this.results = [];

      try {
        const zip = new JSZip();
        const contents = await zip.loadAsync(this.file);
        const historyFile = contents.file("Takeout/Chrome/履歴.json");

        if (!historyFile) {
          throw new Error("履歴ファイルが見つかりません。");
        }

        const historyJson = await historyFile.async("string");
        const history = JSON.parse(historyJson);

        const currentTime = new Date().getTime();
        const timeRangeInMs = this.getTimeRangeInMs(this.timeRange);

        this.results = history["Browser History"]
          .filter(entry => {
            const entryTime = entry.time_usec / 1000;
            return (
              entry.url &&
              entry.url.toLowerCase().includes(this.keyword.toLowerCase()) &&
              (this.timeRange === 'all' || (currentTime - entryTime) <= timeRangeInMs)
            );
          })
          .map(entry => ({
            url: entry.url,
            title: entry.title || this.extractTitleFromUrl(entry.url),
            description: this.generateDescription(entry)
          }));

      } catch (error) {
        this.error = `エラーが発生しました: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
    extractTitleFromUrl(url) {
      try {
        const urlObj = new URL(url);
        return urlObj.hostname;
      } catch (error) {
        return url;
      }
    },
    generateDescription(entry) {
      const date = new Date(entry.time_usec / 1000).toLocaleString();
      return `最終訪問日時: ${date}`;
    },
    getTimeRangeInMs(range) {
      const monthInMs = 30 * 24 * 60 * 60 * 1000;
      switch (range) {
        case '1': return monthInMs;
        case '3': return 3 * monthInMs;
        case '6': return 6 * monthInMs;
        case '12': return 12 * monthInMs;
        default: return Infinity;
      }
    }
  }
}
</script>

<style scoped>
.home {
  background-color: #1e1e1e;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.1);
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.file-input,
.keyword-input,
.time-range-select,
.search-button {
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #2a2a2a;
  color: #e0e0e0;
}

.time-range-select {
  cursor: pointer;
}

.search-button {
  background-color: #ffd700;
  color: #121212;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover:not(:disabled) {
  background-color: #ffea00;
}

.search-button:disabled {
  background-color: #4a4a4a;
  cursor: not-allowed;
}

.loading,
.no-results,
.error {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}

.results {
  list-style-type: none;
  padding: 0;
}

.results li {
  margin: 20px 0;
  padding: 15px;
  background-color: #2a2a2a;
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.results li:hover {
  transform: translateY(-5px);
}

.result-link {
  color: #ffd700;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2em;
  display: block;
  margin-bottom: 10px;
}

.result-description {
  color: #b0b0b0;
  font-size: 0.9em;
}

.error {
  color: #ff6b6b;
}
</style>