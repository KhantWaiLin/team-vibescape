import React from "react";
import { useLocation } from "react-router-dom";

const SubmissionSuccess: React.FC = () => {
  const location = useLocation();
  
  // Get form data from location state if available
  const formData = location.state?.formData;
  const formTitle = location.state?.formTitle || "Form";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Response Submitted Successfully! 🎉
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Thank you for your response to <span className="font-semibold text-green-600">"{formTitle}"</span>. 
            Your submission has been saved and will be reviewed by our team.
          </p>

          {/* Submission Details */}
          {formData && (
            <div className="bg-green-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-green-800 mb-4">
                Submission Details
              </h3>
              <div className="space-y-3">
                {/* <div className="flex justify-between">
                  <span className="text-green-700">Submission ID:</span>
                  <span className="font-mono text-sm bg-green-200 px-2 py-1 rounded text-green-800">
                    {Date.now().toString(36).toUpperCase()}
                  </span>
                </div> */}
                <div className="flex justify-between">
                  <span className="text-green-700">Submitted at:</span>
                  <span className="text-green-800">
                    {new Date().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Form:</span>
                  <span className="text-green-800 font-medium">{formTitle}</span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-emerald-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-emerald-800 mb-3">
              What happens next?
            </h3>
            <ul className="text-emerald-700 text-left space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Your response will be reviewed by our team
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You may receive a confirmation email shortly
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Feel free to submit additional responses if needed
              </li>
            </ul>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-green-600 mt-6">
            Need help? Contact our support team or check our FAQ section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
