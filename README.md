# React.ComponentClass and React Higher-Order Components in TypeScript

> The naming basically comes from [React Higher-Order Components in TypeScript made simple](https://codeburst.io/react-higher-order-components-in-typescript-made-simple-6f9b55691af1) written by Dan Homola. Thanks a lot!

Limiting the type of a wrapped component from `React.ComponentType` to `React.ComponentClass` causes an interesting error in typing resolution of the wrapped component in `render()`.

While there is no issue if I type the wrapped component with `React.ComponentType` or `React.StatelessComponent`, TypeScript starts to complain when I switch the type to `React.ComponentClass` so that only a class-based component would be acceptable as the wrapped component, saying the following error:

```
$ tsc --project ./tsconfig.json
index.tsx:55:11 - error TS2326: Types of property 'injectedA' are incompatible.
  Type '(Readonly<{ children?: ReactNode; }> & Readonly<OriginalProps & ExternalProps> & { injectedA: 0; ...' is not assignable to type '(IntrinsicAttributes & IntrinsicClassAttributes<Component<OriginalProps & InjectedProps, Componen...'.
    Type '0' is not assignable to type '(IntrinsicAttributes & IntrinsicClassAttributes<Component<OriginalProps & InjectedProps, Componen...'.
      Type 'Readonly<{ children?: ReactNode; }> & Readonly<OriginalProps & ExternalProps> & { injectedA: 0; i...' is not assignable to type 'IntrinsicAttributes & IntrinsicClassAttributes<Component<OriginalProps & InjectedProps, Component...'.
        Type 'Readonly<{ children?: ReactNode; }> & Readonly<OriginalProps & ExternalProps> & { injectedA: 0; i...' is not assignable to type 'Readonly<OriginalProps & InjectedProps>'.

55           injectedA={0}
             ~~~~~~~~~~~~~


index.tsx:56:11 - error TS2326: Types of property 'injectedB' are incompatible.
  Type '(Readonly<{ children?: ReactNode; }> & Readonly<OriginalProps & ExternalProps> & { injectedA: 0; ...' is not assignable to type '(IntrinsicAttributes & IntrinsicClassAttributes<Component<OriginalProps & InjectedProps, Componen...'.
    Type '"injected"' is not assignable to type '(IntrinsicAttributes & IntrinsicClassAttributes<Component<OriginalProps & InjectedProps, Componen...'.
      Type 'Readonly<{ children?: ReactNode; }> & Readonly<OriginalProps & ExternalProps> & { injectedA: 0; i...' is not assignable to type 'IntrinsicAttributes & IntrinsicClassAttributes<Component<OriginalProps & InjectedProps, Component...'.
        Type 'Readonly<{ children?: ReactNode; }> & Readonly<OriginalProps & ExternalProps> & { injectedA: 0; i...' is not assignable to type 'Readonly<OriginalProps & InjectedProps>'.

56           injectedB="injected"
             ~~~~~~~~~~~~~~~~~~~~
```

which seems that TypeScript mistakenly believes that the type of the wrapped component's props is `OriginalProps & ExternalProps`, not `OriginalProps & InjectedProps`.

Considering the fact that typing the wrapped component with `React.ComponentType` and `React.StatelessComponent` doesn't cause the error, I believe something might go wrong with a type definition of `React.ComponentClass`.

## Steps to reproduce

1. Clone this repository
2. `yarn install`
3. `yarn lint`

## Expected result

No errors are emitted.

## Actual result

The above errors are emitted.
