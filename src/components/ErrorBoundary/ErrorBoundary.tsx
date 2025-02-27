import { Component, ErrorInfo, ReactNode } from 'react';

type TRootError = {
  children: ReactNode;
};

type TRootErrorState = {
  isAppError: boolean;
  message: string;
};

export class ErrorBoundary extends Component<TRootError, TRootErrorState> {
  state = { isAppError: false, message: '' };

  static getDerivedStateFromError() {
    return { isAppError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ isAppError: true, message: error.message });

    const lowMessage = error.message.slice(0, 10);

    // eslint-disable-next-line no-console
    console.error(`Произошла ошибка в работе приложения: ${lowMessage}`, error, info);
  }

  render() {
    const { isAppError } = this.state;

    if (isAppError) return <div>Error, please, reload page</div>;

    return this.props.children;
  }
}
