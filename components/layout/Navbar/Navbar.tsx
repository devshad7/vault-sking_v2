import React from "react";
import Container from "@/components/Container";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import WishList from "./WishList";
import SignIn from "../../auth/SignIn";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full z-50 bg-bg/60 border-b border-border/50 backdrop-blur-lg supports-backdrop-filter:bg-bg/60">
      <Container className="flex items-center justify-between text-text py-4">
        {/* Left */}
        <div className="w-auto md:w-1/3 flex items-center gap-0.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>

        {/* Center */}
        <NavLinks />

        {/* Right */}
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-4">
          <SearchBar />
          <CartIcon />
          <WishList />
          <SignIn />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
