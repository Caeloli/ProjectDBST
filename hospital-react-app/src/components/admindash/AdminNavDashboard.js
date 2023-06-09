import React from "react";
import AdminHamburgerMenuDesktop from "./AdminHamburgerMenuDesktop";
import AdminHamburgerMenuCellphone from "./AdminHamburgerMenuCellphone";

class AdminNavDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    };
  }

  componentDidMount() {
    // Verify window size on component mount
    this.checkWindowSize();
    // Add event listener to track window size changes
    window.addEventListener('resize', this.checkWindowSize);
  }

  componentWillUnmount() {
    // Remove event listener on component unmount to avoid errors
    window.removeEventListener('resize', this.checkWindowSize);
  }

  checkWindowSize = () => {
    const isMobile = window.innerWidth <= 768; // Set the maximum width to consider as mobile
    this.setState({ isMobile });
  }

  render() {
    const { isMobile } = this.state;
    return (
      <nav className="flex items-center justify-between relative">
        {isMobile ? <AdminHamburgerMenuCellphone /> : <AdminHamburgerMenuDesktop />}
      </nav>
    );
  }
}

export default AdminNavDashboard;
