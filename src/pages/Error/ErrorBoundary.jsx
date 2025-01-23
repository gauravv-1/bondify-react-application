import React from "react";
import ErrorPage from "./ErrorPage";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log error details to an error reporting service like Sentry here.
        console.error("Error caught in Error Boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render the custom error page
            return <ErrorPage />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
