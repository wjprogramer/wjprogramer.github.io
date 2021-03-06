const homePageContent = `<div id="homePage">
<h1>
  首頁
  <span id="versionLabel" style="font-size: 20px; color: lightgray;"></span>
</h1>

<p>
  就是個獸廄統計工具，專門提供給獸廄經營者，
</p>

<p>
  導入智慧化（並沒有）的生產力工具，幫助制定經營策略
</p>

<hr>

<h2>野獸</h2>

<button id="goMonsterListPageButton" class="w3-button w3-blue w3-hover-light-blue">
  野獸列表
</button>

<button id="goCreateMonsterPageButton" class="w3-button w3-blue w3-hover-light-blue">
  新增野獸
</button>

<hr>

<h2>匯入/匯出</h2>

<input id='monstersJsonFileInput' hidden type="file" accept=".json," onChange={this.onSitesFileChange} />
<button id="importMonstersJsonButton" class="w3-button w3-blue w3-hover-light-blue">
  匯入
</button>

<button id="exportMonstersJsonButton" class="w3-button w3-blue w3-hover-light-blue">
  匯出
</button>

</div>`;