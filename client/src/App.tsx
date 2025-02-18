/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-file no-use-before-define

import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./pages/auth/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import React, { Component } from "react";
import { SignedIn, UserButton } from "@clerk/clerk-react";

// Define your error boundary component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app-container">
          <div className="navbar">
            <Link to="/">Dashboard</Link>
            <SignedIn>
              <UserButton showName />
            </SignedIn>
          </div>
          <FinancialRecordsProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </FinancialRecordsProvider>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
