export default function Button({ children, variant = 'primary', className = '', ...rest }) {
  const styles = {
    primary: 'bg-primary text-white hover:bg-green-700',
    secondary: 'bg-secondary text-white hover:bg-slate-800',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
  };
  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
