請調整 src/content/*.md 目錄下所有 Markdown 檔案的 YAML front matter，具體要求如下：

1. 新增 slug 欄位，內容為該檔案名稱（不含副檔名），並將檔名轉為小寫且以連字號（-）分隔，例如：2017-06-20-HelloWorld 轉為 2017-06-20-hello-world。
2. 移除 published 欄位。
3. 如果沒有description 欄位，請新增 description 欄位，內容為總結該文章的前四句話（不含標題與空行）。
4. 保持其他 front matter 欄位與內容不變。

請參考 [YAML front matter 格式說明](https://jekyllrb.com/docs/front-matter/)。
