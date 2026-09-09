function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-gray-100 bg-white p-6 md:flex md:items-center md:justify-center">
      <span className="text-sm text-gray-500 sm:text-center">
        © {year} <span>Otto Notes</span>. All Rights Reserved.
      </span>
      <nav aria-label="Footer navigation">
        <ul className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 md:ml-6 md:mt-0">
          <li>
            <a href="/about" className="hover:text-black hover:underline">
              About
            </a>
          </li>
          <li>
            <a
              href="/privacy-policy"
              className="hover:text-black hover:underline"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-black hover:underline">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
