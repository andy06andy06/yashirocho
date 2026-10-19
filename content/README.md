# 怎麼修改網站內容

網站上所有的文字和照片都放在這個 `content/` 資料夾，不需要動到程式碼。
改完存檔、commit 並 push 到 GitHub，Vercel 會自動重新部署，幾分鐘後網站就會更新。

| 想改的東西 | 改這個檔案 |
| --- | --- |
| 品牌名、訂房連結、電話、地址、LINE / FB / IG、民宿編號 | `site.yaml` |
| 首頁最上方的輪播照片 | `site.yaml` 的 `hero.photos` |
| 首頁各段文字（品牌故事、理念、四大特色、標語、毛孩、訂房、Footer） | `home.yaml` |
| 每一棟的名稱、介紹、規格、標籤、主題色、照片、是否開放毛孩 | `villas/red.yaml`、`shadow.yaml`、`wood.yaml`、`gold.yaml` |
| 入住須知（FAQ） | `faq.yaml` |
| 設施與服務清單 | `amenities.yaml` |
| 選單、按鈕等介面文字 | `ui.yaml` |

## 文字

- 三語欄位長這樣，英日文留空時會自動顯示中文：
  ```yaml
  title:
    zh: 一棟一景
    en: One villa, one view
    ja: 一棟一景
  ```
- 多行文字以 `|` 開頭，每一行就是網頁上的一行，**空一行代表分段**：
  ```yaml
  body:
    zh: |
      旅行的意義，
      不一定是走得更遠。

      有時候，
      只是找一個地方，
  ```
- 縮排請用空白鍵，不要用 Tab。內容裡如果有 `:` 或 `#`，整段用雙引號包起來，例如 `"@machi8"`。
- FAQ 的回答可以用 `**粗體**`，以 `- ` 開頭的行會變成條列。

## 照片

1. 把照片放進 `content/photos/` 底下的資料夾，例如 `content/photos/red/`。
   JPG、PNG、HEIC 都可以，build 時會自動轉成 WebP，並產生縮圖。
   建議長邊不超過 2400px，以免 repo 越來越大。
2. 在對應的 YAML 寫上路徑（相對於 `content/photos/`）：
   ```yaml
   photos:
     - red/IMG_2336.jpg
     - file: red/IMG_9999.jpg     # 也可以加上說明文字，會顯示在放大檢視
       caption:
         zh: 二樓主臥
   ```
3. 照片的順序就是網頁上顯示的順序。從清單刪掉某一行，那張照片就不會出現。

如果 YAML 寫的路徑找不到檔案，build 會失敗，並列出是哪個檔案的哪一張照片。這時候網站會繼續顯示上一個版本，不會出現破圖。

## 每一棟的其他設定

- `pets: true` / `false`：是否開放毛孩，會顯示在該棟頁面與首頁清單。
- `color.main` / `color.tint`：這一棟的主題色（標題、按鈕）與淺色底。
- `specs`：規格可以自由新增或刪除，每一項都是「標籤 + 內容」。
- `map_area`：這一棟在首頁空拍圖上的可點範圍，`x`、`y` 是左上角位置，`w`、`h` 是寬和高，單位都是圖片寬高的百分比。

## 在自己的電腦上預覽

```bash
npm install
npm run dev
```
打開終端機顯示的網址（通常是 http://localhost:5173）。改了 YAML 會自動更新。
新增或更換照片後，重新執行一次 `npm run dev`，照片才會被轉檔。

## 之後想用網頁後台編輯

這些檔案的格式可以直接接上 [Decap CMS](https://decapcms.org/)，之後只要加上 `/admin` 頁面和 GitHub 登入設定，就能在瀏覽器裡用表單編輯，不需要改內容結構。
