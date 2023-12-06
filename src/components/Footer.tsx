function Footer() {
  let year = new Date().getFullYear();
  return (
    <footer className="justify-center rounded-lg bg-white p-4 shadow dark:bg-gray-800 md:flex md:items-center md:justify-center md:p-6">
      <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        © {year} <span>Otto Notes</span>. All Rights Reserved.
      </span>
      <ul className="mt-3 flex flex-wrap justify-center pl-6 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="/privacy-policy" className="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="/contact" className="mr-4 hover:underline md:mr-6">
            Contact
          </a>
        </li>
        <li>
          <a href="/about" className="hover:underline">
            About Us
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
