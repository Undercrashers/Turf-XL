export default function Footer() {
  return (
    <footer className="w-full py-12 bg-surface-container-low border-t-0">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="text-on-surface-variant font-body text-sm leading-relaxed mb-6 md:mb-0">
          &copy; {new Date().getFullYear()} Turf XL. The Elite Arena.
        </div>
        <div className="flex flex-wrap gap-6 md:justify-end">
          <a href="#" className="text-on-surface-variant hover:text-primary font-body text-sm transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-on-surface-variant hover:text-primary font-body text-sm transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-on-surface-variant hover:text-primary font-body text-sm transition-colors">
            Contact Support
          </a>
          <a href="#" className="text-on-surface-variant hover:text-primary font-body text-sm transition-colors">
            Partner with Us
          </a>
        </div>
      </div>
    </footer>
  );
}
