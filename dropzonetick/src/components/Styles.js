export const Select = (props) => {
  return (
    <select
      className="w-full block rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-primary focus:shadow-md"
      {...props}
    >
      {props.children}
    </select>
  );
};

export const Input = (props) => {
  return (
    <input
      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-primary focus:shadow-md"
      {...props}
    >
      {props.children}
    </input>
  );
};

export const Button = (props) => {
  return (
    <button
      className="bg-transparent hover:bg-primary text-primary font-bold hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded"
      {...props}
    >
      {props.children}
    </button>
  );
};

export const Label = (props) => {
  return (
    <label className="font-bold mb-3 block text-base text-primary" {...props}>
      {props.children}
    </label>
  );
};
