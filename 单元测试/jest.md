# jest

## jest 如何触发dom的监听事件

enzyme+jest中，项目中用了 `addEventListener` 监听事件，测试代码触发对应的事件可以利用 `Event`  `dispatchEvent` 触发，

``` js
  const selfButton = component.find('.self-button');
  const ev = new Event('keypress', {
      key: 'Enter'
  });
  selfButton.node.dispatchEvent(ev);
  ev.keyCode = 13;
  selfButton.node.dispatchEvent(ev);
  expect(props.onItemClick).toHaveBeenCalled();
```

## mock Object method

利用sayOn

``` js
  it('showNewFamilyMemberPage is __newFamilyMember params customer_id is null should correctly', () => {
      const {
          component
      } = setup();
      const instance = component.instance();
      instance.showNewFamilyMemberPage();
      const spy = jest.spyOn(instance, 'selectParticipant');
      window.__newFamilyMember({
          customer_id: '',
          type: 'participant'
      });
      expect(spy).toHaveBeenCalled;
  });
```

## jest 单元测试覆盖debounce 方法(lodash)

### 解决办法1. 使用jest.mock

``` js
jest.mock('lodash/debounce', () => jest.fn(fn => fn));
```

### 解决办法2. 使用 `jest.useFakeTimers()` ，  然后在调用 debounced之后运行 `jest.runAllTimers()` ;

``` js
jest.useFakeTimers();

var _ = require('lodash');

test('fails to mock Lodash timers correctly', function() {
    var test = jest.fn();
    var debounced = _.debounce(test, 1000);

    debounced();
    debounced();

    jest.runAllTimers();

    expect(test).toHaveBeenCalledTimes(1);
});
```

> 参考链接：
> * https://github.com/facebook/jest/issues/3465
> * [https://github.com/rimunroe/lodash-jest-timer-issue/blob/master/__tests__/lodash-bug-test.js](https://github.com/rimunroe/lodash-jest-timer-issue/blob/master/__tests__/lodash-bug-test.js)

## 修改location.href或者location.search

> 默认location.href或者location.search的值无法修改。 原因是location对象对这两个key或者也有类似到key进行了锁定。

### 解决办法

``` js
 Object.defineProperty(location, 'search', {
     writable: true,
     value: 'message_code'
 })

 window.location.search = '';
 window.location.search = 'message_code=1';
```

