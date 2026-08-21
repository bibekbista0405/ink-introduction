import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// The app previously had no error boundary anywhere. In React, an
// uncaught error thrown during render — anywhere in the tree, no matter
// how small — unmounts the ENTIRE app, leaving a fully blank white page
// with no way to recover short of a manual reload. That's very likely
// what was happening: some edge-case render error (a stale index, an
// out-of-range lookup, etc.) was silently blanking the whole site instead
// of failing gracefully in just the one component that broke.
//
// This boundary catches any such error, logs it for debugging, and shows
// a small recoverable UI instead of a blank screen.
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // eslint-disable-next-line no-console
    console.error('[INK] Caught a render error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center px-6 bg-background">
          <div className="max-w-md text-center space-y-6">
            <p className="text-6xl">🩹</p>
            <h1 className="text-2xl font-bold text-dark">Something slipped.</h1>
            <p className="text-foreground/60 font-medium">
              A small hiccup happened on this page. Nothing's lost — try again.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 rounded-full bg-primary text-white font-bold hover:opacity-90 transition-opacity"
              >
                Try again
              </button>
              <button
                onClick={() => { window.location.href = '/'; }}
                className="px-6 py-3 rounded-full border border-primary/20 text-dark font-bold hover:bg-primary/5 transition-colors"
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
