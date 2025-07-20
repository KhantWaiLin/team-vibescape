import React from "react";
import { FloatingButton } from "../components";

const Home: React.FC = () => {
  const handleFloatingButtonClick = () => {
    console.log("Floating button clicked on Home page!");
    // Add your custom logic here - could be:
    // - Navigate to create form
    // - Open a modal
    // - Scroll to top
    // - Show help/support
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Hero Section */}

      {/* Floating Action Button */}
      <FloatingButton
        onClick={handleFloatingButtonClick}
        variant="primary"
        size="md"
        aria-label="Create new form"
      />
    </div>
  );
};

export default Home;
