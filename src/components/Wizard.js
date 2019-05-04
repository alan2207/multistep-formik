import React from 'react';

const WizardContext = React.createContext();

// simple wizard component inspired by react-albus https://github.com/americanexpress/react-albus
class Wizard extends React.Component {
  static Steps = props => {
    const { currentStep, init } = React.useContext(WizardContext);
    React.useEffect(() => {
      init(props.children.length);
    }, [init, props.children.length]);
    return props.children.length > 1
      ? props.children[currentStep - 1]
      : props.children;
  };

  static Step = props => {
    const { init, ...context } = React.useContext(WizardContext);
    return props.children(context);
  };

  previous = () => {
    if (this.state.currentStep > 1) {
      this.setState(({ currentStep }) => ({ currentStep: currentStep - 1 }));
    }
  };

  next = () => {
    if (this.state.currentStep < this.state.totalSteps) {
      this.setState(({ currentStep }) => ({ currentStep: currentStep + 1 }));
    }
  };

  jump = position => {
    this.setState({ currentStep: position });
  };

  init = steps => {
    this.setState({ totalSteps: steps });
  };

  state = {
    currentStep: 1,
    totalSteps: 1,
    init: this.init,
    previous: this.previous,
    next: this.next,
    jump: this.jump
  };

  render() {
    return (
      <WizardContext.Provider value={this.state}>
        {this.props.children}
      </WizardContext.Provider>
    );
  }
}

export const { Steps, Step } = Wizard;

export default Wizard;
