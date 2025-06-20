import React from 'react';
import { Link } from 'react-router-dom';

export default function GV_Footer() {
  return (
    <footer className="bg-white border-t border-gray-200" role="contentinfo" aria-label="Site footer">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Task Management App
            </h3>
            <p className="mt-2 text-sm text-gray-500" aria-labelledby="footer-about">
              Stay organized and boost your productivity with our intuitive task management solution.
            </p>
          </div>
          
          <nav aria-label="Footer quick links navigation">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase" id="footer-quicklinks">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-2" aria-labelledby="footer-quicklinks">
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-sm text-gray-500 hover:text-gray-900"
                  aria-label="Go to dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/tasks" 
                  className="text-sm text-gray-500 hover:text-gray-900"
                  aria-label="View all tasks"
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link 
                  to="/projects" 
                  className="text-sm text-gray-500 hover:text-gray-900"
                  aria-label="View all projects"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </nav>
          
          <nav aria-label="Footer support navigation">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase" id="footer-support">
              Support
            </h3>
            <ul className="mt-2 space-y-2" aria-labelledby="footer-support">
              <li>
                <Link 
                  to="/help" 
                  className="text-sm text-gray-500 hover:text-gray-900"
                  aria-label="Visit help center"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-sm text-gray-500 hover:text-gray-900"
                  aria-label="Contact support"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/feedback" 
                  className="text-sm text-gray-500 hover:text-gray-900"
                  aria-label="Provide feedback"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Task Management App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}