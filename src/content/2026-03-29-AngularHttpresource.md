---
title: Angular HttpResource
bgImageUrl: /images/35/35-00.png
description: Angular HttpResource
slug: 2026-03-29-angular-Httpresource
tags: ['Angular']
---

Angular 在19之後推出的新功能，將 `HttpClient` 使用 Signal 進行包裝，並且內建3種狀態：`isLoading`、`hasValue`、`error`，之前版本需要另外實作的功能，目前已是內建了，所以記錄一下到目前為止的心得。

## HTTP GET

### defaultValue

```typescript
const url = '.netlify/functions/member/list';
const members = httpResource<Member[]>(() => url, {
  defaultValue: [],
});
```

使用 httpResource 最簡單的方式是傳入一個回傳 URL 的 Arrow Function。我習慣在 `HttpResourceOptions` 中設定 `defaultValue`。

設定 `defaultValue: []` 的好處在於能確保回傳型別始終為 `Member[]`，而非 `Member[] | undefined`。這讓我們在處理資料時不需要反覆判斷 undefined，程式碼會簡潔許多。

### isLoading, error,hasValue

```html
@if (forecastData.isLoading()) {
<div class="lodingContainer">
  <mat-spinner></mat-spinner>
</div>
} @else if (forecastData.hasValue()) {
<div class="columns is-multiline">
  @for (data of forecastData.value(); track data.country_code) {
  <div class="column is-one-quarter">
    <app-forecast-item [forecastDatum]="data"></app-forecast-item>
  </div>
  }
</div>
} @else {
<div class="errorContainer">
  <p class="errorMessage">An error occurred while fetching the forecast data.</p>
</div>
}
```

過去使用`HttpClient`時還會需要另外寫一些重覆程式碼來判斷是否是載入中，現在使用`httpResourceRequest`內建的方法 loading, hasValue，來判斷是否載入中，或是是否有資料。最後使用`Value`，由於 value 本身也是個 Signal，讀取資料時記得加上括號 value()。

### parse

```typescript
httpResource <ForecastDatum[]> (
  () => {
    url: '/.netlify/functions/proxy',
    params: {
      path: encodeURIComponent(forecast / location ? city = $ {
        cityValue
      }),
    },
  }, {
    parse: (data) => this.toForecastDatums(data),
    defaultValue: [],
  },
);
private toForecastDatums(forecast: any): ForecastDatum[] {
  const data = forecast.data as ForecastDatum[];
  let index = 1;
  const newData = data.map((m) => {
    return {
      ...m,
      id: index++,
      city_name: forecast.city_name,
      lon: forecast.lon,
      timezone: forecast.timezone,
      lat: forecast.lat,
      country_code: forecast.country_code,
    }
    as ForecastDatum;
  });
  return newData;
}
```

有時當後端回傳的格式與前端定義的 Model 不一致時，如範例，要回傳的物件為`forecast.data`，這時可以使用`HttpResourceOptions`的其中一個屬性`parse`進行轉換。

## HTTP POST

```typescript
//MemberService
saveMember(member: Member) {
  const params = {
    path: '/contact/save',
  };

  return httpResource < Member > (() => ({
    url: API_BASE_URL,
    params,
    method: 'POST',
    body: member,
  }));

}

//MemberComponent
onSubmit() {
  if (this.group.valid) {
    this.memberService.saveMember(this.group.value as Member);
  }
}

```

使用 HTTP POST 時，還會需另外設定 `method` 與 `body` 參數，這樣就能使用 POST 的方式呼叫 API。
一般來說，都會習慣將呼叫其他API的程式封裝成方法，讓component呼叫。

但是會出現下列錯誤：
> httpResource2() can only be used within an injection context such as a constructor

原因是因為 httpResouce 只能在 component 或是 Service 初始化階段（例如建構子或屬性宣告時）定義，不能在一般方法（如 onSubmit）中動態觸發。

```typescript
//MemberService
saveMember(memberReq: () => Member | null) {
  return httpResource(() => {
    const member = memberReq();
    if (!member) {
      return undefined;
    }

    return {
      url: API_BASE_URL,
      params: {
        path: '/contact/save',
      },
      method: 'POST',
      body: member,
    };
  });

}

//MemberComponent
member = signal < Member | null > (null);
saveResource = this.memberService.saveMember(() => this.member());

onSubmit() {
  if (this.group.valid) {

    this.member.set(this.group.value as Member);
  }
}

```

要修改這個錯誤，就需要使用*signal*，當在 onSubmit 中，signal 被設定新值時，.就會觸發 `saveMember(() => this.member())` ，接著會重新執行 `httpResource`，如此可避免這種錯誤。

## 結論

httpResource 是以 signal 為基礎，Angular 逐漸將 signal 整合到各個功能中，讓我們在使用 Angular 時能更方便的使用 signal 來管理狀態。

另外這次使用 AI 來學習 HttpResouce，及當 Http POST 時出錯時，也是使用 AI 讓我知道解決錯誤及出錯的原因。

