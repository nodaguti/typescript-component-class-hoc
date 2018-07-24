import React from 'react';

interface ExternalProps {
  externalA: string;
}

interface InjectedProps {
  injectedA: number;
  injectedB: string;
}

export const HoCWithComponentType = <OriginalProps extends {}>(
  Component: React.ComponentType<OriginalProps & InjectedProps>,
) => {
  class InjectedComponent extends React.Component<OriginalProps & ExternalProps> {
    render() {
      return (
        <Component
          injectedA={0}
          injectedB="injected"
          {...this.props}
        />
      );
    }
  }

  return InjectedComponent;
}

export const HoCWithStatelessComponent = <OriginalProps extends {}>(
  Component: React.StatelessComponent<OriginalProps & InjectedProps>,
) => {
  class InjectedComponent extends React.Component<OriginalProps & ExternalProps> {
    render() {
      return (
        <Component
          injectedA={0}
          injectedB="injected"
          {...this.props}
        />
      );
    }
  }

  return InjectedComponent;
}

export const HoCWithComponentClass = <OriginalProps extends {}>(
  Component: React.ComponentClass<OriginalProps & InjectedProps>,
) => {
  class InjectedComponent extends React.Component<OriginalProps & ExternalProps> {
    render() {
      return (
        <Component
          injectedA={0}
          injectedB="injected"
          {...this.props}
        />
      );
    }
  }

  return InjectedComponent;
}
