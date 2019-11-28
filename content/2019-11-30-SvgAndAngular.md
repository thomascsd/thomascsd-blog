---
title: SVG與Angular
bgImageUrl: /images/12/12-0.jpg
---

處理SVG已經是前端常常會遇到的事情，現在很多頁面上的圖片都是用SVG來取代，而SVG的優點這裡就不多述說。這邊提供我處理SVG的一些心得。

## icon資源

想要免費並且可以編輯的icon資源，我尋找了很久，最後發現[iconify.design](https://iconify.design/)這個網站，它的GitHub星星數不是很多，但很符合我的需求。

<img class="img-responsive" src="/images/13/13-01.png">

例如搜索「search」會出現很多相關的icon。

<img class="img-responsive" src="/images/13/13-02.png">

當選擇所想要的icon時，可以使用HTML來呈現

<img class="img-responsive" src="/images/13/13-03.png">

或是使用原始的SVG來呈現也可以，我個人是比較喜歡用原始的SVG來呈現，如此可進行一些客制化操作。

## 與Angular整合

AngularV8.0之後支援``tempalteUrl``可以是SVG，而不用是HTML。可以參考[Using svg files as component templates with Angular CLI](https://levelup.gitconnected.com/using-svg-files-as-component-templates-with-angular-cli-ea58fe79b6c1)。

<iframe src="https://stackblitz.com/edit/ngx-svg-demo?embed=1&file=src/app/svg-title/svg-title.component.svg
"></iframe>

如以上的範例，SVG中可以加上Angular語法`：`<text x="45" y="80" fill="#fff">{{title}}</text>``，成為動態的SVG。

另外也可以註冊事件，使用Angular語法：``(click)="resetTitle()"``，如同範例，點擊SVG的圖型後，文字會重設為Angular。

# 結論

這兩項



