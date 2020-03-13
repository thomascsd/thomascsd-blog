---
title: class-validator & ngx-dynamic-form-builder
---

資料驗證是常常碰到的議題，一般說來，前端及後端都要驗證，但常常是前端驗證要寫一套，後端又要寫另一套，不太能共用。JavaScript的世界也是如此，都會做重工。之前發現套件[class-validator](https://github.com/typestack/class-validator)，使用decorator來設定要驗證的項目，並且是用Angular的話，搭配使用ngx-dynamic-form-builder即可進行表單驗證，而在node.js也可使用。

## class-validator

```javascript
import {
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
  Matches,
  MinLength,
  MaxLength
} from 'class-validator';

export class Member {
  @IsNotEmpty({
    message: '姓名需填寫'
  })
  name = '';

  @IsNotEmpty({
    message: 'Email需填寫'
  })
  @IsEmail()
  email = '';

  @IsNotEmpty({
    message: '手機需填寫'
  })
  @IsMobilePhone('zh-TW', {
    message: '手機需填寫'
  })
  mobile = '';

  @IsNotEmpty(options)
  @MinLength(6, options)
  @MaxLength(12, options)
  @Matches(/[a-zA-Z\d]/g, options)
  account = '';
}
```

使用方式很簡單、直覺，在class上設定decorator即可。可以使用的decorator可以參考[文件](https://github.com/typestack/class-validator#validation-decorators)。並且後面可以傳入參數，來自定錯誤訊息。

```javascript
import { validateOrReject } from 'class-validator';

try {
  await validateOrReject(member);
  const ret = await memberService.saveMember(member);
  return res.json('ok');
} catch (error) {
  return res.status(500).json({
    message: `errors:${error}`
  });
}
```

需要驗證資料時呼叫``validateOrReject``，因為是非同步的所以搭配await使用，如果有失敗時，在catch中抓取錯誤訊息。

## ngx-dynamic-form-builder

而[ngx-dynamic-form-builder](https://github.com/EndyKaufman/ngx-dynamic-form-builder)這個套件可以將class-validator整合進Angular。

```javascript
  group: DynamicFormGroup<Member>;

  constructor(
    private fb: DynamicFormBuilder,
  ) {}

  ngOnInit() {
    this.group = this.fb.group(Member);
  }

```

基於Reactive forms的方式開發，會需要用到``FormBuilder``及``FormGroup``這兩個物件，而ngx-dynamic-form-builder有``DynamicFormGroup``及``DynamicFormBuilder``這兩個物件，可以來建立我們的form。

使用``DynamicFormBuilder``的``Group``方法來產生``DynamicFormGroup``，並且參數傳入Model類別。

```html
<form
    [formGroup]="group"
    *ngIf="group?.customValidateErrors | async as errors"
    (ngSubmit)="onSubmit()"
    #form="ngForm"
  >
    <div class="form-group">
      <label for="memberName">姓名</label>
      <input
        type="text"
        class="form-control"
        id="memberName"
        placeholder="name"
        formControlName="name"
      />
      <small class="text-danger" *ngIf="errors.name?.length > 0">
        {{ errors.name[0] }}
      </small>
    </div>
</form>
```

顯示錯誤訊息的方式，使用``customValidationError``屬性，因為型別是BehavioraSubject，所以這邊先用async處理，之後``errors.name[0]``顯示錯誤訊息。

```javascript
onSubmit() {
    this.group.validate();
    if (this.group.valid) {
      this.memberService.saveMember(this.group.object).subscribe(() => {
        this.snackBar.open('儲存成功', '', {
          duration: 3000
        });
      });
    }
  }
```

最後儲存資料的階段，使用``validate``來驗證資料，``valid``判斷資料是否正確，``object``取回model物件。

## 結論

只需使用class-validator就可以讓前端及後端採用相同的驗證方式，讓程式不用為了驗證重覆再寫一次，並且搭配ngx-dynamic-form-builder後，可以輕易地整合至Angular。

範例程式碼如下[form-builder-demo](https://github.com/thomascsd/form-builder-demo)。




