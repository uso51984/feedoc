<div class="title">HOC</div>

高阶组件是参数为组件，返回值为新组件的函数。
HOC 不会修改传入的组件，也不会使用继承来复制其行为。相反，HOC 通过将组件包装在容器组件中来组成新组件。HOC 是纯函数，没有副作用。

## 1. HOC的两种形式：属性代理 和 反向继承

### 1.1. 属性代理（Props Proxy）

#### 1.1.1. 实现

``` js
// 无状态
function HigherOrderComponent(WrappedComponent) {
    return props => < WrappedComponent {
        ...props
    }
    />;
}
// or
// 有状态
function HigherOrderComponent(WrappedComponent) {
    return class extends React.Component {
        render() {
            return <WrappedComponent {
                ...this.props
            }
            />;
        }
    };
}
```

#### 1.1.2. 作用

因为属性代理类型的高阶组件返回的是一个标准的 `React.Component` 组件，所以在 React 标准组件中可以做什么，那在属性代理类型的高阶组件中就也可以做什么，比如：

1. 操作 props
2. 抽离 state
3. 通过 ref 访问到组件实例
4. 用其他元素包裹传入的组件 WrappedComponent

### 1.2. 反向继承

#### 1.2.1. 实现

``` js
function HigherOrderComponent(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            return super.render();
        }
    };
}
```

#### 1.2.2. 渲染劫持

1. 有条件地展示元素树（element tree）
2. 操作由 render() 输出的 React 元素树
3. 在任何由 render() 输出的 React 元素中操作 props
4. 用其他元素包裹传入的组件 WrappedComponent （同 属性代理）

#### 1.2.3. 条件渲染

通过 props.isLoading 这个条件来判断渲染哪个组件。

``` js
function withLoading(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            if (this.props.isLoading) {
                return <Loading / > ;
            } else {
                return super.render();
            }
        }
    };
}
```

#### 1.2.4. 修改由 render() 输出的 React 元素树

修改元素树：

``` js
function HigherOrderComponent(WrappedComponent) {
    return class extends WrappedComponent {
        render() {
            const tree = super.render();
            const newProps = {};
            if (tree && tree.type === 'input') {
                newProps.value = 'something here';
            }
            const props = {
                ...tree.props,
                ...newProps,
            };
            const newTree = React.cloneElement(tree, props, tree.props.children);
            return newTree;
        }
    };
}
```

## 2. HOC 有哪些限制?

除了它的好处之外，高阶组件还有一些注意事项。 以下列出的几个注意事项:

1. 不要在渲染方法中使用HOC： 建议不要将 HOC 应用于组件的 render 方法中的组件。

``` jsx
render() {
  // A new version of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}
```

上述代码通过重新装载，将导致该组件及其所有子组件状态丢失，会影响到性能。正确的做法应该是在组件定义之外应用 HOC ，以便仅生成一次生成的组件

2. 静态方法必须复制： 将 HOC 应用于组件时，新组件不具有原始组件的任何静态方法

``` jsx
// Define a static method
WrappedComponent.staticMethod = function() {/*...*/}
// Now apply a HOC
const EnhancedComponent = enhance(WrappedComponent);

// The enhanced component has no static method
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

您可以通过在返回之前将方法复制到输入组件上来解决此问题

``` js
function enhance(WrappedComponent) {
    class Enhance extends React.Component {
        /*...*/
    }
    // Must know exactly which method(s) to copy :(
    Enhance.staticMethod = WrappedComponent.staticMethod;
    return Enhance;
}
```

3. Refs 不会被往下传递 对于HOC，您需要将所有属性传递给包装组件，但这对于 refs 不起作用。这是因为 ref 并不是一个类似于 key 的属性。在这种情况下，您需要使用 React.forwardRef API。

